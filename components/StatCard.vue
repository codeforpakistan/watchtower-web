<template>
  <Card class="relative group overflow-hidden">
    <div
      class="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200">
    </div>
    <CardContent class="relative p-6">
      <div class="flex items-start justify-between">
        <div class="space-y-2 flex-1">
          <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
          <div class="text-3xl font-bold tracking-tight">{{ value }}</div>
          <p v-if="subtitle" class="text-xs text-muted-foreground">{{ subtitle }}</p>
        </div>
        <div v-if="icon" class="text-4xl opacity-20">
          {{ icon }}
        </div>
      </div>
      <div v-if="trend" class="mt-4 flex items-center text-xs">
        <span :class="trend.type === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
          {{ trend.type === 'up' ? '↑' : '↓' }} {{ trend.value }}
        </span>
        <span class="ml-2 text-muted-foreground">{{ trend.label }}</span>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  subtitle?: string
  icon?: string
  trend?: {
    type: 'up' | 'down'
    value: string
    label: string
  }
}>()
</script>
