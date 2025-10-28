<template>
  <div :class="badgeClasses">
    <span class="font-bold">{{ score }}</span>
    <span v-if="showLabel" class="text-xs ml-1">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  label?: string
  showLabel?: boolean
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

  // Color based on score
  let colorClass = ''
  if (props.score >= 90) {
    colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  } else if (props.score >= 75) {
    colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  } else if (props.score >= 50) {
    colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  } else if (props.score >= 25) {
    colorClass = 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  } else {
    colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  return `${base} ${sizeClass} ${colorClass}`
})
</script>
