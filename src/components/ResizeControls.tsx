import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ResizeOptions } from '../types/image';

interface ResizeControlsProps {
  resizeOptions: ResizeOptions | undefined;
  enableResize: boolean;
  customDimensions: { width: string; height: string };
  onEnableResizeChange: (enabled: boolean) => void;
  onResizeOptionsChange: (options: ResizeOptions) => void;
  onCustomDimensionChange: (dimension: 'width' | 'height', value: string) => void;
}

const presets = [
  { name: 'Passport Photo', width: 350, height: 450 },
  { name: 'Instagram Square', width: 1080, height: 1080 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
  { name: 'Facebook Cover', width: 1200, height: 630 },
  { name: 'Twitter Header', width: 1500, height: 500 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  { name: 'LinkedIn Banner', width: 1584, height: 396 }
];

export const ResizeControls: React.FC<ResizeControlsProps> = ({
  resizeOptions,
  enableResize,
  customDimensions,
  onEnableResizeChange,
  onResizeOptionsChange,
  onCustomDimensionChange
}) => {
  const handlePresetSelect = (preset: typeof presets[0]) => {
    onResizeOptionsChange({
      width: preset.width,
      height: preset.height,
      maintainAspectRatio: false
    });
    onCustomDimensionChange('width', preset.width.toString());
    onCustomDimensionChange('height', preset.height.toString());
    onEnableResizeChange(true);
  };

  const isPresetSelected = (preset: typeof presets[0]) => {
    return resizeOptions?.width === preset.width && resizeOptions?.height === preset.height;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
        
        <CardContent className="space-y-4 p-4 sm:p-5">
          {/* Quick Presets */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Quick Presets
            </Label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetSelect(preset)}
                    className={`w-full text-xs justify-start h-auto py-2 px-3 flex flex-col items-start rounded-md transition-colors ${
                      isPresetSelected(preset) 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white"
                    }`}
                  >
                    <div className="font-medium text-xs">{preset.name}</div>
                    <div className={`text-[11px] mt-0.5 ${
                      isPresetSelected(preset) 
                        ? "text-blue-100" 
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {preset.width}×{preset.height}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Dimensions */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Custom Dimensions
            </Label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-xs font-medium text-gray-600 dark:text-gray-400">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="Width"
                    value={customDimensions.width}
                    onChange={(e) => onCustomDimensionChange('width', e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white text-xs py-1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-xs font-medium text-gray-600 dark:text-gray-400">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Height"
                    value={customDimensions.height}
                    onChange={(e) => onCustomDimensionChange('height', e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white text-xs py-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Aspect Ratio Toggle */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Options
            </Label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-md flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <Label htmlFor="aspect-ratio" className="text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                      Maintain aspect ratio
                    </Label>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Keep original proportions when resizing
                    </p>
                  </div>
                </div>
                <Switch
                  id="aspect-ratio"
                  checked={resizeOptions?.maintainAspectRatio || false}
                  onCheckedChange={(checked) =>
                    onResizeOptionsChange({
                      ...resizeOptions,
                      maintainAspectRatio: checked
                    })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
    </div>
  );
};
