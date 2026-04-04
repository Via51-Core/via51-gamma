// Path: src/components/nodes/MediaNodeRenderer.tsx
// Name: MediaNodeRenderer Component

import React from 'react';

interface MediaNodeProps {
  node: {
    type: string;
    data: {
      src: string;
      label?: string;
      fileName?: string;
    };
  };
}

export const MediaNodeRenderer: React.FC<MediaNodeProps> = ({ node }) => {
  const { type, data } = node;

  if (type === 'video_node') {
    return (
      <div className="gamma-video-container border border-zinc-800 rounded-lg overflow-hidden">
        <video 
          controls 
          className="w-full h-auto aspect-video bg-black"
          src={data.src}
        >
          Your browser does not support the video tag.
        </video>
        <div className="p-2 text-xs text-zinc-500 bg-zinc-900/50">
          Source: {data.fileName || 'Remote Video Asset'}
        </div>
      </div>
    );
  }

  if (type === 'audio_node') {
    return (
      <div className="gamma-audio-container p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col gap-2">
        <span className="text-sm font-medium text-zinc-300">
          {data.label || data.fileName || 'Audio Asset'}
        </span>
        <audio 
          controls 
          className="w-full h-10 accent-emerald-500"
          src={data.src}
        />
      </div>
    );
  }

  return null;
};