'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { GridPattern } from '@/components/GridPattern'

function DeveloperIcon({ profileUrl, name }) {
  return (
    <div className="relative h-7 w-7">
      <Image
        src={profileUrl}
        alt={name}
        className="rounded-full object-cover"
        fill
        sizes="28px"
      />
    </div>
  )
}

function SnippetPattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

export function SnippetCard({ snippet }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <Link
      href={`/snippets/${snippet.id}`}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <SnippetPattern
        mouseX={mouseX}
        mouseY={mouseY}
        squares={[
          [0, 1],
          [1, 3],
        ]}
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-zinc-900/7.5 ring-inset group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl p-4">
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={snippet.snippet_preview_url}
            alt={snippet.title}
            className="h-full w-full object-cover"
            width={400}
            height={300}
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <DeveloperIcon
              profileUrl={snippet.developer.profile_url}
              name={snippet.developer.name}
            />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {snippet.developer.name}
            </span>
          </div>

          <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">
            <Link
              href={snippet.snippet_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="absolute inset-0 rounded-2xl" />
              {snippet.title}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {snippet.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {snippet.categories.map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
