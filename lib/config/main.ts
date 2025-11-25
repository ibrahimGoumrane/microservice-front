export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  imageUrl:
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8000/storage/",
  imageUrlProd:
    process.env.NEXT_PUBLIC_IMAGE_URL_PROD || "http://localhost:8000/storage/",
  llmWhispererApiKey: process.env.LLMWHISPERER_API_KEY || "",
  isDevelopment: process.env.NODE_ENV === "development",
};

export const devEnv = config.isDevelopment;
export const serverAddress = config.apiUrl;
export const imgAddress = config.isDevelopment
  ? config.imageUrl
  : config.imageUrlProd;
export const llmWhispererApiKey = config.llmWhispererApiKey;
