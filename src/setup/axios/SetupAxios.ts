export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: { accessToken }
      } = store.getState();
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      console.log('bearer');
      
      return config;
    },
    (err: any) => Promise.reject(err)
  );
}
