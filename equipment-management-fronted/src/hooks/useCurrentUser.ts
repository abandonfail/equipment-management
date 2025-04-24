// src/hooks/useCurrentUser.ts
import { useModel } from 'umi';

const useCurrentUser = () => {
  const { initialState } = useModel('@@initialState');
  return initialState?.currentUser;
};

export default useCurrentUser;
