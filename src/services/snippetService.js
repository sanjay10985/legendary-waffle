export async function getSnippets(page = 1, pageSize = 10) {
  try {
    const response = await fetch(
      `https://snippet-api.meticha.com/snippet/get-snippet-list?page=${page}&pageSize=${pageSize}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch snippets')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching snippets:', error)
    return { data: { items: [] } }
  }
}

export async function getSnippetById(id) {
  try {
    const response = await fetch(
      `https://snippet-api.meticha.com/snippet/get-snippet-by-id?id=${id}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch snippet details')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching snippet details:', error)
    throw error
  }
}