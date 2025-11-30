import { imgAddress } from "@/lib/config/main";

/**
 * Get the full image URL by prepending the configured image address
 * @param imagePath - The relative image URL from the backend
 * @returns The full image URL or placeholder
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return "/placeholder.svg";
  }

  // If it's already a full URL or a local placeholder, return as is
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("/")
  ) {
    return imagePath;
  }

  // Prepend the image address
  return `${imgAddress}${imagePath}`;
}
