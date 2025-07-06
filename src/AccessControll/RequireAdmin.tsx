import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/StateManagement/Redux/store';
import { Navigate } from 'react-router-dom';

interface Props { children: React.ReactElement; }

const RequireAdmin: React.FC<Props> = ({ children }) => {
  const role = useSelector((s: RootState) => s.user.role);

  if (role !== 'admin') {
    // Non-admins go home
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RequireAdmin;
