'use client'

import { useState } from 'react'
import { GeneratedImage, GenerationSettings, GenerationStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { GenerationLoading, ImagePlaceholder } from './LoadingStates'

interface ImageGeneratorProps {
  onImageGenerated: (image: GeneratedImage) => void
}

export function ImageGenerator({ onImageGenerated }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [settings, setSettings] = useState<GenerationSettings>({
    width: 1024,
    height: 1024,
    style: 'photorealistic'
  })
  const [status, setStatus] = useState<GenerationStatus>('idle')
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null)
  const [error, setError] = useState<string>('')

  const styleOptions = [
    { value: 'photorealistic', label: 'Photorealistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'digital-art', label: 'Digital Art' },
    { value: 'anime', label: 'Anime Style' },
    { value: 'oil-painting', label: 'Oil Painting' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'sketch', label: 'Sketch' },
    { value: 'minimal', label: 'Minimalist' }
  ]

  const dimensionPresets = [
    { label: 'Square (1:1)', width: 1024, height: 1024 },
    { label: 'Portrait (3:4)', width: 768, height: 1024 },
    { label: 'Landscape (4:3)', width: 1024, height: 768 },
    { label: 'Wide (16:9)', width: 1152, height: 648 }
  ]

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setStatus('generating')
    setError('')
    setCurrentImage(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          width: settings.width,
          height: settings.height,
          style: settings.style,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Generation failed')
      }

      const newImage: GeneratedImage = {
        id: data.id,
        url: data.imageUrl,
        prompt: prompt.trim(),
        timestamp: Date.now(),
        dimensions: `${settings.width}x${settings.height}`,
        style: settings.style,
      }

      setCurrentImage(newImage)
      setStatus('success')
      onImageGenerated(newImage)
      
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate image')
      setStatus('error')
    }
  }

  const isGenerating = status === 'generating'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">AI Image Generator</h1>
        <p className="text-purple-200">Create stunning images with artificial intelligence</p>
      </div>

      {/* Main Generation Interface */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls Panel */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Generation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prompt Input */}
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-white">
                Describe your image
              </Label>
              <Textarea
                id="prompt"
                placeholder="A serene mountain landscape at sunset with vibrant colors..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-20"
                disabled={isGenerating}
              />
            </div>

            {/* Style Selection */}
            <div className="space-y-2">
              <Label className="text-white">Art Style</Label>
              <Select
                value={settings.style}
                onValueChange={(value) => setSettings(prev => ({ ...prev, style: value }))}
                disabled={isGenerating}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {styleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dimension Presets */}
            <div className="space-y-2">
              <Label className="text-white">Image Size</Label>
              <div className="grid grid-cols-2 gap-2">
                {dimensionPresets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant={settings.width === preset.width && settings.height === preset.height ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings(prev => ({ 
                      ...prev, 
                      width: preset.width, 
                      height: preset.height 
                    }))}
                    disabled={isGenerating}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Width: {settings.width}px</Label>
                <Slider
                  value={[settings.width]}
                  onValueChange={([width]) => setSettings(prev => ({ ...prev, width }))}
                  min={512}
                  max={1536}
                  step={64}
                  disabled={isGenerating}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Height: {settings.height}px</Label>
                <Slider
                  value={[settings.height]}
                  onValueChange={([height]) => setSettings(prev => ({ ...prev, height }))}
                  min={512}
                  max={1536}
                  step={64}
                  disabled={isGenerating}
                  className="w-full"
                />
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </div>
              ) : (
                'Generate Image'
              )}
            </Button>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-96">
            {status === 'generating' ? (
              <GenerationLoading message="Creating your masterpiece..." />
            ) : currentImage ? (
              <div className="space-y-4">
                <img
                  src={currentImage.url}
                  alt={currentImage.prompt}
                  className="max-w-full max-h-80 rounded-lg shadow-lg"
                />
                <div className="text-center">
                  <p className="text-sm text-white/80 mb-2">{currentImage.prompt}</p>
                  <p className="text-xs text-white/60">{currentImage.dimensions} • {currentImage.style}</p>
                </div>
              </div>
            ) : (
              <ImagePlaceholder className="w-80 h-80" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}