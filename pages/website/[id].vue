<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <Skeleton class="h-32 w-full bg-muted" />
      <div class="grid gap-6 md:grid-cols-3">
        <Skeleton class="h-48 w-full bg-muted" />
        <Skeleton class="h-48 w-full bg-muted" />
        <Skeleton class="h-48 w-full bg-muted" />
      </div>
    </div>

    <!-- Website Details -->
    <div v-else-if="website && latestReport">
      <!-- Header -->
      <div class="mb-8">
        <Button variant="ghost" @click="$router.back()" class="mb-4">
          ← Back
        </Button>
        <div class="flex items-start justify-between flex-wrap gap-4">
          <div class="flex-1">
            <h1 class="text-4xl font-bold tracking-tight mb-2">{{ website.website.name }}</h1>
            <a :href="website.website.url" target="_blank" class="text-lg text-primary hover:underline">
              {{ website.website.url }} ↗
            </a>
            <div class="flex gap-2 mt-3">
              <span v-if="website.website.government_level" class="text-sm px-3 py-1 rounded-full bg-muted">
                {{ website.website.government_level }}
              </span>
              <span v-if="latestReport.shame_worthy" class="text-sm px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                ⚠️ Shame Worthy
              </span>
            </div>
          </div>

          <!-- Overall Score -->
          <Card class="min-w-[200px]">
            <CardContent class="pt-6 text-center">
              <p class="text-sm text-muted-foreground mb-2">Overall Score</p>
              <div class="text-5xl font-bold">{{ Math.round(latestReport.overall_score) }}</div>
              <ScoreBadge :score="Math.round(latestReport.overall_score)" size="lg" class="mt-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle class="text-sm">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">{{ latestReport.performance_score }}</div>
            <ScoreBadge :score="latestReport.performance_score" size="sm" class="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="text-sm">Accessibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">{{ latestReport.accessibility_score }}</div>
            <ScoreBadge :score="latestReport.accessibility_score" size="sm" class="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="text-sm">Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">{{ latestReport.best_practices_score }}</div>
            <ScoreBadge :score="latestReport.best_practices_score" size="sm" class="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="text-sm">SEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">{{ latestReport.seo_score }}</div>
            <ScoreBadge :score="latestReport.seo_score" size="sm" class="mt-2" />
          </CardContent>
        </Card>
      </div>

      <!-- SSL & Security -->
      <Card class="mb-8">
        <CardHeader>
          <CardTitle>🔒 SSL & Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <p class="text-sm text-muted-foreground mb-1">SSL Security Score</p>
              <ScoreBadge :score="latestReport.ssl_security_score || 0" size="lg" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">Certificate Status</p>
              <span :class="latestReport.ssl_valid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
                {{ latestReport.ssl_valid ? '✓ Valid' : '✗ Invalid' }}
              </span>
              <span v-if="latestReport.ssl_expired" class="text-red-600 font-semibold"> (Expired)</span>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">HTTPS Enforcement</p>
              <span :class="latestReport.https_enforced ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
                {{ latestReport.https_enforced ? '✓ Enforced' : '✗ Not Enforced' }}
              </span>
            </div>
            <div v-if="latestReport.ssl_days_until_expiry !== null">
              <p class="text-sm text-muted-foreground mb-1">Certificate Expires In</p>
              <span class="font-semibold" :class="latestReport.ssl_days_until_expiry < 30 ? 'text-red-600' : ''">
                {{ latestReport.ssl_days_until_expiry }} days
              </span>
            </div>
            <div v-if="latestReport.hsts_enabled !== undefined">
              <p class="text-sm text-muted-foreground mb-1">HSTS Enabled</p>
              <span :class="latestReport.hsts_enabled ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'">
                {{ latestReport.hsts_enabled ? '✓ Yes' : '○ No' }}
              </span>
            </div>
            <div v-if="latestReport.ssl_issuer">
              <p class="text-sm text-muted-foreground mb-1">Certificate Issuer</p>
              <span class="text-sm font-mono">{{ latestReport.ssl_issuer }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Carbon Footprint -->
      <Card class="mb-8">
        <CardHeader>
          <CardTitle>🌱 Environmental Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <p class="text-sm text-muted-foreground mb-1">Carbon Rating</p>
              <CarbonBadge v-if="latestReport.carbon_rating" :rating="latestReport.carbon_rating" size="lg" />
              <span v-else>N/A</span>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">CO₂ per Page Load</p>
              <span class="text-2xl font-bold text-green-600">{{ latestReport.carbon_co2_grams || 0 }}g</span>
            </div>
            <div v-if="latestReport.carbon_vs_average">
              <p class="text-sm text-muted-foreground mb-1">vs. Average Website</p>
              <span class="font-semibold" :class="latestReport.carbon_vs_average > 1 ? 'text-red-600' : 'text-green-600'">
                {{ (latestReport.carbon_vs_average * 100).toFixed(0) }}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Core Web Vitals -->
      <Card class="mb-8" v-if="latestReport.lcp_field || latestReport.fid_field || latestReport.cls_field">
        <CardHeader>
          <CardTitle>⚡ Core Web Vitals (Field Data)</CardTitle>
          <CardDescription>Real user experience data</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-3">
            <div v-if="latestReport.lcp_field">
              <p class="text-sm text-muted-foreground mb-1">Largest Contentful Paint</p>
              <span class="text-xl font-bold">{{ latestReport.lcp_field }}ms</span>
            </div>
            <div v-if="latestReport.fid_field">
              <p class="text-sm text-muted-foreground mb-1">First Input Delay</p>
              <span class="text-xl font-bold">{{ latestReport.fid_field }}ms</span>
            </div>
            <div v-if="latestReport.cls_field">
              <p class="text-sm text-muted-foreground mb-1">Cumulative Layout Shift</p>
              <span class="text-xl font-bold">{{ latestReport.cls_field }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Historical Reports -->
      <Card>
        <CardHeader>
          <CardTitle>📊 Recent Scans</CardTitle>
          <CardDescription>Last {{ website.latest_reports?.length || 0 }} scans</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div
              v-for="(report, index) in website.latest_reports"
              :key="report.id"
              class="flex items-center justify-between p-4 rounded border hover:bg-muted transition-colors"
            >
              <div>
                <p class="font-semibold">{{ new Date(report.scan_date).toLocaleDateString() }}</p>
                <p class="text-sm text-muted-foreground">Strategy: {{ report.strategy }}</p>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <p class="text-xs text-muted-foreground">Overall</p>
                  <ScoreBadge :score="Math.round(report.overall_score)" size="md" />
                </div>
                <div class="text-right">
                  <p class="text-xs text-muted-foreground">Performance</p>
                  <ScoreBadge :score="report.performance_score" size="sm" />
                </div>
                <div v-if="report.carbon_rating" class="text-right">
                  <p class="text-xs text-muted-foreground">Carbon</p>
                  <CarbonBadge :rating="report.carbon_rating" size="sm" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Error State -->
    <Card v-else class="text-center py-12">
      <CardContent>
        <h2 class="text-2xl font-bold mb-4">Website Not Found</h2>
        <p class="text-muted-foreground mb-6">The requested website could not be found.</p>
        <Button @click="navigateTo('/leaderboard')">View Leaderboard</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getWebsite } = useWatchtowerApi()

const website = ref<any>(null)
const loading = ref(true)

const latestReport = computed(() => {
  if (!website.value?.latest_reports?.length) return null
  return website.value.latest_reports[0]
})

onMounted(async () => {
  try {
    const id = route.params.id as string
    const data = await getWebsite(id)
    website.value = data
  } catch (error) {
    console.error('Failed to load website:', error)
  } finally {
    loading.value = false
  }
})

// SEO
useHead({
  title: () => website.value ? `${website.value.website.name} - Watchtower` : 'Website Details - Watchtower',
  meta: [
    { name: 'description', content: () => website.value ? `Performance and security analysis for ${website.value.website.name}` : 'Website performance analysis' }
  ]
})
</script>
