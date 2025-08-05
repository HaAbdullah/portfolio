const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'

export interface YouTubeVideo {
  id: string
  title: string
  artist: string
  thumbnail: string
  duration?: string
}

export interface PlaylistResponse {
  videos: YouTubeVideo[]
  totalCount: number
}

export class YouTubeApiService {
  private static async fetchWithRetry(url: string, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error(`API call failed (attempt ${i + 1}):`, error)
        if (i === retries - 1) throw error
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
  }

  static async getPlaylistVideos(playlistId: string, maxResults = 10): Promise<PlaylistResponse> {
    // Check if API key is available
    if (!YOUTUBE_API_KEY) {
      console.error('YouTube API key not found. Make sure VITE_YOUTUBE_API_KEY is set in .env file')
      throw new Error('YouTube API key not configured')
    }

    try {
      // Step 1: Get playlist items
      const playlistUrl = `${YOUTUBE_API_BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
      const playlistData = await this.fetchWithRetry(playlistUrl)

      if (!playlistData.items || playlistData.items.length === 0) {
        console.warn('No videos found in playlist')
        return { videos: [], totalCount: 0 }
      }

      // Step 2: Get video details for durations (optional)
      const videoIds = playlistData.items
        .map((item: any) => item.snippet.resourceId.videoId)
        .join(',')

      const videosUrl = `${YOUTUBE_API_BASE_URL}/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      const videosData = await this.fetchWithRetry(videosUrl)

      // Step 3: Process and format the data
      const videos: YouTubeVideo[] = playlistData.items.map((item: any) => {
        const snippet = item.snippet
        const videoId = snippet.resourceId.videoId
        const videoDetails = videosData.items?.find((v: any) => v.id === videoId)
        
        // Extract artist from title (common patterns: "Artist - Song" or "Song by Artist")
        let title = snippet.title
        let artist = snippet.videoOwnerChannelTitle || 'Unknown Artist'
        
        // Try to parse "Artist - Song" format
        if (title.includes(' - ')) {
          const parts = title.split(' - ')
          if (parts.length >= 2) {
            artist = parts[0].trim()
            title = parts.slice(1).join(' - ').trim()
          }
        }

        // Remove common suffixes
        title = title.replace(/\s*\(.*?\)\s*$/, '').replace(/\s*\[.*?\]\s*$/, '')
        artist = artist.replace(/\s*- Topic\s*$/, '').replace(/\s*VEVO\s*$/, '')

        return {
          id: videoId,
          title: title || 'Untitled',
          artist: artist || 'Unknown Artist',
          thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || '',
          duration: videoDetails?.contentDetails?.duration
        }
      })

      return {
        videos,
        totalCount: playlistData.pageInfo?.totalResults || videos.length
      }

    } catch (error) {
      console.error('Error fetching playlist:', error)
      
      // Return fallback data if API fails
      return {
        videos: [
          {
            id: 'byvSTnxddN4',
            title: 'Fallback Song',
            artist: 'API Error - Using Fallback',
            thumbnail: 'https://img.youtube.com/vi/byvSTnxddN4/mqdefault.jpg'
          }
        ],
        totalCount: 1
      }
    }
  }

  static formatDuration(duration: string): string {
    // Convert YouTube duration format (PT4M13S) to readable format (4:13)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return ''
    
    const hours = parseInt(match[1] || '0')
    const minutes = parseInt(match[2] || '0')
    const seconds = parseInt(match[3] || '0')
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
}

export default YouTubeApiService