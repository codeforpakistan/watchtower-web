<template>
  <div>

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WatchTower | Keep an eye on what gov services</title>
    </head>

    <body class="space-y-6 px-4 min-h-screen">

      <nav class="flex justify-between items-center py-4">
        <div class="flex space-x-4">
          <a href="/" class="text-gray-800 dark:text-gray-200">Home</a>
          <a href="/about" class="text-gray-800 dark:text-gray-200">About</a>
          <a href="/contact" class="text-gray-800 dark:text-gray-200">Contact</a>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              <Icon icon="radix-icons:moon"
                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icon icon="radix-icons:sun"
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="colorMode.preference = 'light'">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'dark'">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'system'">
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div class="max-w-7xl mx-auto">
        <NuxtPage />
      </div>


      <div class="max-w-7xl mx-auto sticky top-[100vh] text-center">
        <p class="py-2 text-xs">Built with ❤️ by <a href="https://aliirz.com" target="_blank">aliirz</a></p>
      </div>
    </body>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const colorMode = useColorMode()
</script>