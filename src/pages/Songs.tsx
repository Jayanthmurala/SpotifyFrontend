import { useEffect, useState } from "react";
import { songAxios } from "@/Api/axios";
import endpoints from "@/Api/endpoints/endpoints";
import SongsCard from "@/components/SongsCard";

interface Song {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  audio_file: string;
}

const Songs = () => {

  const [Song, setSong] = useState<Song[]>([]);
  useEffect(() => {
    const res = async () => {
      const response = await songAxios({ ...endpoints.getAllSonges });
      setSong(response.data.data);
      console.log(response.data.data);

    };
    res();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">All Songs</h1>
        <div className="flex space-x-4">
          <select className="glass rounded-lg px-4 py-2 text-white border border-white/10 focus:border-purple-500 focus:outline-none">
            <option>Sort by: Latest</option>
            <option>Sort by: Popular</option>
            <option>Sort by: A-Z</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {Song.map((song) => (
            <SongsCard
              key={song.id}
              id={song.id}
              title={song.title}
              description={song.description}
              audio_file={song.audio_file}
              cover_image={song.cover_image}
            />
        ))}
      </div>
    </div>
  );
};

export default Songs;
