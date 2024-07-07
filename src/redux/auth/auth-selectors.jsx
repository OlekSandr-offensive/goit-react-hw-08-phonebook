const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUserName = state => state.auth.user;

const getCurrentUserToken = state => state.auth.token;

const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getIsFetchingCurrentUser,
  getCurrentUserToken,
};

export default authSelectors;
