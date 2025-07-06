import React, { useEffect, useState } from 'react';
import {
  Upload,
  Music,
  Album as AlbumIcon,
  User,
  BarChart3,
  Settings,
} from 'lucide-react';
import { adminAxios, songAxios } from '@/Api/axios';
import endpoints from '@/Api/endpoints/endpoints';

// ——— Type definitions ———
interface Album {
  id: string;
  title: string;
  description: string;
}
interface Song {
  id: string;
  title: string;
  description: string;
  uploadedAt: string;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'albums' | 'songs' | 'users' | 'settings'
  >('overview');

  // Albums state
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [newAlbum, setNewAlbum] = useState<{
    file: File | null;
    title: string;
    description: string;
  }>({ file: null, title: '', description: '' });

  // Songs state
  const [songs, setSongs] = useState<Song[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [showAddSong, setShowAddSong] = useState(false);
  const [newSong, setNewSong] = useState<{
    file: File | null;
    title: string;
    description: string;
    album_id: string;
  }>({ file: null, title: '', description: '', album_id: '' });

  // Always fetch albums on mount (for dropdown + overview)
  useEffect(() => {
    setLoadingAlbums(true);
    songAxios({
      ...endpoints.getAllAlbums,
    })
      .then(res => setAlbums(res.data.data))
      .finally(() => setLoadingAlbums(false));
  }, []);

  // Fetch Songs (when tab is songs)
  useEffect(() => {
    if (activeTab !== 'songs') return;
    setLoadingSongs(true);
    songAxios({
      ...endpoints.getAllSonges,
    })
      .then(res => setSongs(res.data.data))
      .finally(() => setLoadingSongs(false));
  }, [activeTab]);

  // Delete an album
  const handleDeleteAlbum = async (id: string) => {
    await adminAxios({
      method: 'DELETE',
      url: endpoints.deleteAlbum.url.replace(':id', id),
    });
    setAlbums(a => a.filter(x => x.id !== id));
  };

  // Add a new album
  const handleAddAlbum = async () => {
    const fd = new FormData();
    if (newAlbum.file) fd.append('file', newAlbum.file);
    fd.append('title', newAlbum.title);
    fd.append('description', newAlbum.description);

    const res = await adminAxios({
      method: 'POST',
      url: endpoints.addAlbum.url,
      data: fd,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setAlbums(a => [res.data.data, ...a]);
    setShowAddAlbum(false);
    setNewAlbum({ file: null, title: '', description: '' });
  };

  // Delete a song
  const handleDeleteSong = async (id: string) => {
    await adminAxios({
      method: 'DELETE',
      url: endpoints.deleteSong.url.replace(':id', id),
    });
    setSongs(s => s.filter(x => x.id !== id));
  };

  // Add a new song
  const handleAddSong = async () => {
    const fd = new FormData();
    if (newSong.file) fd.append('file', newSong.file);
    fd.append('title', newSong.title);
    fd.append('description', newSong.description);
    fd.append('album_id', newSong.album_id);

    const res = await adminAxios({
      method: 'POST',
      url: endpoints.addSong.url,
      data: fd,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setSongs(s => [res.data.data, ...s]);
    setShowAddSong(false);
    setNewSong({ file: null, title: '', description: '', album_id: '' });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'albums', label: 'Albums', icon: AlbumIcon },
    { id: 'songs', label: 'Songs', icon: Music },
    { id: 'users', label: 'Users', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button className="btn-primary flex items-center space-x-2">
          <Upload size={20} />
          <span>Upload Content</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-white/10">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-all duration-300 ${
              activeTab === id
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="text-white space-y-4">
          <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard 👋</h2>
          <p className="text-gray-300">Use the tabs above to manage albums, songs, users, and settings.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-4 rounded-xl">
              <h3 className="text-xl font-semibold">Total Albums</h3>
              <p className="text-3xl">{albums.length}</p>
            </div>
            <div className="glass p-4 rounded-xl">
              <h3 className="text-xl font-semibold">Total Songs</h3>
              <p className="text-3xl">{songs.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Albums Management */}
      {activeTab === 'albums' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Album Management</h2>
            <button
              onClick={() => setShowAddAlbum(v => !v)}
              className="btn-primary"
            >
              {showAddAlbum ? 'Cancel' : 'Add New Album'}
            </button>
          </div>

          {showAddAlbum && (
            <div className="glass p-6 rounded-2xl space-y-4">
              <input
                type="file"
                className="block w-full text-sm text-gray-700"
                onChange={e =>
                  setNewAlbum(n => ({ ...n, file: e.target.files?.[0] ?? null }))
                }
              />
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 rounded bg-white text-black"
                value={newAlbum.title}
                onChange={e =>
                  setNewAlbum(n => ({ ...n, title: e.target.value }))
                }
              />
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 rounded bg-white text-black"
                value={newAlbum.description}
                onChange={e =>
                  setNewAlbum(n => ({ ...n, description: e.target.value }))
                }
              />
              <button onClick={handleAddAlbum} className="btn-primary">
                Submit
              </button>
            </div>
          )}

          {loadingAlbums ? (
            <p className="text-gray-400">Loading albums…</p>
          ) : (
            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-4 text-left text-gray-400">Title</th>
                    <th className="p-4 text-left text-gray-400">Description</th>
                    <th className="p-4 text-left text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {albums.map(a => (
                    <tr
                      key={a.id}
                      className="border-t border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 text-white">{a.title}</td>
                      <td className="p-4 text-gray-300">{a.description}</td>
                      <td className="p-4">
                        <button className="btn-secondary mr-2">Edit</button>
                        <button
                          className="btn-secondary text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteAlbum(a.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Songs Management */}
      {activeTab === 'songs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Song Management</h2>
            <button
              onClick={() => setShowAddSong(v => !v)}
              className="btn-primary"
            >
              {showAddSong ? 'Cancel' : 'Add New Song'}
            </button>
          </div>

          {showAddSong && (
            <div className="glass p-6 rounded-2xl space-y-4">
              <input
                type="file"
                accept="audio/*"
                className="block w-full text-sm text-gray-700"
                onChange={e =>
                  setNewSong(n => ({ ...n, file: e.target.files?.[0] ?? null }))
                }
              />
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 rounded bg-white text-black"
                value={newSong.title}
                onChange={e =>
                  setNewSong(n => ({ ...n, title: e.target.value }))
                }
              />
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 rounded bg-white text-black"
                value={newSong.description}
                onChange={e =>
                  setNewSong(n => ({ ...n, description: e.target.value }))
                }
              />
              <select
                className="w-full px-4 py-2 rounded bg-white text-black"
                value={newSong.album_id}
                onChange={e =>
                  setNewSong(n => ({ ...n, album_id: e.target.value }))
                }
              >
                <option value="">Select Album</option>
                {albums.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>
              <button onClick={handleAddSong} className="btn-primary">
                Submit
              </button>
            </div>
          )}

          {loadingSongs ? (
            <p className="text-gray-400">Loading songs…</p>
          ) : (
            <div className="glass rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-4 text-left text-gray-400">Title</th>
                    <th className="p-4 text-left text-gray-400">Description</th>
                    <th className="p-4 text-left text-gray-400">Uploaded</th>
                    <th className="p-4 text-left text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map(s => (
                    <tr
                      key={s.id}
                      className="border-t border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 text-white">{s.title}</td>
                      <td className="p-4 text-gray-300">{s.description}</td>
                      <td className="p-4 text-gray-300">
                        {new Date(s.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button className="btn-secondary mr-2">Edit</button>
                        <button
                          className="btn-secondary text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteSong(s.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
