export async function getGistContent(gistUrl) {
  try {
    // Extract Gist ID from URL
    const gistId = gistUrl.split('/').pop()
    
    // Fetch Gist data from GitHub API
    const response = await fetch(`https://api.github.com/gists/${gistId}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch Gist content')
    }
    
    const gistData = await response.json()
    
    // Get the first file's content (assuming single file Gist)
    const firstFile = Object.values(gistData.files)[0]
    return firstFile.content
    
  } catch (error) {
    console.error('Error fetching Gist content:', error)
    throw error
  }
}