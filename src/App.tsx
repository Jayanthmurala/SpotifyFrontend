import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Player from "@/components/Player";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Albums from "./pages/Albums";
import Favorites from "./pages/Favorites";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Songs from "./pages/Songs";
import AlbumSonges from "./pages/AlbumSonges";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from "./Api/axios";
import endpoints from "./Api/endpoints/endpoints";
import { setUser } from "./StateManagement/Redux/slice/userSlice";
import RequireAuth from "./AccessControll/RequireAuth";
import RequireAdmin from "./AccessControll/RequireAdmin";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = async () => {
      if (token) {
        const res = await Axios({
          ...endpoints.getUser,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(res.data.data));
      }
    };
    data();
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="albums">
                <Route index element={<Albums />} />
                <Route path=":id" element={<AlbumSonges />} />
              </Route>
              <Route path="songs" element={<Songs />} />
              <Route
                path="favorites"
                element={
                  <RequireAuth>
                    <Favorites />
                  </RequireAuth>
                }
              />
              <Route path="admin" element={
                <RequireAdmin><Admin /> 
                </RequireAdmin>} />
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Player />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
