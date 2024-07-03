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
      height="1214" class="block" :image="{
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
                <!-- <p class="text-xs text-muted-foreground">
                  +20.1% from last month
                </p> -->
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
                <!-- <p class="text-xs text-muted-foreground">
                  +180.1% from last month
                </p> -->
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
                <!-- <p class="text-xs text-muted-foreground">
                  +19% from last month
                </p> -->
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
                <!-- <p class="text-xs text-muted-foreground">
                  +201 since last hour
                </p> -->
              </CardContent>
            </Card>
          </div>
          <!-- <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent class="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card class="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div> -->
          <Table>
    <TableCaption>Last Refreshed: DD/MM/YYYY</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>
          URL
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Score</TableHead>
        <TableHead class="text-right">
          Downtime
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">
          Dummy URL 1
        </TableCell>
        <TableCell>Active</TableCell>
        <TableCell>85</TableCell>
        <TableCell class="text-right">
          0 minutes
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">
          Dummy URL 2
        </TableCell>
        <TableCell>Active</TableCell>
        <TableCell>92</TableCell>
        <TableCell class="text-right">
          0 minutes
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">
          Dummy URL 3
        </TableCell>
        <TableCell>Active</TableCell>
        <TableCell>78</TableCell>
        <TableCell class="text-right">
          0 minutes
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
    </div>
  </div>
    

</template>

<script setup lang="ts">
// import Overview from './components/Overview.vue'
// import DateRangePicker from './components/DateRangePicker.vue'
// import MainNav from './components/MainNav.vue'
// import RecentSales from './components/RecentSales.vue'
// import Search from './components/Search.vue'
// import TeamSwitcher from './components/TeamSwitcher.vue'
// import UserNav from './components/UserNav.vue'


</script>
