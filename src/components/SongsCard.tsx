import React, { useEffect, useRef, useState } from 'react';
import { Heart, MoreHorizontal, Play, Pause } from 'lucide-react';
import Axios from '@/Api/axios';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/StateManagement/Redux/store';

interface SongsCardProps {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  audio_file: string;
  onViewRelated?: () => void;
}

const SongsCard: React.FC<SongsCardProps> = ({
  id,
  title,
  description,
  cover_image,
  audio_file,
  onViewRelated,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const playlist = useSelector((state: RootState) => state.user.playlist);

  useEffect(() => {
    if (playlist.includes(""+id)) {
      setIsLiked(true);
    }
  }, [playlist, id]);

  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleLike = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast({
        title: 'You are not logged in',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isLiked) {
        await Axios.delete(`/api/v1/user/song/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await Axios.put(`/api/v1/user/song/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setIsLiked(!isLiked);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="music-card p-4 rounded-2xl bg-[#121212] border border-white/10 hover:border-pink-500/30 transition-all duration-300 shadow-lg hover:shadow-pink-500/20 max-w-xs w-full sm:w-[220px] md:w-[240px] lg:w-[260px]">
      <div className="aspect-square overflow-hidden rounded-xl relative bg-black/20 mb-4">
        {cover_image ? (
          <img
            src={cover_image}
            alt={title}
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <div className="w-12 h-12 bg-white/20 rounded-full" />
          </div>
        )}
        <audio ref={audioRef} src={audio_file} />
      </div>

      <div className="space-y-1">
        <h3 className="text-white font-semibold text-base truncate" title={title}>
          {title}
        </h3>
        <p className="text-gray-400 text-sm truncate" title={description}>
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 space-x-2">
        <button
          onClick={handleLike}
          className={`p-2 rounded-full transition-all hover:scale-110 ${
            isLiked
              ? 'bg-pink-600/20 text-pink-400 animate-ping-once'
              : 'hover:bg-pink-500/10 text-pink-300'
          }`}
          title={isLiked ? 'Added to Playlist' : 'Add to Playlist'}
        >
          <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="p-2 rounded-full bg-green-600/10 text-green-400 hover:bg-green-600/20 hover:scale-110 transition"
            title="Play"
          >
            <Play className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="p-2 rounded-full bg-yellow-600/10 text-yellow-400 hover:bg-yellow-600/20 hover:scale-110 transition"
            title="Pause"
          >
            <Pause className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={onViewRelated}
          className="p-2 rounded-full bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 transition hover:scale-110"
          title="View Related"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SongsCard;
