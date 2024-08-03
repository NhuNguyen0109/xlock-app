export const cryptoKeyToBase64 = async (
  cryptoKey: CryptoKey
): Promise<string> => {
  const exportedKey = await window.crypto.subtle.exportKey("raw", cryptoKey);
  const uint8Array = new Uint8Array(exportedKey);
  return btoa(String.fromCharCode(...uint8Array));
};

export async function base64ToCryptoKey(base64: string): Promise<CryptoKey> {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const arrayBuffer = bytes.buffer;

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    arrayBuffer,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  return cryptoKey;
}
