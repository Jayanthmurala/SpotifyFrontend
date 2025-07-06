import React, { useState } from "react";
import { LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import Axios from "@/Api/axios";
import endpoints from "@/Api/endpoints/endpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/StateManagement/Redux/slice/userSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          toast({ title: "Passwords do not match", variant: "destructive" });
          return;
        }

        const res = await Axios({
          ...endpoints.register,
          data: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
        });
        toast({ title: "Account created successfully!" });
        setIsLogin(true);
      } else {
        const res = await Axios({
          ...endpoints.login,
          data: {
            email: formData.email,
            password: formData.password,
          },
        });
        localStorage.setItem("token", res.data.token);
        dispatch(
          setUser({
            _id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
            role: res.data.user.role,
            playlist: res.data.user.playlist || [],
          })
        );
        toast({ title: "Logged in successfully!" });
        navigate("/");
      }

      // Redirect or clear form here
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black text-white">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold music-gradient bg-clip-text text-transparent">
              SPOTIFY 🎧
            </h1>
            <p className="text-gray-400">
              {isLogin ? "Welcome back!" : "Join the music revolution"}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex glass rounded-2xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LogIn size={18} className="inline mr-2" />
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <UserPlus size={18} className="inline mr-2" />
              Sign Up
            </button>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {!isLogin && (
              <div>
                <label className="text-gray-300 text-sm font-medium mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="input-style"
                />
              </div>
            )}

            <div>
              <label className="text-gray-300 text-sm font-medium mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="input-style"
              />
            </div>

            <div className="relative">
              <label className="text-gray-300 text-sm font-medium mb-1 block">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
                className="input-style pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[40px] text-gray-400 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {!isLogin && (
              <div>
                <label className="text-gray-300 text-sm font-medium mb-1 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="input-style"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>
          </motion.form>

          {/* Footer */}
          <div className="text-center text-gray-400 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
