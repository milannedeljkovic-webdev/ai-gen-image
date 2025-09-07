'use client'

import { useState, useEffect } from 'react'
import { GeneratedImage } from '@/lib/types'
import { ImageGenerator } from '@/components/ImageGenerator'
import { GenerationHistory } from '@/components/GenerationHistory'

export default function HomePage() {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('ai-generated-images')
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages)
        setGeneratedImages(Array.isArray(parsedImages) ? parsedImages : [])
      } catch (error) {
        console.error('Error loading saved images:', error)
        localStorage.removeItem('ai-generated-images')
      }
    }
  }, [])

  // Save images to localStorage whenever the array changes
  useEffect(() => {
    localStorage.setItem('ai-generated-images', JSON.stringify(generatedImages))
  }, [generatedImages])

  const handleImageGenerated = (newImage: GeneratedImage) => {
    setGeneratedImages(prev => [newImage, ...prev])
  }

  const handleDeleteImage = (imageId: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== imageId))
  }

  const handleClearHistory = () => {
    setGeneratedImages([])
    localStorage.removeItem('ai-generated-images')
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-12">
          {/* Main Generation Interface */}
          <ImageGenerator onImageGenerated={handleImageGenerated} />
          
          {/* Generation History */}
          <GenerationHistory
            images={generatedImages}
            onDeleteImage={handleDeleteImage}
            onClearHistory={handleClearHistory}
          />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white/60">
            <p>AI Image Generator - Create stunning images with artificial intelligence</p>
            <p className="text-sm mt-2">Powered by advanced AI models for high-quality image generation</p>
          </div>
        </div>
      </footer>
    </div>
  )
}