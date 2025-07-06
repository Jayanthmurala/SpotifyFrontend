import React from 'react';
import { User, Settings, Heart, Music, Calendar } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/StateManagement/Redux/store';


interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
}

interface Activity {
  action: string;
  item: string;
  time: string;
}

const Profile = () => {
  const selector = useSelector((state: RootState) => state.user); // type-safe

  const userStats: Stat[] = [
    { label: 'Songs Played', value: '1,234', icon: Music },
    { label: 'Favorites', value: '89', icon: Heart },
    { label: 'Playlists', value: '23', icon: Music },
    { label: 'Hours Listened', value: '456', icon: Calendar },
  ];

  const recentActivity: Activity[] = [
    { action: 'Liked', item: 'Midnight Dreams', time: '2 hours ago' },
    { action: 'Played', item: 'Electric Nights', time: '5 hours ago' },
    { action: 'Added to playlist', item: 'Ocean Waves', time: '1 day ago' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Profile Header */}
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User size={48} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">
              {selector.name || 'John Doe'}
            </h1>
            <p className="text-gray-400 mb-4">{selector.email}</p>
            <div className="flex space-x-4">
              <button className="btn-primary">Edit Profile</button>
              <button className="btn-secondary flex items-center gap-1">
                <Settings size={18} />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {userStats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-6 text-center">
            <stat.icon size={32} className="text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 p-4 hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              <div className="flex-1">
                <p className="text-white">
                  <span className="text-purple-400">{activity.action}</span> {activity.item}
                </p>
                <p className="text-gray-400 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
