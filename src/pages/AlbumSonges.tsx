import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { songAxios } from "@/Api/axios";
import SongsCard from "@/components/SongsCard";
import { Button } from '@/components/ui/button';

interface Song {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  audio_file: string;
}

const AlbumSonges = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const response = await songAxios({
          method: "GET",
          url: `/api/v1/songs/album/${params.id}`,
        });
        setSongs(response.data.data);
      } catch (error) {
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [params]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    let sorted = [...songs];
    if (e.target.value === "latest") {
      sorted = sorted.reverse();
    } else if (e.target.value === "a-z") {
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    setSongs(sorted);
  };

  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="p-8 space-y-8">
        <div className="container h-screen flex flex-col items-center justify-center">
          <img src="/empty-music.svg" alt="No Songs" className="w-40 mb-6 opacity-80" />
          <h1 className="text-3xl font-bold text-white mb-2">No Songs Found</h1>
          <p className="text-gray-400 mb-4">Try exploring other albums or check back later.</p>
          <Button className="bg-white text-black" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">All Songs</h1>
        <div className="flex space-x-4">
          <select
            className="glass rounded-lg px-4 py-2 text-white border border-white/10 focus:border-purple-500 focus:outline-none bg-black/40"
            value={sort}
            onChange={handleSort}
          >
            <option value="latest">Sort by: Latest</option>
            <option value="a-z">Sort by: A-Z</option>
          </select>
          <Button variant="outline" className="border-white/10 text-white hover:bg-purple-500/20" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {songs.map((song) => (
          <div key={song.id} className="transition-transform hover:scale-105 hover:shadow-lg">
            <SongsCard
              id={song.id}
              title={song.title}
              description={song.description}
              cover_image={song.cover_image}
              audio_file={song.audio_file}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumSonges;