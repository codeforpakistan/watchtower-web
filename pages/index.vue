<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <Hero />

    <!-- Quick Stats -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold tracking-tight mb-6">Overview</h2>

      <div v-if="statsLoading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card v-for="n in 4" :key="n">
          <Skeleton class="h-32 w-full bg-muted" />
        </Card>
      </div>

      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Websites Monitored"
          :value="stats?.summary?.total_websites || 0"
          :subtitle="`${stats?.summary?.scan_coverage_percent || 0}% scanned`"
          icon="🏛️"
        />
        <StatCard
          title="Average Score"
          :value="stats?.performance?.average_overall_score || 0"
          subtitle="Overall performance"
          icon="📊"
        />
        <StatCard
          title="Shame Worthy"
          :value="stats?.shame_wall?.total_shame_worthy || 0"
          :subtitle="`${stats?.shame_wall?.shame_percentage || 0}% of sites`"
          icon="⚠️"
        />
        <StatCard
          title="SSL Issues"
          :value="stats?.security?.ssl_expired_count || 0"
          :subtitle="`${stats?.security?.ssl_compliance_percent || 0}% compliant`"
          icon="🔒"
        />
      </div>
    </div>

    <!-- Top 3 Performers (Podium) -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold tracking-tight mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" class="mr-2">
          <path fill="#E11D47"
            d="M11.5 19v-3.754q-1.379-.102-2.399-.999t-1.278-2.258q-1.587-.187-2.705-1.301T4 8v-.385q0-.666.475-1.14T5.615 6h2.039v-.385q0-.666.474-1.14Q8.603 4 9.27 4h5.462q.666 0 1.14.475q.475.474.475 1.14V6h2.039q.666 0 1.14.475T20 7.615V8q0 1.573-1.118 2.688t-2.705 1.3q-.258 1.362-1.278 2.259t-2.399 1V19h2.616q.212 0 .356.144t.144.357t-.144.356t-.356.143H8.885q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143zm-3.846-8.084V7H5.615q-.269 0-.442.173T5 7.616V8q0 1.123.762 1.953q.761.83 1.892.963m4.35 3.353q1.38 0 2.342-.965q.962-.964.962-2.343V5.616q0-.27-.174-.443Q14.962 5 14.692 5H9.308q-.27 0-.442.173q-.174.173-.174.443v5.346q0 1.378.966 2.343q.967.964 2.347.964m4.341-3.353q1.131-.133 1.893-.963Q19 9.123 19 8v-.385q0-.269-.173-.442T18.385 7h-2.039zM12 9.635" />
        </svg>
        Top Performers
      </h2>

      <div v-if="topLoading" class="flex flex-col items-center space-y-4">
        <Card v-for="n in 3" :key="n" class="flex items-center space-x-4 w-full max-w-2xl px-4 py-4">
          <Skeleton class="h-12 w-12 rounded-full bg-muted" />
          <div class="space-y-2 flex-1">
            <Skeleton class="h-4 w-full bg-muted" />
            <Skeleton class="h-4 w-3/4 bg-muted" />
          </div>
        </Card>
      </div>

      <div v-else class="flex flex-col items-center space-y-4">
        <Card
          v-for="(performer, index) in topPerformers?.top_performers || []"
          :key="performer.id"
          class="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl hover:shadow-lg transition-all cursor-pointer animate-fadeIn"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="navigateTo(`/website/${performer.id}`)"
        >
          <div class="flex items-center flex-1">
            <div
              :class="`w-12 h-12 rounded-full text-white flex items-center justify-center text-xl font-bold mr-4 ${
                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-700'
              }`"
            >
              {{ index + 1 }}
            </div>
            <div>
              <div class="font-bold text-lg">{{ performer.name }}</div>
              <div class="text-sm text-muted-foreground">{{ performer.url }}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <ScoreBadge :score="Math.round(performer.overall_score)" size="lg" />
            <CarbonBadge v-if="performer.carbon_rating" :rating="performer.carbon_rating" size="md" />
          </div>
        </Card>
      </div>
    </div>

    <!-- Carbon Footprint Section -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold tracking-tight mb-6 flex items-center">
        <span class="mr-2">🌱</span>
        Environmental Impact
      </h2>

      <div class="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Average CO₂ Emissions</CardTitle>
            <CardDescription>{{ stats?.carbon_footprint?.message || 'Loading...' }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="text-4xl font-bold text-green-600 dark:text-green-400">
              {{ stats?.carbon_footprint?.average_co2_grams || 0 }}g
            </div>
            <p class="text-sm text-muted-foreground mt-2">Per page load</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carbon Rating Distribution</CardTitle>
            <CardDescription>How government websites rank</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-2">
              <div v-for="(count, rating) in stats?.carbon_footprint?.rating_distribution" :key="rating" class="flex items-center gap-1">
                <CarbonBadge :rating="rating as string" size="sm" />
                <span class="text-sm text-muted-foreground">×{{ count }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-16 text-center">
      <div class="border-t pt-12">
        <h3 class="text-2xl font-bold mb-4">Explore More</h3>
        <div class="flex justify-center gap-4 flex-wrap">
          <Button size="lg" @click="navigateTo('/leaderboard')">
            View Full Leaderboard
          </Button>
          <Button size="lg" variant="destructive" @click="navigateTo('/shame')">
            View Shame Wall
          </Button>
          <Button size="lg" variant="outline" @click="navigateTo('/dashboard')">
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getStatistics, getTopPerformers } = useWatchtowerApi()

// Load stats async with lazy loading
const { data: stats, pending: statsLoading } = await useAsyncData(
  'homepage-stats',
  () => getStatistics(),
  {
    server: false,
    lazy: true,
  }
)

// Load top performers async
const { data: topPerformers, pending: topLoading } = await useAsyncData(
  'homepage-top',
  () => getTopPerformers({ limit: 3 }),
  {
    server: false,
    lazy: true,
  }
)

// SEO
useHead({
  title: 'Watchtower - Monitoring Government Website Performance',
  meta: [
    { name: 'description', content: 'Watchtower monitors and analyzes Pakistani government websites for performance, security, and environmental impact.' }
  ]
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}
</style>
