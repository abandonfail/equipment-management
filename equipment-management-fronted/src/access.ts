/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserLoginVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    isLoggedIn: !!currentUser,
    canUser: currentUser,
    canAdmin: currentUser && currentUser.userRole === 1,
    canAdminOrMaintenance: currentUser && currentUser?.userRole === 1 || currentUser?.userRole === 2,
  };
}
