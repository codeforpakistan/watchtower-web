<template>
  <div>
    <h2
      class="scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0"
    >
      Gov Websites Performance
    </h2>

    <div class="flex-col md:flex">
      <div
        v-if="showSkeleton"
        class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-8"
      >
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
        <Table v-if="!showSkeleton">
          <TableCaption>Last Refreshed: {{ lastRefreshed }}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead> URL </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead class="text-right"> Response Time </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in leaderboard" :key="item.url">
              <TableCell class="font-medium">{{ item.url }}</TableCell>
              <TableCell>Active</TableCell>

              <!-- Score Circle -->
              <TableCell>
                <div
                  class="circle"
                  :style="{
                    '--progress': item.performanceScore * 360 + 'deg',
                    background: `conic-gradient(${getColor(
                      item.performanceScore
                    )} 0deg, ${getColor(item.performanceScore)} ${
                      item.performanceScore * 360
                    }deg, #e5e7eb ${item.performanceScore * 360}deg)`,
                  }"
                >
                  <span>{{ (item.performanceScore * 100).toFixed(0) }}%</span>
                </div>
              </TableCell>

              <TableCell class="text-right">
                {{ item.responseTime }} ms
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  db,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  QuerySnapshot,
} from "../firebaseConfig";
import { Timestamp } from "firebase/firestore";

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
const lastRefreshed = ref<string>("");
const showSkeleton = ref<boolean>(true);

const getColor = (score: number) => {
  if (score >= 0.7) return "green";
  if (score >= 0.4) return "orange";
  return "red";
};

// Function to fetch performance data from Firestore
const fetchPerformanceData = async () => {
  try {
    showSkeleton.value = true;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const q = query(
      collection(db, "performanceData"),
      where("timestamp", ">=", startOfMonth),
      where("timestamp", "<=", endOfMonth),
      orderBy("performanceScore", "desc"),
      orderBy("responseTime", "asc"),
      limit(200)
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    leaderboard.value = querySnapshot.docs.map((doc) => ({
      url: doc.data().url,
      performanceScore: doc.data().performanceScore,
      responseTime: doc.data().responseTime,
      timestamp: doc.data().timestamp,
    }));

    lastRefreshed.value = new Date().toLocaleDateString();
    showSkeleton.value = false;
  } catch (e) {
    console.error(e);
    showSkeleton.value = false;
  }
};

onMounted(() => {
  fetchPerformanceData();
});
</script>

<style scoped>
.circle {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #333;
}
.circle span {
  position: absolute;
}
</style>
