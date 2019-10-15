const CONFIG = {
  DEV_URL: 'https://',
  PROD_URL: 'https://',
};

const baseURL = __DEV__ ? CONFIG.DEV_URL : CONFIG.PROD_URL;

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export default class API {
  static get = (url: string) =>
    fetch(url, {
      method: 'GET',
      headers,
    });

  static post = (url: string, data: any) =>
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

  static removeToken = () => {
    headers.delete('Authorization');
  };

  static setToken = (token: string) => {
    const bearer = `Bearer ${token}`;
    headers.append('Authorization', bearer);
  };

  static getData = () => API.get(baseURL);
}
