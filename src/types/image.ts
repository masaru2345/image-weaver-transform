
export interface ProcessedImage {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
  format: string;
  compressionRatio: number;
}

export interface ResizeOptions {
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

export interface CropOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ConversionOptions {
  format: 'webp' | 'avif' | 'jpeg' | 'png';
  quality: number;
}

export interface OptimizationSettings {
  resize?: ResizeOptions;
  crop?: CropOptions;
  conversion: ConversionOptions;
}
