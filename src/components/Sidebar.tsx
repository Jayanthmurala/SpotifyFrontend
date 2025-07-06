import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Music,
  Search,
  Heart,
  Settings,
  User,
  Album,
  LogIn,
  LogOut,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/StateManagement/Redux/store";
import { clearUser } from "@/StateManagement/Redux/slice/userSlice";
import { toast } from "@/hooks/use-toast";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);

  const handleLogout = () => {
    // Clear token (localStorage, cookies, etc.)
    localStorage.removeItem("token");
    dispatch(clearUser());
    toast({
      title: "Logged out successfully",
      variant: "default",
    })
    navigate("/");
  };

  const navItems = [
    { to: "/", icon: Music, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/albums", icon: Album, label: "Albums" },
    { to: "/songs", icon: Music, label: "Songs" },
    { to: "/favorites", icon: Heart, label: "Favorites" },
    ...(role === "admin" ? [{ to: "/admin", icon: Settings, label: "Admin" }] : []),
    ...(role ? [{ to: "/profile", icon: User, label: "Profile" }] : []),
    ...(!role
      ? [{ to: "/auth", icon: LogIn, label: "Login" }]
      : [{ to: "/logout", icon: LogOut, label: "Logout" }]),
  ];

  return (
    <aside className="w-64 glass border-r border-white/10 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold music-gradient bg-clip-text text-transparent">
          SPOTIFY 🎧
        </h1>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ to, icon: Icon, label }) =>
          to === "/logout" ? (
            <button
              key={to}
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/5 text-gray-300 hover:text-white"
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ) : (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                    : "hover:bg-white/5 text-gray-300 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
