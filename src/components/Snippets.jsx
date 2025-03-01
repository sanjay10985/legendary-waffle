'use client'

import { useEffect, useState } from 'react'
import { Heading } from '@/components/Heading'
import { SnippetCard } from '@/components/SnippetCard'
import { getSnippets } from '@/services/snippetService'

export function Snippets() {
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSnippets() {
      try {
        const response = await getSnippets()
        setSnippets(response.data.items || [])
      } catch (error) {
        console.error('Error loading snippets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSnippets()
  }, [])

  if (loading) {
    return (
      <div className="my-16 animate-pulse xl:max-w-none">
        <div className="h-8 w-32 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-3 dark:border-white/5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] rounded-2xl bg-zinc-100 dark:bg-zinc-800"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="snippets">
        Featured Snippets
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-3 dark:border-white/5">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </div>
  )
}
