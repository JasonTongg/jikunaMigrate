import Link from "next/link";
import Image from "next/image";
import React from "react";
import Logo from "../public/assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSelector } from "react-redux";
import DiscordImage from "../public/assets/discord.png";
import TelegramImage from "../public/assets/telegram.png";
import TwitterImage from "../public/assets/twiter.png";
import { decrypt } from "../store/encryptMiddleware.js"

export default function Navbar() {
  let {
    twitter,
    telegram,
    discord,
  } = useSelector((state) => state.data);

  twitter = decrypt(twitter);
  telegram = decrypt(telegram);
  discord = decrypt(discord);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className="flex w-full z-[99] p-4 items-center justify-between gap-4 padding-section fixed max-w-screen-2xl px-4 sm:px-6 lg:px-8 top-0 left-1/2 translate-x-[-50%]">
      <Image src={Logo} className="w-[120px] sm:block hidden" />
      <div className="gap-4 items-center justify-center md:flex hidden">
        <Link href={discord} target="_blank">
          <Image src={DiscordImage} className="w-[30px]" />
        </Link>
        <Link href={telegram} target="_blank">
          <Image src={TelegramImage} className="w-[25px]" />
        </Link>
        <Link href={twitter} target="_blank">
          <Image src={TwitterImage} className="w-[25px]" />
        </Link>
        <ConnectButton />
      </div>
      <div className="md:hidden block">
        <ConnectButton />
      </div>
      <GiHamburgerMenu
        className="text-3xl md:hidden block cursor-pointer text-white"
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="bg-[#1B1F24] text-white">
          <MenuItem onClick={handleClose}>
            <Link href={twitter} target="_blank">
              <p className="text-white hover:text-gray-300 mr-4">Twitter</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href={telegram} target="_blank">
              <p className="text-white hover:text-gray-300 mr-4">Telegram</p>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href={discord} target="_blank">
              <p className="text-white hover:text-gray-300">Discord</p>
            </Link>
          </MenuItem>
        </div>
      </Menu>
    </nav>
  );
}
