'use client'

import { useEffect, useState } from 'react'
import { getSnippetById } from '@/services/snippetService'
import { getGistContent } from '@/services/gistService'
import IphoneMockup, { Iphone15Pro } from '@/components/IphoneMockup'
import { CodePreview } from '@/components/CodePreview'

export default function SnippetDetail({ params }) {
  const [snippet, setSnippet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState('')

  useEffect(() => {
    async function fetchSnippet() {
      try {
        const response = await getSnippetById(params.id)
        setSnippet(response.data)

        if (response.data?.snippet_url) {
          const gistContent = await getGistContent(response.data.snippet_url)
          setCode(gistContent)
        }
      } catch (error) {
        console.error('Error loading snippet:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSnippet()
  }, [params.id])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Title and description skeleton */}
          <div className="mb-8">
            <div className="h-10 w-2/3 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-4 w-4/5 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>

          {/* iPhone preview skeleton */}
          <div className="mb-8 flex justify-center">
            <div className="h-[600px] w-[300px] rounded-[60px] bg-zinc-100 dark:bg-zinc-800" />
          </div>

          {/* Code preview skeleton */}
          <div className="rounded-xl bg-zinc-900 p-4 dark:bg-zinc-800">
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full rounded bg-zinc-800 dark:bg-zinc-700"
                />
              ))}
            </div>
          </div>

          {/* Developer info skeleton */}
          <div className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-3 w-24 rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!snippet) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-red-600">Snippet not found</h1>
      </div>
    )
  }

  console.log(snippet)

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {snippet.title}
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          {snippet.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
        <div className="flex justify-center">
          <Iphone15Pro src={snippet.snippet_preview_url} />
        </div>

        <div className="prose dark:prose-invert">
          <div className="language-javascript rounded-xl bg-zinc-900 p-4 dark:bg-zinc-800">
            <CodePreview code={code || snippet.code} />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src={snippet.developer.profile_url}
              alt={snippet.developer.name}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {snippet.developer.name}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {new Date(snippet.updated_at).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
