import { NextRequest, NextResponse } from 'next/server'
import { GenerationRequest, GenerationResponse } from '@/lib/types'

// Custom endpoint configuration (no API keys required)
const AI_ENDPOINT = 'https://oi-server.onrender.com/chat/completions'
const AI_MODEL = 'replicate/black-forest-labs/flux-1.1-pro'

const AI_HEADERS = {
  'customerId': 'cus_SnhjX0KBKDiZoP',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer xxx'
}

export async function POST(request: NextRequest): Promise<NextResponse<GenerationResponse>> {
  try {
    const body: GenerationRequest = await request.json()
    const { prompt, style = 'photorealistic' } = body

    // Validate input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Prompt is required and must be a non-empty string'
      }, { status: 400 })
    }

    if (prompt.length > 1000) {
      return NextResponse.json({
        success: false,
        error: 'Prompt must be less than 1000 characters'
      }, { status: 400 })
    }

    // Enhance prompt with style
    const stylePrompts = {
      photorealistic: 'photorealistic, high quality, detailed, professional photography',
      artistic: 'artistic, creative, expressive, fine art',
      'digital-art': 'digital art, modern, vibrant, stylized',
      anime: 'anime style, manga, Japanese animation style',
      'oil-painting': 'oil painting style, classical art, brush strokes, artistic',
      watercolor: 'watercolor painting, soft colors, artistic medium',
      sketch: 'pencil sketch, drawing, artistic lines, black and white',
      minimal: 'minimalist, clean, simple, modern design'
    }

    const styleDescription = stylePrompts[style as keyof typeof stylePrompts] || stylePrompts.photorealistic
    const enhancedPrompt = `${prompt}, ${styleDescription}`

    // Generate unique ID for this request
    const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log('Generating image with enhanced prompt:', enhancedPrompt)

    // Call AI image generation API
    const aiResponse = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: AI_HEADERS,
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'user',
            content: enhancedPrompt
          }
        ]
      })
    })

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text()
      console.error('AI API error:', aiResponse.status, errorText)
      return NextResponse.json({
        success: false,
        error: `AI service error: ${aiResponse.status}`
      }, { status: 500 })
    }

    const aiData = await aiResponse.json()
    console.log('AI API response:', aiData)

    // Extract image URL from response
    let imageUrl: string

    if (aiData.choices && aiData.choices[0] && aiData.choices[0].message && aiData.choices[0].message.content) {
      // The content should contain the image URL
      const content = aiData.choices[0].message.content
      
      // Check if content is already a URL
      if (content.startsWith('http://') || content.startsWith('https://')) {
        imageUrl = content
      } else {
        // Try to extract URL from content if it's embedded in text
        const urlMatch = content.match(/https?:\/\/[^\s]+/)
        if (urlMatch) {
          imageUrl = urlMatch[0]
        } else {
          console.error('No valid image URL found in response:', content)
          return NextResponse.json({
            success: false,
            error: 'Invalid response from AI service - no image URL found'
          }, { status: 500 })
        }
      }
    } else {
      console.error('Unexpected AI API response structure:', aiData)
      return NextResponse.json({
        success: false,
        error: 'Invalid response from AI service'
      }, { status: 500 })
    }

    console.log('Generated image URL:', imageUrl)

    return NextResponse.json({
      success: true,
      imageUrl,
      id: imageId
    })

  } catch (error) {
    console.error('Image generation error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}