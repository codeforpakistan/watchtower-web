<template>
    <main class="grid lg:grid-cols-2 place-items-center">
      <div class="py-6 md:order-1 hidden md:block">
        <img src="@/assets/images/watchtowerheader.png" alt="watchtower girl standing next to it" loading="eager" class="w-full h-auto" />
      </div>
      <div>
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Watchtower
        </h1>
        <p class="text-xl text-muted-foreground">
            Elevating Digital Governance with Vigilance
        </p>
        <p class="leading-7 [&:not(:first-child)]:mt-6"> 
            Watchtower monitors and analyzes government websites to ensure top performance, accessibility, and transparency.
        </p>
        <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <Button @click="$router.push('/data')">Get Started</Button>
        <Button variant="outline" @click="$router.push('/performance')">
            More Info
        </Button>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
    import { Icon } from '@iconify/vue';
  </script>
  