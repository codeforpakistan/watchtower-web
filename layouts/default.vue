<template>
  <div>

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WatchTower | Keep an eye on gov services</title>
    </head>

    <body class="space-y-6 px-4 min-h-screen">

      <Navbar></Navbar>
      <div class="max-w-7xl mx-auto">
        <NuxtPage />
      </div>
      <div class="max-w-7xl mx-auto sticky top-[100vh] text-center">
        <p class="py-2 text-xs">Built with ❤️ by <a href="https://codeforpakistan.org" target="_blank"
            class="text-green-600">Code for
            Pakistan</a></p>
      </div>
    </body>
  </div>
</template>

<script setup lang="ts">
</script>

