import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.footer
      initial={{ transform: "translateX(-100px)", opacity: 0 }}
      whileInView={{ transform: "translateX(0px)", opacity: 1 }}
      exit={{ transform: "translateX(-100px)", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-4 w-full p-4"
    >
      <p>&copy; Next Starter Template {new Date().getFullYear()}</p>
    </motion.footer>
  );
}
