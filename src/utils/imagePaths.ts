/**
 * Get the correct image path based on the deployment environment
 * For GitHub Pages: adds /portfolio/ prefix
 * For Vercel: uses root path
 */
export const getImagePath = (imagePath: string): string => {
  // Check if we're in GitHub Pages environment
  const isGitHubPages = window.location.hostname.includes('github.io')
  
  // If it's GitHub Pages and path doesn't already include /portfolio/, add it
  if (isGitHubPages && !imagePath.startsWith('/portfolio/')) {
    return `/portfolio${imagePath}`
  }
  
  // For Vercel or other deployments, use the path as-is
  return imagePath
}