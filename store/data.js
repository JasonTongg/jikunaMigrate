import { createSlice } from "@reduxjs/toolkit";
import { ABI } from "./abi"

// Initial state
const initialState = {
  twitter: "https://x.com/",
  telegram: "https://t.me/",
  discord: "https://discord.gg/",
  abi: ABI,
  contractAddress: "0x66bFe7C5C2dc052492938a9f7D50251A47B375ef"
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
