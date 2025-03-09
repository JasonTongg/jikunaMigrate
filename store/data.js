import { createSlice } from "@reduxjs/toolkit";
import { ABI } from "./abi"
import { encrypt } from "./encryptMiddleware.js";

// Initial state
const initialState = {
  twitter: encrypt("https://x.com/JikunaNft"),
  telegram: encrypt("https://t.me/jikunanft"),
  discord: encrypt("http://discord.gg/jikuna"),
  abi: encrypt(ABI),
  contractAddress: encrypt("0x66bFe7C5C2dc052492938a9f7D50251A47B375ef"),
};

// Create the slice
const datas = createSlice({
  name: "Datas",
  initialState,
  reducers: {
    // Any additional reducers can be added here
  },
});

export default datas.reducer;
