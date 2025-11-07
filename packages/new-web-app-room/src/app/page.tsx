'use client';

import { useState, useCallback } from 'react';

interface Color {
  hex: string;
  rgb: string;
  hsl: string;
}

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<Color[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate a random color
  const generateRandomColor = useCallback((): Color => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
    const lightness = Math.floor(Math.random() * 40) + 30; // 30-70%
    
    const hex = hslToHex(hue, saturation, lightness);
    const rgb = hslToRgb(hue, saturation, lightness);
    const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    return { hex, rgb, hsl };
  }, []);

  // Generate a new palette
  const generatePalette = useCallback(() => {
    const newPalette = Array.from({ length: 5 }, () => generateRandomColor());
    setPalette(newPalette);
    setCopiedIndex(null);
  }, [generateRandomColor]);

  // Copy color to clipboard
  const copyToClipboard = async (colorValue: string, index: number) => {
    try {
      await navigator.clipboard.writeText(colorValue);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  // Generate initial palette on first render
  useState(() => {
    if (palette.length === 0) {
      generatePalette();
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Color Palette Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Generate beautiful, random color palettes for your next design project. 
            Click any color to copy its hex code!
          </p>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-12">
          <button
            onClick={generatePalette}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            ✨ Generate New Palette
          </button>
        </div>

        {/* Color Palette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {palette.map((color, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Color Block */}
              <div
                className="h-48 sm:h-64 cursor-pointer relative"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyToClipboard(color.hex, index)}
              >
                {/* Copy Feedback */}
                {copiedIndex === index && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white text-black px-4 py-2 rounded-lg font-semibold animate-pulse">
                      Copied! ✓
                    </div>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-semibold text-lg">
                    Click to Copy
                  </div>
                </div>
              </div>

              {/* Color Info */}
              <div className="bg-white dark:bg-gray-800 p-4">
                <div className="space-y-2">
                  <div 
                    className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-purple-600 transition-colors"
                    onClick={() => copyToClipboard(color.hex, index)}
                  >
                    {color.hex}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <div 
                      className="cursor-pointer hover:text-purple-600 transition-colors"
                      onClick={() => copyToClipboard(color.rgb, index)}
                    >
                      {color.rgb}
                    </div>
                    <div 
                      className="cursor-pointer hover:text-purple-600 transition-colors"
                      onClick={() => copyToClipboard(color.hsl, index)}
                    >
                      {color.hsl}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            💡 Tip: Click on any color or color code to copy it to your clipboard
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hslToRgb(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return `rgb(${f(0)}, ${f(8)}, ${f(4)})`;
}

