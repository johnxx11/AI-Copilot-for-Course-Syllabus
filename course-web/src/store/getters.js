const getters = {
  token: state => state.user.token,
  username: state => state.user.username,
  email: state => state.user.email,
  mobile: state => state.user.mobile,
  role: state => state.user.role
}
export default getters
