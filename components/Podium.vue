<template>
    <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      Currently Leading
    </h2>

    <div class="flex items-end justify-center space-x-4 pt-4">
        <!-- Second Place -->
        <div class="bg-gray-300 text-gray-800 w-40 h-60 flex flex-col items-center justify-end rounded-t-lg shadow-lg">
            <div class="bg-yellow-500 text-white w-full text-center py-2 rounded-t-lg">2nd Place</div>
            <div class="bg-white w-full text-center py-4">Website B</div>
        </div>

        <!-- First Place -->
        <div class="bg-gray-300 text-gray-800 w-40 h-72 flex flex-col items-center justify-end rounded-t-lg shadow-lg">
            <div class="bg-yellow-500 text-white w-full text-center py-2 rounded-t-lg">1st Place</div>
            <div class="bg-white w-full text-center py-4">Website A</div>
        </div>

        <!-- Third Place -->
        <div class="bg-gray-300 text-gray-800 w-40 h-48 flex flex-col items-center justify-end rounded-t-lg shadow-lg">
            <div class="bg-yellow-500 text-white w-full text-center py-2 rounded-t-lg">3rd Place</div>
            <div class="bg-white w-full text-center py-4">Website C</div>
        </div>
    </div>
</template>
  
  <script setup>
  
  // Example data, replace with your actual data source
  const leaderboard = ref([
    { url: 'Dummy URL 1', status: 'Active', score: 85, downtime: '0' },
    { url: 'Dummy URL 2', status: 'Active', score: 92, downtime: '0' },
    { url: 'Dummy URL 3', status: 'Active', score: 78, downtime: '0' },
  ]);
  </script>