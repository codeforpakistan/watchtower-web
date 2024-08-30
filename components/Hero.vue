<template>
  <main class="grid lg:grid-cols-2 place-items-center">
    <div class="py-6 md:order-1 hidden md:block">
      <img v-if="colorMode.preference !== 'dark'" src="@/assets/images/dark-tower.svg" alt="watchtower girl standing next to it" loading="eager"
        class="w-full h-auto" />
        <img v-if="colorMode.preference === 'dark'" src="@/assets/images/light-tower.svg" alt="watchtower girl standing next to it" loading="eager"
        class="w-full h-auto" />
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="25em" height="25em" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="m256 32l-96 48h23v71h-32v50h30.945L155.36 440.244l-.653.477l.522.72l-4.175 37.566l-.994 8.945l17.89 1.99l.995-8.946L171.61 457h168.78l2.665 23.994l.994 8.945l17.89-1.99l-.995-8.944l-4.174-37.567l.523-.72l-.654-.476L330.054 201H361v-50h-32V80h23zm-48 64h32v48h-32zm64 0h32v48h-32zm-103 73h14v14h-14zm32 0h14v14h-14zm32 0h14v14h-14zm32 0h14v14h-14zm32 0h14v14h-14zm32 0h14v14h-14zm-113.328 32h80.656L256 236.848zm-16.65 9.283L240.33 247h-45.385l4.08-36.717zm113.955 0l4.08 36.717h-45.385zM192.945 265h31.383l-34.822 30.953l3.44-30.953zm58.477 0h9.156l51.75 46H199.672zm36.25 0h31.383l3.44 30.953L287.67 265zm-83.994 64h104.644L256 367.053zm-18.8 8.586L236.323 375h-55.6l4.157-37.414zm142.243 0L331.278 375h-55.6l51.444-37.414zM178.724 393h41.6l-45.26 32.914zm72.205 0h10.144l63.25 46H187.678l63.25-46zm40.75 0h41.6l3.658 32.914z" />
        </svg> -->
    </div>
    <div>
      <div class="wrapper">
        <div class="text-container">
          <h1 class="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl multi-colored-text">
            Watch
            Tower
          </h1>
        </div>
      </div>

      <p class="text-xl text-muted-foreground inline-flex whitespace-nowrap justify-start mt-4">
        Elevating Digital
        <span class="text-primary ml-2">Governance with Vigilance</span>
      </p>
      <p class="leading-7 [&:not(:first-child)]:mt-6">
        Watchtower monitors and analyzes government websites to ensure top performance, accessibility, and transparency.
      </p>
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <Button size="lg" class="rounded-full" @click="$router.push('/data')">Get Started</Button>
        <Button size="lg" class="rounded-full" variant="outline" @click="$router.push('/performance')">
          More Info
        </Button>
      </div>
    </div>
  </main>
</template>


<script setup>
const colorMode = useColorMode();

</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  :root {
    --color-black: var(--color-white);
    --color-white: #000000; 
  }
}
.multi-colored-text {
  font-family: "Exo", sans-serif;
  font-weight: 900;
  width: min-content;
  text-transform: uppercase;
  background: linear-gradient(45deg,
      var(--color-black) 50%,
      var(--color-red) 50%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.wrapper {
  line-height: 1;
  min-height: 100%;
}

.text-container {
  background: radial-gradient(circle at 98% 98%, var(--color-red) .8%, transparent .8%),
    radial-gradient(circle at 95% 95%, var(--color-2) .45%, transparent .45%),
    radial-gradient(circle at 94.5% 97.5%, var(--color-3) .5%, transparent .5%),
    radial-gradient(circle at 98.5% 95.5%, var(--color-4) .25%, transparent .25%),
    radial-gradient(circle at 1.4% 1.4%, var(--color-red) .8%, transparent .8%),
    radial-gradient(circle at 5.5% 3%, var(--color-2) .45%, transparent .45%),
    radial-gradient(circle at 2.5% 3.5%, var(--color-3) .5%, transparent .5%),
    radial-gradient(circle at 4.5% 1.2%, var(--color-4) .25%, transparent .25%);
}

@media screen and (min-width: 768px) {
  .multi-colored-text {
    font-size: 4rem;
  }
}
@media (prefers-color-scheme: dark) {
    .invert-on-dark-mode {
        filter: invert(1);
    }
}
</style>