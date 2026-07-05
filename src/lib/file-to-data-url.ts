export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
    reader.readAsDataURL(file);
  });
}

// Keep uploaded images reasonably small since they are stored as base64 text
// directly in the database (no external storage service required).
export const MAX_IMAGE_BYTES = 800 * 1024; // 800KB
