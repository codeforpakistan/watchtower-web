<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold tracking-tight mb-2 flex items-center">
        <span class="mr-3">⚠️</span>
        Needs Improvement
      </h1>
      <p class="text-lg text-muted-foreground">
        Government websites that need immediate attention for critical security, performance, or accessibility issues
      </p>
    </div>

    <!-- Severity Filter -->
    <Card class="mb-8">
      <CardContent class="pt-6">
        <div class="flex items-center gap-4">
          <label class="text-sm font-medium">Filter by Severity:</label>
          <div class="flex gap-2">
            <Button
              :variant="!severity ? 'default' : 'outline'"
              @click="severity = null; loadNeedsImprovement()"
            >
              All
            </Button>
            <Button
              :variant="severity === 'critical' ? 'destructive' : 'outline'"
              @click="severity = 'critical'; loadNeedsImprovement()"
            >
              Critical
            </Button>
            <Button
              :variant="severity === 'high' ? 'destructive' : 'outline'"
              @click="severity = 'high'; loadNeedsImprovement()"
            >
              High
            </Button>
            <Button
              :variant="severity === 'medium' ? 'outline' : 'outline'"
              @click="severity = 'medium'; loadNeedsImprovement()"
            >
              Medium
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <Card v-for="n in 8" :key="n">
        <CardContent class="p-6">
          <Skeleton class="h-32 w-full bg-muted" />
        </CardContent>
      </Card>
    </div>

    <!-- Needs Improvement Sites -->
    <div v-else class="grid gap-6 md:grid-cols-2">
      <Card
        v-for="site in needsImprovementData?.needs_improvement || []"
        :key="site.id"
        class="border-l-4 border-red-500 hover:shadow-xl transition-all cursor-pointer"
        @click="navigateTo(`/website/${site.id}`)"
      >
        <CardHeader>
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <CardTitle class="flex items-center gap-2">
                {{ site.name }}
                <span
                  v-if="site.latest_report?.ssl_improvement_severity"
                  :class="{
                    'text-red-600': site.latest_report.ssl_improvement_severity === 'critical',
                    'text-orange-600': site.latest_report.ssl_improvement_severity === 'high',
                    'text-yellow-600': site.latest_report.ssl_improvement_severity === 'medium'
                  }"
                  class="text-sm font-normal"
                >
                  ({{ site.latest_report.ssl_improvement_severity }})
                </span>
              </CardTitle>
              <CardDescription>
                <a :href="site.url" target="_blank" class="hover:underline" @click.stop>
                  {{ site.url }}
                </a>
              </CardDescription>
            </div>
            <ScoreBadge :score="Math.round(site.overall_score || 0)" size="lg" />
          </div>
        </CardHeader>
        <CardContent>
          <!-- Improvement Reasons -->
          <div class="space-y-3">
            <div class="text-sm font-semibold text-red-600 dark:text-red-400">Issues Found:</div>
            <ul class="space-y-2">
              <li
                v-for="(reason, index) in site.improvement_reasons"
                :key="index"
                class="flex items-start gap-2 text-sm"
              >
                <span class="text-red-500 mt-0.5">●</span>
                <span>{{ reason }}</span>
              </li>
            </ul>

            <!-- SSL Details -->
            <div v-if="site.latest_report" class="grid grid-cols-2 gap-3 mt-4 pt-4 border-t text-xs">
              <div>
                <span class="text-muted-foreground">SSL Valid:</span>
                <span :class="site.latest_report.ssl_valid ? 'text-green-600' : 'text-red-600'" class="ml-2 font-semibold">
                  {{ site.latest_report.ssl_valid ? '✓ Yes' : '✗ No' }}
                </span>
              </div>
              <div>
                <span class="text-muted-foreground">HTTPS Enforced:</span>
                <span :class="site.latest_report.https_enforced ? 'text-green-600' : 'text-red-600'" class="ml-2 font-semibold">
                  {{ site.latest_report.https_enforced ? '✓ Yes' : '✗ No' }}
                </span>
              </div>
              <div>
                <span class="text-muted-foreground">Performance:</span>
                <ScoreBadge :score="site.latest_report.performance_score || 0" size="sm" class="ml-2" />
              </div>
              <div>
                <span class="text-muted-foreground">Accessibility:</span>
                <ScoreBadge :score="site.latest_report.accessibility_score || 0" size="sm" class="ml-2" />
              </div>
              <div v-if="site.latest_report.ssl_days_until_expiry !== null">
                <span class="text-muted-foreground">SSL Expires:</span>
                <span class="ml-2 font-semibold" :class="site.latest_report.ssl_days_until_expiry < 30 ? 'text-red-600' : ''">
                  {{ site.latest_report.ssl_days_until_expiry }} days
                </span>
              </div>
              <div v-if="site.latest_report.carbon_rating">
                <span class="text-muted-foreground">Carbon:</span>
                <CarbonBadge :rating="site.latest_report.carbon_rating" size="sm" class="ml-2" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter class="text-xs text-muted-foreground">
          Last scanned: {{ site.latest_report?.scan_date ? new Date(site.latest_report.scan_date).toLocaleDateString() : 'Never' }}
        </CardFooter>
      </Card>

      <!-- Empty State -->
      <Card v-if="!needsImprovementData?.needs_improvement?.length" class="col-span-full text-center py-12">
        <CardContent>
          <div class="text-4xl mb-4">🎉</div>
          <h3 class="text-xl font-bold mb-2">All Sites Meeting Standards!</h3>
          <p class="text-muted-foreground">
            All websites are meeting minimum security and performance standards.
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Stats Footer -->
    <Card class="mt-8" v-if="!loading && needsImprovementData">
      <CardContent class="p-6">
        <div class="flex justify-between items-center flex-wrap gap-4">
          <div class="text-sm">
            <span class="font-semibold text-red-600">{{ needsImprovementData.total_count }}</span>
            <span class="text-muted-foreground"> websites with critical issues</span>
          </div>
          <div class="text-sm text-muted-foreground">
            {{ needsImprovementData.description }}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
const { getNeedsImprovement } = useWatchtowerApi()

const needsImprovementData = ref<any>(null)
const loading = ref(true)
const severity = ref<'critical' | 'high' | 'medium' | null>(null)

const loadNeedsImprovement = async () => {
  loading.value = true
  try {
    const data = await getNeedsImprovement({
      severity: severity.value || undefined,
      limit: 50
    })
    needsImprovementData.value = data
  } catch (error) {
    console.error('Failed to load needs improvement sites:', error)
  } finally {
    loading.value = false
  }
}

// Initial load
onMounted(() => {
  loadNeedsImprovement()
})

// SEO
useHead({
  title: 'Needs Improvement - Watchtower',
  meta: [
    { name: 'description', content: 'Government websites with critical security, performance, or accessibility issues that need immediate attention.' }
  ]
})
</script>
