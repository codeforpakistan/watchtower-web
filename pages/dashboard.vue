<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
      <p class="text-lg text-muted-foreground">Comprehensive statistics and insights</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton v-for="n in 4" :key="n" class="h-32 bg-muted" />
      </div>
      <Skeleton class="h-64 bg-muted" />
    </div>

    <!-- Dashboard Content -->
    <div v-else-if="stats" class="space-y-8">
      <!-- Summary Stats -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Websites"
          :value="stats.summary.total_websites"
          :subtitle="`${stats.summary.websites_scanned} scanned`"
          icon="🏛️"
        />
        <StatCard
          title="Scan Coverage"
          :value="`${stats.summary.scan_coverage_percent}%`"
          :subtitle="`${stats.summary.websites_not_scanned} remaining`"
          icon="📊"
        />
        <StatCard
          title="Average Score"
          :value="stats.performance.average_overall_score"
          subtitle="Overall performance"
          icon="⭐"
        />
        <StatCard
          title="Last Scan"
          :value="stats.summary.most_recent_scan ? new Date(stats.summary.most_recent_scan).toLocaleDateString() : 'Never'"
          subtitle="Most recent"
          icon="🕒"
        />
      </div>

      <!-- Performance Metrics -->
      <Card>
        <CardHeader>
          <CardTitle>Performance Breakdown</CardTitle>
          <CardDescription>Average scores across all government websites</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p class="text-sm text-muted-foreground mb-2">Performance</p>
              <div class="text-3xl font-bold mb-2">{{ stats.performance.average_performance_score }}</div>
              <ScoreBadge :score="stats.performance.average_performance_score" size="md" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-2">Accessibility</p>
              <div class="text-3xl font-bold mb-2">{{ stats.performance.average_accessibility_score }}</div>
              <ScoreBadge :score="stats.performance.average_accessibility_score" size="md" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-2">Best Practices</p>
              <div class="text-3xl font-bold mb-2">{{ stats.performance.average_best_practices_score }}</div>
              <ScoreBadge :score="stats.performance.average_best_practices_score" size="md" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-2">SEO</p>
              <div class="text-3xl font-bold mb-2">{{ stats.performance.average_seo_score }}</div>
              <ScoreBadge :score="stats.performance.average_seo_score" size="md" />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Security & Carbon -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Security -->
        <Card>
          <CardHeader>
            <CardTitle>🔒 Security Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm">SSL Valid</span>
                <div class="flex items-center gap-2">
                  <span class="font-semibold">{{ stats.security.ssl_valid_count }}/{{ stats.summary.websites_scanned }}</span>
                  <span class="text-xs text-green-600">{{ stats.security.ssl_compliance_percent }}%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">SSL Expired</span>
                <span class="font-semibold text-red-600">{{ stats.security.ssl_expired_count }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">HTTPS Enforced</span>
                <div class="flex items-center gap-2">
                  <span class="font-semibold">{{ stats.security.https_enforced_count }}</span>
                  <span class="text-xs text-green-600">{{ stats.security.https_enforcement_percent }}%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm">HSTS Enabled</span>
                <span class="font-semibold">{{ stats.security.hsts_enabled_count }}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Carbon -->
        <Card>
          <CardHeader>
            <CardTitle>🌱 Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-muted-foreground mb-2">{{ stats.carbon_footprint.message }}</p>
                <div class="text-4xl font-bold text-green-600 mb-4">
                  {{ stats.carbon_footprint.average_co2_grams }}g
                </div>
              </div>
              <div>
                <p class="text-sm text-muted-foreground mb-3">Rating Distribution</p>
                <div class="flex flex-wrap gap-2">
                  <div v-for="(count, rating) in stats.carbon_footprint.rating_distribution" :key="rating" class="flex items-center gap-1">
                    <CarbonBadge :rating="rating as string" size="sm" />
                    <span class="text-sm text-muted-foreground">×{{ count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Shame Wall Stats -->
      <Card>
        <CardHeader>
          <CardTitle>⚠️ Websites Needing Attention</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <p class="text-sm text-muted-foreground mb-2">Total Shame Worthy</p>
              <div class="text-3xl font-bold text-red-600">{{ stats.shame_wall.total_shame_worthy }}</div>
              <p class="text-sm text-muted-foreground mt-1">{{ stats.shame_wall.shame_percentage }}% of sites</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-2">SSL Issues</p>
              <div class="text-3xl font-bold text-red-600">{{ stats.shame_wall.ssl_shame_worthy }}</div>
            </div>
            <div class="flex items-center">
              <Button variant="destructive" @click="navigateTo('/shame')">
                View Shame Wall →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Top & Bottom Performers -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Top Performers -->
        <Card>
          <CardHeader>
            <CardTitle>🏆 Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div
                v-for="(site, index) in stats.top_performers"
                :key="site.name"
                class="flex items-center justify-between p-3 rounded hover:bg-muted cursor-pointer transition-colors"
                @click="navigateTo(`/website/${site.id}`)"
              >
                <div class="flex items-center gap-3">
                  <span class="text-lg font-bold text-muted-foreground">{{ index + 1 }}</span>
                  <div>
                    <p class="font-semibold">{{ site.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ site.url }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <ScoreBadge :score="Math.round(site.overall_score)" size="md" />
                  <CarbonBadge v-if="site.carbon_rating" :rating="site.carbon_rating" size="sm" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Bottom Performers -->
        <Card>
          <CardHeader>
            <CardTitle>📉 Bottom Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div
                v-for="(site, index) in stats.bottom_performers"
                :key="site.name"
                class="flex items-center justify-between p-3 rounded hover:bg-muted cursor-pointer transition-colors"
                @click="navigateTo(`/website/${site.id}`)"
              >
                <div class="flex items-center gap-3">
                  <span class="text-lg font-bold text-muted-foreground">{{ index + 1 }}</span>
                  <div>
                    <p class="font-semibold">{{ site.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ site.url }}</p>
                    <span v-if="site.shame_worthy" class="text-xs px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      ⚠️ Issues
                    </span>
                  </div>
                </div>
                <ScoreBadge :score="Math.round(site.overall_score)" size="md" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Error State -->
    <Card v-else class="text-center py-12">
      <CardContent>
        <h2 class="text-2xl font-bold mb-4">Failed to Load Dashboard</h2>
        <p class="text-muted-foreground mb-6">Unable to fetch statistics. Please try again later.</p>
        <Button @click="loadStats">Retry</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
const { getStatistics } = useWatchtowerApi()

const stats = ref<any>(null)
const loading = ref(true)

const loadStats = async () => {
  loading.value = true
  try {
    const data = await getStatistics()
    stats.value = data
  } catch (error) {
    console.error('Failed to load statistics:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStats()
})

// SEO
useHead({
  title: 'Dashboard - Watchtower',
  meta: [
    { name: 'description', content: 'Comprehensive dashboard with statistics and insights for Pakistani government websites.' }
  ]
})
</script>
