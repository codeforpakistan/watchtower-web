<template>
  <h2
    class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    Gov Websites Performance
  </h2>

  <div>
    <VPImage
      alt="Dashboard"
      width="1280"
      height="1214"
      class="block"
      :image="{
        dark: '/examples/dashboard-dark.png',
        light: '/examples/dashboard-light.png',
      }"
    />
  </div>

  <div class="flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <TeamSwitcher />
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Total Websites being monitored
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              75
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Websites Down
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              23
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Websites Below 90 Score
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              33
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Websites with SSL issues
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              12
            </div>
          </CardContent>
        </Card>
      </div>
      <Table>
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

// Function to fetch performance data from Firestore
const fetchPerformanceData = async () => {
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
};

// Fetch performance data when the component is mounted
onMounted(() => {
  fetchPerformanceData();
});
</script>