<template>
  <div>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>WatchTower | Keep an eye on gov services</title>
    </head>
    <body class="space-y-6 px-4 min-h-screen">
      <Navbar></Navbar>
      <div class="max-w-7xl mx-auto"><NuxtPage /></div>

      <!-- Footer -->
      <div class="max-w-7xl mx-auto sticky top-[100vh] text-center">
        <p class="py-2 text-xs">
          Built with ❤️ by
          <a
            href="https://codeforpakistan.org"
            target="_blank"
            class="text-green-600 hover:underline"
            >Code for Pakistan</a
          >
        </p>

        <!-- Light grey bar with GitHub link -->
        <div class="bg-gray-100 dark:bg-gray-800 py-2">
          <p
            class="text-xs text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2"
          >
            Source code
            <a
              href="https://github.com/codeforpakistan/watchtower-web"
              target="_blank"
              class="hover:opacity-80"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub"
                class="w-5 h-5 inline"
              />
            </a>
          </p>
        </div>
      </div>
    </body>
  </div>
</template>

<script setup lang="ts"></script>
