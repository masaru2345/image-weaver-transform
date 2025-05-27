
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProcessedImage, OptimizationSettings } from '../types/image';
import { optimizeImage } from '../utils/imageOptimizer';

interface OptimizationControlsProps {
  originalImage: File;
  onImageProcessed: (image: ProcessedImage) => void;
  onProcessingStart: () => void;
  onReset: () => void;
}

export const OptimizationControls: React.FC<OptimizationControlsProps> = ({
  originalImage,
  onImageProcessed,
  onProcessingStart,
  onReset
}) => {
  const [settings, setSettings] = useState<OptimizationSettings>({
    conversion: {
      format: 'webp',
      quality: 80
    },
    resize: {
      maintainAspectRatio: true
    }
  });

  const [enableResize, setEnableResize] = useState(false);
  const [customDimensions, setCustomDimensions] = useState({ width: '', height: '' });

  const presets = [
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'Facebook Cover', width: 1200, height: 630 },
    { name: 'Twitter Header', width: 1500, height: 500 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'LinkedIn Banner', width: 1584, height: 396 }
  ];

  const handleOptimize = useCallback(async () => {
    onProcessingStart();
    
    try {
      const optimizationSettings: OptimizationSettings = {
        conversion: settings.conversion,
        ...(enableResize && settings.resize && (
          settings.resize.width || settings.resize.height
        ) && { resize: settings.resize })
      };

      const result = await optimizeImage(originalImage, optimizationSettings);
      onImageProcessed(result);
    } catch (error) {
      console.error('Optimization failed:', error);
    }
  }, [originalImage, settings, enableResize, onImageProcessed, onProcessingStart]);

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setSettings(prev => ({
      ...prev,
      resize: {
        width: preset.width,
        height: preset.height,
        maintainAspectRatio: false
      }
    }));
    setCustomDimensions({ width: preset.width.toString(), height: preset.height.toString() });
    setEnableResize(true);
  };

  const handleCustomDimensionChange = (dimension: 'width' | 'height', value: string) => {
    setCustomDimensions(prev => ({ ...prev, [dimension]: value }));
    
    const numValue = parseInt(value) || undefined;
    setSettings(prev => ({
      ...prev,
      resize: {
        ...prev.resize,
        [dimension]: numValue,
        maintainAspectRatio: prev.resize?.maintainAspectRatio || false
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Format & Quality */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Format & Quality
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="format">Output Format</Label>
            <Select 
              value={settings.conversion.format} 
              onValueChange={(value: 'webp' | 'avif' | 'jpeg' | 'png') => 
                setSettings(prev => ({ ...prev, conversion: { ...prev.conversion, format: value } }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="webp">WebP (Recommended)</SelectItem>
                <SelectItem value="avif">AVIF (Best Compression)</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label>Quality</Label>
              <span className="text-sm text-gray-500">{settings.conversion.quality}%</span>
            </div>
            <Slider
              value={[settings.conversion.quality]}
              onValueChange={([value]) => 
                setSettings(prev => ({ ...prev, conversion: { ...prev.conversion, quality: value } }))
              }
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resize Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Resize Image
            </div>
            <Switch checked={enableResize} onCheckedChange={setEnableResize} />
          </CardTitle>
        </CardHeader>
        {enableResize && (
          <CardContent className="space-y-4">
            {/* Presets */}
            <div>
              <Label className="mb-2 block">Quick Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetSelect(preset)}
                    className="text-xs"
                  >
                    {preset.name}
                    <div className="text-gray-500 ml-1">
                      {preset.width}×{preset.height}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Dimensions */}
            <div>
              <Label className="mb-2 block">Custom Dimensions</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="width" className="text-sm">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="Width"
                    value={customDimensions.width}
                    onChange={(e) => handleCustomDimensionChange('width', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-sm">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Height"
                    value={customDimensions.height}
                    onChange={(e) => handleCustomDimensionChange('height', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="flex items-center space-x-2">
              <Switch
                id="aspect-ratio"
                checked={settings.resize?.maintainAspectRatio || false}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({
                    ...prev,
                    resize: { ...prev.resize, maintainAspectRatio: checked }
                  }))
                }
              />
              <Label htmlFor="aspect-ratio" className="text-sm">
                Maintain aspect ratio
              </Label>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={handleOptimize}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Optimize Image
        </Button>
        
        <Button 
          onClick={onReset}
          variant="outline"
          className="w-full"
        >
          Upload New Image
        </Button>
      </div>
    </div>
  );
};
