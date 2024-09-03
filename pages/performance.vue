<template>
  <div>
    <h2 class="scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
      Gov Websites Performance
    </h2>

    <div class="flex-col md:flex">

      <div v-if="showSkeleton" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-8">
        <div v-for="n in 4" :key="n">
          <Card>
            <Skeleton class="h-24 w-auto bg-muted" />
          </Card>
        </div>
      </div>
      <div v-if="showSkeleton" class="p-8">
        <Table>
          <TableRow v-for="n in 12" :key="n">
            <Skeleton class="h-6 mb-4 w-auto bg-muted" />
          </TableRow>
        </Table>
      </div>

      <div class="flex-1 space-y-4 p-8 pt-6">
        <!-- <div v-if="!showSkeleton" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <div class="relative group">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
          </div>
          <div
            class="relative px-7 py-6 bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-gray-700 rounded-lg leading-none flex items-top justify-start space-x-6">
            <div class="space-y-2">
              <p class="text-slate-800 dark:text-slate-200"> Websites being monitored</p>
              <div class="text-2xl font-bold dark:text-white">
                75
              </div>
            </div>
          </div>
        </div>
        <div class="relative group">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
          </div>
          <div
            class="relative px-7 py-6 bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-gray-700 rounded-lg leading-none flex items-top justify-start space-x-6">
            <div class="space-y-2">
              <p class="text-slate-800 dark:text-slate-200"> Websites Down</p>
              <div class="text-2xl font-bold dark:text-white">
                23
              </div>
            </div>
          </div>
        </div>
        <div class="relative group">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
          </div>
          <div
            class="relative px-7 py-6 bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-gray-700 rounded-lg leading-none flex items-top justify-start space-x-6">
            <div class="space-y-2">
              <p class="text-slate-800 dark:text-slate-200"> Websites Below 90 Score</p>
              <div class="text-2xl font-bold dark:text-white">
                33
              </div>
            </div>
          </div>
        </div>

        <div class="relative group">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
          </div>
          <div
            class="relative px-7 py-6 bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-gray-700 rounded-lg leading-none flex items-top justify-start space-x-6">
            <div class="space-y-2">
              <p class="text-slate-800 dark:text-slate-200"> Websites with SSL issues</p>
              <div class="text-2xl font-bold dark:text-white">
                12
              </div>
            </div>
          </div>
        </div>
      </div> -->

        <Table v-if="!showSkeleton">
          <TableCaption>Last Refreshed: {{ lastRefreshed }}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                URL
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead class="text-right">
                Response Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in leaderboard" :key="item.url">
              <TableCell class="font-medium">{{ item.url }}</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>{{ item.performanceScore }}</TableCell>
              <TableCell class="text-right">{{ item.responseTime }} ms</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db, collection, getDocs, query, where, orderBy, limit, QuerySnapshot } from '../firebaseConfig';
import { Timestamp } from 'firebase/firestore';

interface PerformanceItem {
  url: string;
  performanceScore: number;
  responseTime: number;
  timestamp: Timestamp;
}

interface DocumentData {
  [field: string]: any;
}

const leaderboard = ref<PerformanceItem[]>([]);
const lastRefreshed = ref<string>('');
const showSkeleton = ref<boolean>(true);

// Function to fetch performance data from Firestore
const fetchPerformanceData = async () => {
  try {
    showSkeleton.value = true;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Query to fetch the top 3 documents based on performanceScore and responseTime
    const q = query(
      collection(db, 'performanceData'),
      where('timestamp', '>=', startOfMonth),
      where('timestamp', '<=', endOfMonth),
      orderBy('performanceScore', 'desc'),
      orderBy('responseTime', 'asc'),
      limit(200)
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    // Map the fetched documents to the PerformanceItem interface
    leaderboard.value = querySnapshot.docs.map(doc => ({
      url: doc.data().url,
      performanceScore: doc.data().performanceScore,
      responseTime: doc.data().responseTime,
      timestamp: doc.data().timestamp,
    }));

    // Update the last refreshed date
    lastRefreshed.value = new Date().toLocaleDateString();
    showSkeleton.value = false;
  } catch (e) {
    console.error(e);
    showSkeleton.value = false;
  }
};

// Fetch performance data when the component is mounted
onMounted(() => {
  fetchPerformanceData();
});
</script>