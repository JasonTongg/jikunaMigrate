import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Oops from "../public/assets/Oops.png"
import Image from "next/image";
import Logo2 from "../public/assets/logo2.png";
import TextField from '@mui/material/TextField';
import Preview from "../public/assets/preview.png"
import { toast, ToastContainer } from "react-toastify"
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Index() {
  const {
    abi,
    contractAddress
  } = useSelector((state) => state.data);
  const { address, isConnected } = useAccount();

  const [hash, setHash] = useState("");
  const [status, setStatus] = useState("Checking...");
  const [check, setCheck] = useState(false);
  const [tokenId, setTokenId] = useState("");

  const isValidTxHash = (hash) => /^0x([A-Fa-f0-9]{64})$/.test(hash);

  const checkNFT = useCallback(async () => {
    if (!isValidTxHash(hash)) {
      toast.error("Invalid Transaction Hash");
      return;
    }
    const rawData = await fetch("https://control.jikuna.xyz/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionHash: hash,
      }),
    })

    const data = await rawData.json();
    setTokenId(data.tokenId);
    setCheck(true);

    if (data?.to !== address) {
      toast.error("This NFT is not minted by you...");
      setStatus("Failed");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      await contract.ownerOf(data.tokenId);
      toast.error("This NFT already migrated...");
      setStatus("Failed");
    } catch (error) {
      if (error.message.includes("ERC721NonexistentToken")) {
        await contract.migrateNFT(data?.to, data?.tokenId, data?.signature);
        await tx3.wait();
        toast.success("NFT Migrate successfully");
        setStatus("Success");
      } else {
        setStatus("Failed");
        toast.error("Error Checking NFT");
        toast.error("Try Again Later");
      }
    }

  }, [hash]);

  return (
    <div className="w-full min-h-screen relative py-8 px-0 sm:px-8 box-border flex items-end justify-center">
      <ToastContainer />
      <div className="bg-[rgba(217,217,217,0.1)] mt-[3rem] w-full p-8 flex items-center justify-center md:flex-row flex-col gap-12" style={{ minHeight: `calc(100vh - 72px)` }}>
        <Image src={Oops} className="w-[60%] md:w-[40%]" alt="Oops" />
        <div className="sm:w-auto w-full flex flex-col justify-center md:items-start items-center gap-4">
          <TextField
            id="outlined-multiline-flexible"
            label="Transaction Hash"
            multiline
            onChange={(e) => setHash(e.target.value)}
            maxRows={4}
            sx={{
              width: "100%",
              minWidth: "300px",
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#E0E3E7',
                },
                '&:hover fieldset': {
                  borderColor: '#E0E3E7',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#E0E3E7',
                },
                '& input': {
                  color: '#E0E3E7', // Text color
                },
                '& textarea': {
                  color: '#E0E3E7', // Multiline text color
                }
              },
              '& .MuiInputLabel-root': {
                color: '#E0E3E7', // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#E0E3E7', // Label color when focused
              }

            }}
          />
          {isConnected ? <button className="bg-[#EA355C] py-2 px-12 text-lg rounded-[10px] text-white w-fit" onClick={checkNFT}>Check</button> : <ConnectButton />}
          {
            check && <div className="bg-[#242A31] sm:w-auto w-full flex gap-4 items-center sm:flex-row flex-col p-6 rounded-[10px]">
              <Image src={`https://bafybeigmar5cy3aglukkz3nuhgqtw2opg4a3x4f5agcebfgcajstiufogy.ipfs.w3s.link/${tokenId}.png`} className="w-[200px]" alt="preview" width={100} height={100} />
              <div className="flex flex-col gap-2 text-white justify-center">
                <Image src={Logo2} alt="logo" className="w-[230px]" />
                <p>Jikupass #{tokenId}</p>
                <p>Status: {status}</p>
                <Link href="https://magiceden.io/collections/monad-testnet/0x66bfe7c5c2dc052492938a9f7d50251a47b375ef" target="_blank" className="bg-[#2DA631] py-2 px-12 text-lg rounded-[10px] text-white w-fit">View NFT</Link>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
