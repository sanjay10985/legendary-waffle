export async function getCategoryList() {
  try {
    const response = await fetch('https://snippet-api.meticha.com/category/get-category-list')
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}