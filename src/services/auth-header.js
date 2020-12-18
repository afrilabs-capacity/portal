export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('lac_user'));
  
    if (user!==null && user.accessToken) {
      //alert(user.accessToken)
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }