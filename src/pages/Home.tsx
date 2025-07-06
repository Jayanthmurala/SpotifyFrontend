import React, { useEffect, useState } from "react";
import AlbumCard from "../components/AlbumCard";
import Axios, { songAxios } from "@/Api/axios";
import endpoints from "@/Api/endpoints/endpoints";
import { useDispatch } from "react-redux";
import { setSongs } from "@/StateManagement/Redux/slice/songsSlice";
import { setUser } from "@/StateManagement/Redux/slice/userSlice";

interface Album {
  id: number;
  title: string;
  description: string;
  cover_image: string;
}
const Home = () => {
  const dispatch = useDispatch();
  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedAlbums = async () => {
      try {
        setLoading(true);
        const response = await songAxios({ ...endpoints.getAllAlbums });
        setLoading(false);
        setFeaturedAlbums(response.data.data);
        dispatch(setSongs(response.data.data));
      } catch (error) {
        console.error("Error fetching featured albums:", error);
      } finally {
        setLoading(false);
      }
    };
    const userLogin = async () => {
      const token = localStorage.getItem("token")
      if(!token) return
      try {
          const res=    await Axios({
        ...endpoints.getUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(res.data.data));
      } catch (error) {
        return
      }
    };
    fetchFeaturedAlbums();
    userLogin();
  }, [dispatch]);

  return (
    <div className="p-8 space-y-8">
      {/* Hero Section */}
      <section className="relative h-80 rounded-3xl overflow-hidden glass mb-8">
        <div className="absolute inset-0 music-gradient opacity-80"></div>
        <div className="relative z-10 p-8 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Discover Your Next
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Favorite Song
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-6 max-w-md">
            Explore millions of tracks from emerging and established artists
            worldwide.
          </p>
          <button className="btn-primary w-fit">Start Listening</button>
        </div>
      </section>

      {/* Featured Albums */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Featured Albums</h2>
          <button className="btn-secondary">See All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-60 bg-white/5 animate-pulse rounded-xl"
                ></div>
              ))
            : featuredAlbums.map((song) => (
                <AlbumCard
                  id={song.id}
                  key={song.id}
                  title={song.title}
                  description={song.description}
                  cover_image={song.cover_image}
                />
              ))}
        </div>
      </section>

      {/* Recently Played */}
      {/* <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Recently Played</h2>
          <button className="btn-secondary">See All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentlyPlayed.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              description={`${album.artist} • ${album.year}`}
              audio_file=""
              cover_image="/fallback.jpg"
            />
          ))}
        </div>
      </section> */}

      {/* Trending Now */}
      <section className="glass rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6">Trending Now</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-4 hover:bg-white/5 rounded-lg transition-colors"
            >
              <span className="text-2xl font-bold text-purple-400 w-8">
                #{i}
              </span>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Trending Song {i}</h4>
                <p className="text-gray-400 text-sm">Popular Artist</p>
              </div>
              <div className="text-gray-400 text-sm">3:45</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
