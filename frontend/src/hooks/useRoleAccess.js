import { useMemo } from 'react';
import useAuth from './useAuth';

const useRoleAccess = () => {
  const { user } = useAuth();

  const hasRole = useMemo(() => {
    return (requiredRole) => {
      if (!user) return false;
      if (requiredRole === 'any') return true;
      return user.role.includes(requiredRole);
    };
  }, [user]);

  const hasAnyRole = useMemo(() => {
    return (roles) => {
      if (!user) return false;
      return roles.some(role => user.role.includes(role));
    };
  }, [user]);

  return { hasRole, hasAnyRole };
};

export default useRoleAccess;