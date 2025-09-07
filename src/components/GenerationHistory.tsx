'use client'

import { GeneratedImage } from '@/lib/types'
import { ImageCard } from './ImageCard'
import { Button } from '@/components/ui/button'

interface GenerationHistoryProps {
  images: GeneratedImage[]
  onDeleteImage: (id: string) => void
  onClearHistory: () => void
}

export function GenerationHistory({ images, onDeleteImage, onClearHistory }: GenerationHistoryProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-white/40">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No images yet</h3>
        <p className="text-white/70">Generate your first AI image to see it here</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          Generation History ({images.length})
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearHistory}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Clear History
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onDelete={onDeleteImage}
          />
        ))}
      </div>
    </div>
  )
}