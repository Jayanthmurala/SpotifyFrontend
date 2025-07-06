// src/components/RequireAuth.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/StateManagement/Redux/store';
import { Navigate, useLocation } from 'react-router-dom';
interface Props { children: React.ReactElement; }
const RequireAuth: React.FC<Props> = ({ children }) => {
  const userId = useSelector((s: RootState) => s.user._id);
  const location = useLocation();
  if (!userId) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
