export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  imageUrl:
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8080/uploads/",
  imageUrlProd:
    process.env.NEXT_PUBLIC_IMAGE_URL_PROD || "http://localhost:8080/uploads/",
  llmWhispererApiKey: process.env.LLMWHISPERER_API_KEY || "",
  isDevelopment: process.env.NODE_ENV === "development",
};

export const devEnv = config.isDevelopment;
export const serverAddress = config.apiUrl;
export const imgAddress = config.isDevelopment
  ? config.imageUrl
  : config.imageUrlProd;
export const llmWhispererApiKey = config.llmWhispererApiKey;
