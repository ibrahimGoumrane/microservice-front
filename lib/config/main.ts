export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  imagePath:
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8080/",
  imagePathProd:
    process.env.NEXT_PUBLIC_IMAGE_URL_PROD || "http://localhost:8080/",
  isDevelopment: process.env.NODE_ENV === "development",
};

export const devEnv = config.isDevelopment;
export const serverAddress = config.apiUrl;
export const imgAddress = config.isDevelopment
  ? config.imagePath
  : config.imagePathProd;
