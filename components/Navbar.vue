<template>
<nav class="relative flex w-full flex-nowrap items-center justify-between py-2 lg:flex-wrap lg:justify-start lg:py-4" data-twe-navbar-ref>
    <div class="flex w-full flex-wrap items-center justify-between px-3">
      <button class="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden" type="button" @click="isMenuOpen = !isMenuOpen" aria-controls="navbarSupportedContent13" aria-expanded="false" aria-label="Toggle navigation">
        <span class="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75a.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
      <div :class="{'!visible mt-2': isMenuOpen, 'hidden': !isMenuOpen, 'flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto': true}" id="navbarSupportedContent13">
        <div class="ms-2">
          <a class="text-xl text-black dark:text-white" href="/"><img src="@/assets/images/logosm.png" alt="Logo" class="h-6 w-6" /></a>
        </div>
        <ul class="list-style-none flex flex-col ps-0 lg:mt-1 lg:flex-row ml-auto mr-24">
          <li class="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2">
            <a :class="{'underline text-primary': route.path === '/performance', 'text-black dark:text-white lg:px-2': true}" aria-current="page" href="/performance">Data</a>
          </li>
          <li class="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2">
            <a :class="{'underline text-primary': route.path === '/about', 'text-black dark:text-white lg:px-2': true}" aria-current="page" href="/about">About</a>
          </li>
          <li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0">
            <a :class="{'underline text-primary': route.path === '/contact', 'text-black dark:text-white lg:px-2': true}" aria-current="page" href="/contact">Contact</a>
          </li>
        </ul>
        <div class="flex items-center">
          <a class="text-gray-800 dark:text-gray-200 mr-4" @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'">
            <Icon :icon="colorMode.preference === 'dark' ? 'radix-icons:moon' : 'radix-icons:sun'" class="h-[1.2rem] w-[1.2rem]" />
            <span class="sr-only">Toggle theme</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';

const colorMode = useColorMode();
const isMenuOpen = ref(false);
const route = useRoute();
</script>