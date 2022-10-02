const urlService = () => {
  // return {
  //     baseUrl:"http://192.168.43.122:8080/laravel/site40/public/api/v1/",
  //     publicUrl:"http://192.168.43.122:8080/laravel/site40/public",
  //     authUrl:"http://192.168.43.122:8080/laravel/site40/public/api/v1/auth/"
  // }

  return {
    baseUrl: "http://afrilabs.test/api/v1/",
    publicUrl: "http://afrilabs.test/",
    authUrl: "http://afrilabs.test/api/v1/auth/",
  };

  //   return {
  //     baseUrl: "https://afrilabs-capacity.com/api/v1/",
  //     publicUrl: "https://afrilabs-capacity.com/public",
  //     authUrl: "https://afrilabs-capacity.com/api/v1/auth/",
  //   };
};

export default urlService;
