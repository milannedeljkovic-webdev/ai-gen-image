export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  dimensions: string;
  style?: string;
}

export interface GenerationRequest {
  prompt: string;
  width?: number;
  height?: number;
  style?: string;
}

export interface GenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  id?: string;
}

export interface GenerationSettings {
  width: number;
  height: number;
  style: string;
}

export type GenerationStatus = 'idle' | 'generating' | 'success' | 'error';