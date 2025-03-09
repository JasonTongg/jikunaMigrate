import CryptoJS from "crypto-js";

const SECRET_KEY = "thisismysecret"; // Change this to a secure key

// Encrypt function
const encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Middleware to encrypt state updates
const encryptMiddleware = (store) => (next) => (action) => {
    if (action.type.startsWith("Datas/")) {
        action.payload = encrypt(action.payload);
    }
    return next(action);
};

export { encrypt, decrypt, encryptMiddleware };
