const config = {
  development: {
    baseUrl: window.location.origin,
  },
  production: {
    baseUrl: "https://cinetroop.com",
  },
};
const environment = process.env.NODE_ENV || "development";
export const getBaseUrl = () => config[environment].baseUrl;
