"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./style.css";
import { Select } from "@mantine/core";
import { Menu, X } from "lucide-react"; 
import LanguageSwitcher from "../LanguageSwitcher";

const languages = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
  { value: "it", label: "Italiano" },
  { value: "fr", label: "Français" },
  { value: "id", label: "Bahasa" },
  { value: "pl", label: "Polish" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Русский" },
  { value: "th", label: "Thai" },
  { value: "tr", label: "Turkish" },
];

function LanguageSelector() {
  const [language, setLanguage] = useState("en");

  return (
    <Select
      value={language}
      onChange={(value) => setLanguage(value || "en")}
      data={languages}
      styles={() => ({
        input: {
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          width: "140px",
        },
        dropdown: {
          backgroundColor: "#f0f0f0",
          border: "1px solid #2C2E33",
          color: "#000",
          borderRadius: "0.5rem",
          marginTop: "1.25rem",
        },
      })}
      classNames={{
        root: "min-w-[20px]",
        input: "py-2 px-3 text-sm font-medium",
        dropdown: "mt-1 rounded-md shadow-lg",
      }}
    />
  );
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      setVisible(scrollYProgress.get() < 0.05 || direction < 0);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -200, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "max-w-full mx-auto fixed z-[5000] top-10 inset-x-0 px-6 py-4 rounded-lg border border-black/.1 shadow-md bg-black/75 text-white flex items-center justify-between"
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" style={{marginLeft:"120px"}}>
          <img src="/eye.svg" alt="Logo" className="h-8 w-8" style={{width:"90px", height:"60px"}}/> {/* Replace with actual logo */}
          {/* <span className="text-lg font-semibold">Insta Story View</span> */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 flex-grow justify-end">
          {navItems.map((navItem, idx) => (
            <Link
              key={idx}
              href={navItem.link}
              className="text-sm px-4 py-2 rounded-md hover:bg-white hover:text-black transition duration-200 text-lg font-semibold"
            >
              {navItem.name}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-black/90 p-4 rounded-md mt-2 flex flex-col items-start space-y-2"
            >
              {navItems.map((navItem, idx) => (
                <Link
                  key={idx}
                  href={navItem.link}
                  className="text-sm hover:bg-white hover:text-black px-4 py-2 rounded-md w-full text-left transition duration-200"
                >
                  {navItem.name}
                </Link>
              ))}
              <div className="mt-4 w-full">
                <LanguageSelector />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
