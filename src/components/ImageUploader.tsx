import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => { if (acceptedFiles.length > 0) onImageUpload(acceptedFiles[0]); }, [onImageUpload]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp', '.avif', '.tiff'] }, multiple: false,
    onDragEnter: () => setIsDragActive(true), onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false), onDropRejected: () => setIsDragActive(false)
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-red-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500 ${isDragActive ? 'opacity-40 scale-105' : ''}`}></div>
        <div {...getRootProps()} className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 md:p-10 text-center cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-[1.01] shadow-xl hover:shadow-2xl ${isDragActive ? 'border-sky-400 bg-sky-50/80 dark:bg-sky-900/20 shadow-2xl scale-[1.02]' : 'border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:border-sky-300 dark:hover:border-sky-500 hover:bg-sky-50/50 dark:hover:bg-sky-900/10'} backdrop-blur-sm`}>
          <input {...getInputProps()} />
          <div className="space-y-5">
            <div className="relative mx-auto">
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 ${isDragActive ? 'bg-gradient-to-br from-sky-500 to-blue-600 scale-105 shadow-lg' : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 group-hover:from-sky-100 group-hover:to-blue-100 dark:group-hover:from-sky-900/50 dark:group-hover:to-blue-900/50'}`}>
                <svg className={`w-8 h-8 transition-all duration-500 ${isDragActive ? 'text-white' : 'text-gray-400 dark:text-gray-300 group-hover:text-sky-500 dark:group-hover:text-sky-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-red-400 rounded-full opacity-40"></div>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 transition-colors duration-300 ${isDragActive ? 'text-sky-600 dark:text-sky-400' : 'text-gray-900 dark:text-white'}`}>
                  {isDragActive ? 'Drop your image here' : 'Upload Your Image'}
                </h3>
                <p className="text-base text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto leading-relaxed">Drag and drop an image file, or click the button below to browse your files</p>
              </div>
              <div className="relative inline-block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-purple-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-500 to-purple-600 text-white rounded-2xl font-semibold text-base hover:from-sky-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Choose Image
                  <div className="ml-2 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">Supported Formats:</p>
              <div className="flex flex-wrap justify-center gap-1">
                {['JPEG', 'PNG', 'WebP', 'AVIF', 'GIF', 'BMP', 'TIFF'].map((format) => (
                  <span key={format} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-[10px] font-medium hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">{format}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};