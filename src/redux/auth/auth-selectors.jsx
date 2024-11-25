const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUserName = state => state.auth.user.name;

const getCurrentUser = state => state.auth.user;

const getCurrentUserToken = state => state.auth.token;

const getAvatar = state => state.auth.user.profile_img;

const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getIsFetchingCurrentUser,
  getCurrentUserToken,
  getAvatar,
  getCurrentUser,
};

export default authSelectors;
