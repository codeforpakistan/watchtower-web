<template>
    <div class="flex justify-center flex-col">
        <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            About The template
        </h2>
        <p class="leading-7">
            As builders we often come across the same problems and solutions. This starter is a collection of best practices and configurations that we have found useful in our projects. We hope you find it useful too. Feel free to extend and improve.
        </p>

        <h2 class="mt-6 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            BoostPanda
        </h2>
        <p class="leading-7">
            At BoostPanda AI, we leverage over a decade of expertise to deliver cutting-edge solutions in AI, machine learning, and full-stack development. Our mission is to turn your business objectives into intelligent, user-friendly software that drives growth and efficiency.
            We excel in creating custom enterprise applications, secure SaaS platforms, and complex systems with seamless data integrations. By following agile methodologies and lean principles, we ensure our solutions are scalable, efficient, and delivered on time.
        </p>
        <p class="leading-7 mt-3">
            We have expertise building AI powered solutions such as automated data entry using computer vision and AI, AI powered Call Center analysis, Chatbots etc. etc. Looking for a team to build something with high quality and people who work with you? Lets get in touch.
        </p>
        <div class="max-w-4xl mx-auto mt-6">
            <Button @click="sendEmail">Get in Touch</Button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        methods: {
            sendEmail() {
                window.open('mailto:hello@boostpanda.ai')
            }
        }
    }
</script>