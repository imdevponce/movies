export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
export const API_URL = import.meta.env.VITE_API_URL;
import CryptoJS from "crypto-js";

export const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };

export const decryptData = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const originalData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalData);
  };
