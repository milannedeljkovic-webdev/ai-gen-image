'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  return (
    <div className={cn('animate-spin', sizeClasses[size], className)}>
      <div className="w-full h-full border-2 border-purple-200 border-t-purple-600 rounded-full"></div>
    </div>
  )
}

interface GenerationLoadingProps {
  message?: string
}

export function GenerationLoading({ message = 'Generating your image...' }: GenerationLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-l-pink-400 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Creating Magic</h3>
      <p className="text-purple-200 max-w-sm">{message}</p>
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
      </div>
    </div>
  )
}

interface ImagePlaceholderProps {
  width?: number
  height?: number
  className?: string
}

export function ImagePlaceholder({ width = 512, height = 512, className }: ImagePlaceholderProps) {
  return (
    <div 
      className={cn(
        'bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300',
        className
      )}
      style={{ width, height: Math.min(height, width) }}
    >
      <div className="text-center p-4">
        <div className="w-12 h-12 mx-auto mb-3 text-purple-400">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
        <p className="text-sm text-purple-600 font-medium">Your image will appear here</p>
      </div>
    </div>
  )
}