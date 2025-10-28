<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold tracking-tight mb-2">Leaderboard</h1>
      <p class="text-lg text-muted-foreground">Government website rankings by performance</p>
    </div>

    <!-- Filters and Sorting -->
    <Card class="mb-8">
      <CardContent class="pt-6">
        <div class="flex flex-wrap gap-4 items-end">
          <div class="flex-1 min-w-[200px]">
            <label class="text-sm font-medium mb-2 block">Sort By</label>
            <select v-model="sortBy" class="w-full px-3 py-2 border rounded-md bg-background">
              <option value="overall_score">Overall Score</option>
              <option value="performance_score">Performance</option>
              <option value="accessibility_score">Accessibility</option>
              <option value="ssl_security_score">SSL Security</option>
              <option value="carbon_rating">Carbon Footprint</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Order</label>
            <div class="flex gap-2">
              <Button
                :variant="!ascending ? 'default' : 'outline'"
                @click="ascending = false"
              >
                Highest First
              </Button>
              <Button
                :variant="ascending ? 'default' : 'outline'"
                @click="ascending = true"
              >
                Lowest First
              </Button>
            </div>
          </div>

          <Button @click="refresh" :disabled="pending">
            <span v-if="!pending">Refresh</span>
            <span v-else>Loading...</span>
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-4">
      <Card v-for="n in 10" :key="n">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 flex-1">
              <Skeleton class="h-10 w-10 rounded-full bg-muted" />
              <div class="space-y-2 flex-1">
                <Skeleton class="h-4 w-full max-w-md bg-muted" />
                <Skeleton class="h-3 w-48 bg-muted" />
              </div>
            </div>
            <Skeleton class="h-8 w-16 bg-muted" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Leaderboard Table -->
    <div v-else class="space-y-3">
      <Card
        v-for="(entry, index) in data?.entries || []"
        :key="entry.id"
        class="hover:shadow-lg transition-all cursor-pointer"
        @click="navigateTo(`/website/${entry.id}`)"
      >
        <CardContent class="p-6">
          <div class="flex items-center justify-between gap-4">
            <!-- Rank and Info -->
            <div class="flex items-center gap-4 flex-1">
              <div class="text-2xl font-bold text-muted-foreground w-10">
                #{{ index + 1 }}
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-lg">{{ entry.name }}</h3>
                <a :href="entry.url" target="_blank" class="text-sm text-primary hover:underline" @click.stop>
                  {{ entry.url }}
                </a>
                <div class="flex gap-2 mt-2">
                  <span v-if="entry.government_level" class="text-xs px-2 py-1 rounded bg-muted">
                    {{ entry.government_level }}
                  </span>
                  <span v-if="entry.latest_report?.needs_improvement" class="text-xs px-2 py-1 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    ⚠️ Needs Improvement
                  </span>
                </div>
              </div>
            </div>

            <!-- Scores -->
            <div class="flex items-center gap-3">
              <div class="text-right space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-xs text-muted-foreground">Overall:</span>
                  <ScoreBadge :score="Math.round(entry.overall_score)" size="md" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-muted-foreground">Performance:</span>
                  <ScoreBadge :score="entry.performance_score" size="sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-muted-foreground">SSL:</span>
                  <ScoreBadge :score="entry.ssl_security_score || 0" size="sm" />
                </div>
                <div v-if="entry.latest_report?.carbon_rating" class="flex items-center gap-2">
                  <span class="text-xs text-muted-foreground">Carbon:</span>
                  <CarbonBadge :rating="entry.latest_report.carbon_rating" size="sm" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Empty State -->
      <Card v-if="!data?.entries?.length" class="text-center py-12">
        <CardContent>
          <p class="text-muted-foreground">No websites found</p>
        </CardContent>
      </Card>
    </div>

    <!-- Stats Footer -->
    <Card class="mt-8" v-if="!pending && data">
      <CardContent class="p-6">
        <div class="flex justify-between items-center text-sm text-muted-foreground flex-wrap gap-4">
          <span>Showing {{ data?.entries?.length || 0 }} of {{ data?.total_count || 0 }} websites</span>
          <div class="flex items-center gap-4">
            <Button
              v-if="(data?.entries?.length || 0) < (data?.total_count || 0)"
              variant="outline"
              size="sm"
              @click="loadMore"
              :disabled="pending"
            >
              Load More
            </Button>
            <span>Last updated: {{ data?.updated_at ? new Date(data.updated_at).toLocaleString() : 'N/A' }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
const { getLeaderboard } = useWatchtowerApi()

const sortBy = ref('overall_score')
const ascending = ref(false)
const limit = ref(50)

// Use Nuxt's useAsyncData for SSR and better loading
const { data, pending, refresh } = await useAsyncData(
  'leaderboard',
  () => getLeaderboard({
    sort_by: sortBy.value as any,
    limit: limit.value,
    ascending: ascending.value
  }),
  {
    // This enables the page to render immediately while data loads
    server: false,
    lazy: true,
    // Cache the result for 30 seconds
    dedupe: 'defer'
  }
)

const loadMore = () => {
  limit.value += 50
  refresh()
}

// Watch for filter changes
watch([sortBy, ascending], () => {
  limit.value = 50 // Reset limit when changing filters
  refresh()
})

// SEO
useHead({
  title: 'Leaderboard - Watchtower',
  meta: [
    { name: 'description', content: 'View the complete rankings of Pakistani government websites by performance, security, and environmental impact.' }
  ]
})
</script>
