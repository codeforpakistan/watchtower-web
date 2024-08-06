<template>
  <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
    Currently Leading
  </h2>

  <div class="flex items-end justify-center space-x-4 pt-4">
    <div
      v-for="(item, index) in sortedLeaderboard"
      :key="index"
      :class="`bg-gray-300 text-gray-800 w-40 flex flex-col items-center justify-end rounded-t-lg shadow-lg ${
        index === 0 ? 'h-72' : index === 1 ? 'h-60' : 'h-48'
      }`">
      <div class="bg-yellow-500 text-white w-full text-center py-2 rounded-t-lg">
        {{ index + 1 }}{{ index === 0 ? 'st' : index === 1 ? 'nd' : 'rd' }} Place
      </div>
      <div class="bg-white w-full text-center py-4">{{ item.url }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
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

const fetchPerformanceData = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const q = query(
    collection(db, 'performanceData'),
    where('timestamp', '>=', startOfMonth),
    where('timestamp', '<=', endOfMonth),
    orderBy('performanceScore', 'desc'),
    orderBy('responseTime', 'asc'),
    limit(3)
  );

  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
  leaderboard.value = querySnapshot.docs.map(doc => ({
    url: doc.data().url,
    performanceScore: doc.data().performanceScore,
    responseTime: doc.data().responseTime,
    timestamp: doc.data().timestamp,
  }));
};

onMounted(() => {
  fetchPerformanceData();
});

const sortedLeaderboard = computed(() => leaderboard.value);
</script>