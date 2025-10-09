<template>
  <div :class="badgeClasses">
    <span class="font-bold">{{ rating }}</span>
    <span v-if="showCO2" class="text-xs ml-1">({{ co2 }}g CO₂)</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rating: string
  co2?: number
  showCO2?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-full font-semibold transition-all'

  // Size classes
  const sizeClass = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }[props.size || 'md']

  // Color based on rating
  const colorClass = {
    'A+': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    'A': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'B': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
    'C': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'D': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'F': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }[props.rating] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'

  return `${base} ${sizeClass} ${colorClass}`
})
</script>
