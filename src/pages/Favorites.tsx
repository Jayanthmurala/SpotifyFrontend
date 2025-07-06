import { useSelector } from "react-redux";
import { RootState } from "@/StateManagement/Redux/store";
import SongsCard from "@/components/SongsCard";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { songAxios } from "@/Api/axios";
import endpoints from "@/Api/endpoints/endpoints";
interface Song {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  audio_file: string;
}

const Favorites = () => {
  const [Song, setSong] = useState<Song[]>([]);
  useEffect(() => {
    const res = async () => {
      const response = await songAxios({ ...endpoints.getAllSonges });
      setSong(response.data.data);
    };
    res();
  }, []);
  const playlist = useSelector((state: RootState) => state.user.playlist);
  // Filter only liked songs
  const favoriteSongs = Song.filter(song => playlist.includes("" + song.id));
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <Heart size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Your Favorites</h1>
          <p className="text-gray-400">Music you love, all in one place</p>
        </div>
      </div>

      {favoriteSongs.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteSongs.map(song => (
            <SongsCard
              key={song.id}
              id={song.id}
              title={song.title}
              description={song.description}
              cover_image={song.cover_image}
              audio_file={song.audio_file}
              onViewRelated={() => {}}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">You haven’t liked any songs yet.</p>
      )}
    </div>
  );
};

export default Favorites;
