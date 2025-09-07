'use client'

import { useState } from 'react'
import { GeneratedImage } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ImageCardProps {
  image: GeneratedImage
  onDelete?: (id: string) => void
}

export function ImageCard({ image, onDelete }: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ai-image-${image.id}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden group hover:bg-white/15 transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          {!imageError ? (
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-8 h-8 mx-auto mb-2 text-purple-400">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <p className="text-xs text-purple-600">Image unavailable</p>
              </div>
            </div>
          )}
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleDownload}
                disabled={isLoading || imageError}
                className="bg-white/90 hover:bg-white text-black"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    Download
                  </>
                )}
              </Button>
              {onDelete && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(image.id)}
                  className="bg-red-500/90 hover:bg-red-600 text-white"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Image details */}
        <div className="p-4">
          <p className="text-sm text-white/90 line-clamp-2 mb-2">
            {image.prompt}
          </p>
          <div className="flex justify-between items-center text-xs text-white/70">
            <span>{image.dimensions}</span>
            <span>{formatTimestamp(image.timestamp)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}