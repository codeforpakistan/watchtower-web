<template>
  <h2 class="font-bold scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="ml-2">
      <path fill="#E11D47"
        d="M11.5 19v-3.754q-1.379-.102-2.399-.999t-1.278-2.258q-1.587-.187-2.705-1.301T4 8v-.385q0-.666.475-1.14T5.615 6h2.039v-.385q0-.666.474-1.14Q8.603 4 9.27 4h5.462q.666 0 1.14.475q.475.474.475 1.14V6h2.039q.666 0 1.14.475T20 7.615V8q0 1.573-1.118 2.688t-2.705 1.3q-.258 1.362-1.278 2.259t-2.399 1V19h2.616q.212 0 .356.144t.144.357t-.144.356t-.356.143H8.885q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143zm-3.846-8.084V7H5.615q-.269 0-.442.173T5 7.616V8q0 1.123.762 1.953q.761.83 1.892.963m4.35 3.353q1.38 0 2.342-.965q.962-.964.962-2.343V5.616q0-.27-.174-.443Q14.962 5 14.692 5H9.308q-.27 0-.442.173q-.174.173-.174.443v5.346q0 1.378.966 2.343q.967.964 2.347.964m4.341-3.353q1.131-.133 1.893-.963Q19 9.123 19 8v-.385q0-.269-.173-.442T18.385 7h-2.039zM12 9.635" />
    </svg>
    Currently Leading
  </h2>

  <!-- <div class="flex items-end justify-center space-x-4 pt-4">
    <div v-for="(item, index) in sortedLeaderboard" :key="index" :class="`bg-gray-300 text-gray-800 w-40 flex flex-col items-center justify-end rounded-t-lg shadow-lg ${index === 0 ? 'h-72' : index === 1 ? 'h-60' : 'h-48'
      }`">
      <div class="bg-yellow-500 text-white w-full text-center py-2 rounded-t-lg">
        {{ index + 1 }}{{ index === 0 ? 'st' : index === 1 ? 'nd' : 'rd' }} Place
      </div>
      <div class="bg-white w-full text-center py-4">{{ item.shortName }}</div>
    </div>
  </div> -->

  <!-- <div v-if="!showSkeleton" class="flex items-end justify-center gap-5 mb-10 mt-10">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            class="flex flex-col justify-end items-center w-32 h-48 bg-gradient-to-br from-gray-400 to-gray-300 rounded-t-lg shadow-md relative hover:shadow-lg hover:scale-105 transition-transform duration-200">
            <div
              class="w-16 h-16 bg-gray-400 rounded-full absolute top-[-40px] flex justify-center items-center text-white text-2xl font-bold shadow-md">
              2
            </div>
            <div class="w-16 h-20 bg-gray-400 rounded-t-full relative -top-10"></div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <a :href=podiumUrls[1] target="_blank">{{ podiumUrls[1] }}</a>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <div
            class="flex flex-col justify-end items-center w-32 h-60 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-t-lg shadow-md relative hover:shadow-lg hover:scale-105 transition-transform duration-200">
            <div
              class="w-16 h-16 bg-yellow-500 rounded-full absolute top-[-40px] flex justify-center items-center text-white text-2xl font-bold shadow-md">
              1
            </div>
            <div class="w-16 h-20 bg-yellow-500 rounded-t-full relative -top-10"></div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <a :href=podiumUrls[0] target="_blank">{{ podiumUrls[0] }}</a>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <div
            class="flex flex-col justify-end items-center w-32 h-40 bg-gradient-to-br from-yellow-900 to-yellow-700 rounded-t-lg shadow-md relative hover:shadow-lg hover:scale-105 transition-transform duration-200">
            <div
              class="w-16 h-16 bg-yellow-900 rounded-full absolute top-[-40px] flex justify-center items-center text-white text-2xl font-bold shadow-md">
              3
            </div>
            <div class="w-16 h-20 bg-yellow-900 rounded-t-full relative -top-10"></div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <a :href=podiumUrls[2] target="_blank">{{ podiumUrls[2] }}</a>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div> -->
  
  <div v-if="!showSkeleton" class="flex justify-center py-10">
    <img src="@/assets/images/podium.svg" alt="Podium" class=" md:w-1/3 md:h-1/3 sm:w-1/2 sm:h1/2" />
  </div>
  <div v-if="showSkeleton" class="flex flex-col items-center space-y-4">
    <Card v-for="n in 3" :key="n" class="flex items-center space-x-4 w-96 px-4 py-4">
      <Skeleton class="h-12 w-12 rounded-full bg-muted" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px] bg-muted" />
        <Skeleton class="h-4 w-[200px] bg-muted" />
      </div>
    </Card>
  </div>
  <div v-if="!showSkeleton" class="flex flex-col items-center space-y-4">
    <Card @click="openUrl(item.url)" v-for="(item, index) in sortedLeaderboard" :key="index"
      :class="`flex items-center bg-white rounded-lg p-5 w-96 animate-fadeIn cursor-pointer`"
      :style="{ animationDelay: `${index * 0.2}s` }">
      <div
        :class="`w-10 h-10 rounded-full text-white flex items-center justify-center text-xl font-bold mr-4 ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-yellow-900'}`">
        {{ index + 1 }}
      </div>
      <div class="text-gray-800 font-medium">{{ item.url }}</div>
    </Card>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { db, collection, getDocs, query, where, orderBy, limit, QuerySnapshot } from '../firebaseConfig';
import { Timestamp } from 'firebase/firestore';

const showSkeleton = ref(false);
interface PerformanceItem {
  url: string;
  shortName: any;
  performanceScore: number;
  responseTime: number;
  timestamp: Timestamp;
}

interface DocumentData {
  [field: string]: any;
}

const leaderboard = ref<PerformanceItem[]>([]);

const extractSiteName = (url: string) => {
  try {
    let cleanedUrl = url.replace(/^https?:\/\//, '');
    let siteName = cleanedUrl.split('/')[0];
    return siteName;
  } catch (error) {
    return url;
  }
};

const openUrl = (url: string) => {
  window.open(url, '_blank');
};

const fetchPerformanceData = async () => {
  try {
    showSkeleton.value = true;
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
      shortName: extractSiteName(doc.data().url),
      performanceScore: doc.data().performanceScore,
      responseTime: doc.data().responseTime,
      timestamp: doc.data().timestamp,
    }));
    showSkeleton.value = false;
  }
  catch (error) {
    console.error(error);
    showSkeleton.value = false;
  }
};


onMounted(() => {
  fetchPerformanceData();
});


const sortedLeaderboard = computed(() => leaderboard.value);

const podiumUrls = computed(() => sortedLeaderboard.value.map(item => item.url));
</script>

<style>
.podium {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  transform: translateY(10%);
  animation: podiumEntrance 1s ease-out forwards;
}

@keyframes podiumEntrance {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.tier {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 120px;
  border-radius: 12px 12px 0 0;
  /* Rounded top corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: riseUp 0.8s ease-out forwards;
}

.tier:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2), 0 8px 12px rgba(0, 0, 0, 0.2);
}

@keyframes riseUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.first {
  height: 240px;
  background: linear-gradient(135deg, #ffd700, #ffda53);
  /* Gold gradient */
}

.second {
  height: 180px;
  background: linear-gradient(135deg, #c0c0c0, #d3d3d3);
  /* Silver gradient */
}

.third {
  height: 120px;
  background: linear-gradient(135deg, #cd7f32, #d19768);
  /* Bronze gradient */
}

.position {
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.trophy {
  width: 60px;
  height: 80px;
  position: absolute;
  top: -100px;
  background-color: currentColor;
  border-radius: 20px 20px 0 0;
  /* Rounded top for the cup */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-shadow: inset 0 -10px 10px rgba(0, 0, 0, 0.2);
  /* Inner shadow for depth */
}

.gold-trophy {
  color: #ffd700;
  /* Gold color */
}

.silver-trophy {
  color: #c0c0c0;
  /* Silver color */
}

.bronze-trophy {
  color: #cd7f32;
  /* Bronze color */
}

/* Trophy handles */
.trophy::before,
.trophy::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 40px;
  background-color: currentColor;
  border-radius: 50%;
  top: 10px;
}

.trophy::before {
  left: -20px;
}

.trophy::after {
  right: -20px;
}

/* Trophy stem */
.trophy::after {
  content: '';
  position: absolute;
  bottom: -10px;
  width: 20px;
  height: 30px;
  background-color: currentColor;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

/* Trophy base */
.trophy::before {
  content: '';
  position: absolute;
  bottom: -25px;
  width: 50%;
  height: 10px;
  background-color: currentColor;
  border-radius: 5px;
  left: 50%;
  transform: translateX(-50%);
}

.tier:hover .position {
  color: #fff;
}

.tier::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 12px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  z-index: 1;
}
</style>