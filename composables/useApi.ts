/**
 * Watchtower API Composable
 * Provides typed API access to the Watchtower backend
 */

export const useWatchtowerApi = () => {
  const config = useRuntimeConfig()

  // Base API URL - can be configured via .env
  const baseURL = config.public.apiUrl || 'http://localhost:8000/api/v1'

  /**
   * Fetch all websites
   */
  const getWebsites = async (params?: { active_only?: boolean; government_level?: string }) => {
    return await $fetch(`${baseURL}/websites/`, {
      params,
    })
  }

  /**
   * Fetch single website with latest reports
   */
  const getWebsite = async (id: string) => {
    return await $fetch(`${baseURL}/websites/${id}`)
  }

  /**
   * Fetch website's latest score
   */
  const getWebsiteLatest = async (id: string) => {
    return await $fetch(`${baseURL}/websites/${id}/latest`)
  }

  /**
   * Fetch website's historical reports
   */
  const getWebsiteReports = async (id: string, params?: { limit?: number; strategy?: string }) => {
    return await $fetch(`${baseURL}/websites/${id}/reports`, {
      params,
    })
  }

  /**
   * Fetch full leaderboard
   */
  const getLeaderboard = async (params?: {
    sort_by?: 'overall_score' | 'performance_score' | 'accessibility_score' | 'ssl_security_score' | 'carbon_rating'
    limit?: number
    ascending?: boolean
    government_level?: string
  }) => {
    return await $fetch(`${baseURL}/leaderboard/`, {
      params,
    })
  }

  /**
   * Fetch top performers
   */
  const getTopPerformers = async (params?: { category?: string; limit?: number }) => {
    return await $fetch(`${baseURL}/leaderboard/top-performers`, {
      params,
    })
  }

  /**
   * Fetch bottom performers
   */
  const getBottomPerformers = async (params?: { category?: string; limit?: number }) => {
    return await $fetch(`${baseURL}/leaderboard/bottom-performers`, {
      params,
    })
  }

  /**
   * Fetch shame wall
   */
  const getShameWall = async (params?: { severity?: 'critical' | 'high' | 'medium'; limit?: number }) => {
    return await $fetch(`${baseURL}/leaderboard/shame-wall`, {
      params,
    })
  }

  /**
   * Fetch comprehensive statistics
   */
  const getStatistics = async () => {
    return await $fetch(`${baseURL}/stats/`)
  }

  /**
   * Fetch quick summary (lightweight)
   */
  const getSummary = async () => {
    return await $fetch(`${baseURL}/stats/summary`)
  }

  return {
    getWebsites,
    getWebsite,
    getWebsiteLatest,
    getWebsiteReports,
    getLeaderboard,
    getTopPerformers,
    getBottomPerformers,
    getShameWall,
    getStatistics,
    getSummary,
  }
}
