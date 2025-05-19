import CryptoJS from "crypto-js";

export const decrypt = (encryptedData: string, keyString: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, keyString);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedText;
  } catch (error) {
    console.error("Erro de descriptografia:", error);
    return "";
  }
};
