import React, { useEffect, useRef, useState } from "react";
import {
  SkipBack,
  SkipForward,
  Heart,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Pause,
  Play,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/StateManagement/Redux/store";
import {
  setCurrentSong,
  setIsPlaying as setGlobalPlaying,
} from "@/StateManagement/Redux/slice/playerSlice";

const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const { currentSong, isPlaying } = useSelector((s: RootState) => s.player);
  const playlist = useSelector((s: RootState) => s.user.playlist);
  const allSongs = useSelector((s: RootState) => s.song.songs);

  // load & play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    audio.src = currentSong.audio_file;
    audio.load();
    if (isPlaying) audio.play();
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // track progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);
    return () => {
      audio.removeEventListener("timeupdate", update);
    };
  }, []);

  const formatTime = (s: number) =>
    isNaN(s)
      ? "0:00"
      : `${Math.floor(s / 60)}:${Math.floor(s % 60)
          .toString()
          .padStart(2, "0")}`;

  // skip handlers
  const skip = (direction: "prev" | "next") => {
    if (!currentSong) {
      return (
        <div className="glass border-t border-white/10 p-4 text-gray-400 text-center">
          ▶️ Select a song to start listening…
        </div>
      );
    }
    const idx = playlist.findIndex((id) => id === currentSong._id);
    let newId: string | null = null;
    if (direction === "next") {
      newId = playlist[(idx + 1) % playlist.length];
    } else {
      newId = playlist[(idx - 1 + playlist.length) % playlist.length];
    }
    const nextSong = allSongs.find((s) => s.id === newId);
    if (nextSong) {
      // Map Song to CurrentSong by adding _id property
      const currentSongObj = {
        _id: nextSong.id,
        title: nextSong.title,
        description: nextSong.description,
        audio_file: nextSong.audio_file,
        cover_image: nextSong.cover_image,
        artist: nextSong.description,
      };
      dispatch(setCurrentSong(currentSongObj));
      dispatch(setGlobalPlaying(true));
    }
  };

  if (!currentSong) return null;

  return (
    <div className="glass border-t border-white/10 p-4">
      <audio ref={audioRef} preload="metadata" />

      <div className="flex justify-between items-center">
        {/* Left: Info + Like */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
          <div className="min-w-0">
            <h4 className="text-white font-medium truncate">
              {currentSong.title}
            </h4>
            <p className="text-gray-400 text-sm truncate">
              {currentSong?.description || "Unknown Artist"}
            </p>
          </div>
          <button
            onClick={() => {
              /* dispatch like/unlike as before */
            }}
            className="text-gray-400 hover:text-pink-500 transition"
          >
            <Heart size={20} />
          </button>
        </div>

        {/* Center: Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => skip("prev")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => dispatch(setGlobalPlaying(!isPlaying))}
              className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={() => skip("next")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400">
              {formatTime(currentTime)}
            </span>
            <div
              ref={progressRef}
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
              onClick={(e) => {
                if (!audioRef.current || !progressRef.current) return;
                const rect = progressRef.current.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = pct * duration;
              }}
            >
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <button
            onClick={() => setIsMuted((m) => !m)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={20} />
            ) : volume < 33 ? (
              <Volume size={20} />
            ) : volume < 66 ? (
              <Volume1 size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>
          <div
            className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              setVolume(pct * 100);
              setIsMuted(false);
            }}
          >
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
