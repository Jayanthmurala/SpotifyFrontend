
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Player from './Player';

const Layout = () => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <Player />
      </main>
    </div>
  );
};

export default Layout;
