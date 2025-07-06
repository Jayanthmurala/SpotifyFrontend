import { ChevronRight, Heart } from 'lucide-react';
import React, { useRef } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface AlbumCardProps {
  id: number;
  title: string;
  description: string;
  cover_image: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  title,
  description,
  cover_image,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigator = useNavigate();

  return (
    <div
      className="group rounded-2xl glass cursor-pointer transition-transform hover:scale-105 hover:shadow-xl p-4"
    >
      {/* Album Art */}
      <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
        {cover_image ? (
          <img
            src={cover_image}
            alt={title}
            className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full text-white/30 text-4xl font-bold">
            🎵
          </div>
        )}

        {/* Play Overlay (optional, can add Play icon here) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {/* <PlayCircle size={40} className="text-white" /> */}
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-2">
        <h3 className="text-white font-semibold truncate text-lg">{title}</h3>
        <p className="text-gray-400 text-sm truncate">{description}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-2">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-pink-600/10 text-pink-500 hover:text-pink-400 transition-colors"
        >
          <Heart className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => navigator(`/albums/${id}`)}
          className="hover:bg-purple-600/10 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Optional audio for future use */}
      {/* <audio ref={audioRef} src={audio_url}></audio> */}
    </div>
  );
};

export default AlbumCard;