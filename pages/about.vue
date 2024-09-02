<!-- delete this -->
<template>
    <div class="flex justify-center flex-col">
        <h2 class="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
            What is Watchtower?
        </h2>
        <p class="leading-7">
            By leveraging tools like Google's Page Speed Insights API, we  monitor and analyze key metrics across numerous government portals. Our goal is to provide reports that highlight improvements and identify areas for enhancement. Through vigilant oversight, Watchtower promotes better digital governance and fosters public trust in governmental online services. 
        </p>
        <div class="max-w-4xl mx-auto mt-6">
            <Button size="lg" class="rounded-full" @click="sendEmail">Get in Touch</Button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        methods: {
            sendEmail() {
                window.open('mailto:info@codeforpakistan.org')
            }
        }
    }
</script>