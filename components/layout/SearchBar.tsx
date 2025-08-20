"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useLocale } from "next-intl";

interface ExtendableSearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

const ExtendableSearch = ({
  placeholder = "Search...",
  onSearch,
  className,
}: ExtendableSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const locale = useLocale();

  const handleIconClick = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded && searchValue) {
      onSearch?.(searchValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue) {
      onSearch?.(searchValue);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      <motion.div
        className={`relative flex items-center bg-transparent rounded-lg overflow-hidden ${
          isExpanded && "border border-white"
        }`}
        initial={{ width: "48px" }}
        animate={{
          width: isExpanded
            ? typeof window !== "undefined" && window.innerWidth < 1024
              ? "200px"
              : "403px"
            : "48px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <motion.button
          onClick={handleIconClick}
          className="flex items-center justify-center h-10 w-10 text-white hover:text-white/70 transition-colors z-10 bg-transparent"
          animate={{
            x: isExpanded ? 0 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <Search className="h-6 w-6" />
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={`absolute ${
                locale === "ar" ? "right-12" : "left-12"
              } right-0 h-full`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                duration: 0.2,
                delay: 0.1,
              }}
            >
              <Input
                type="text"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="h-full border-0 bg-transparent focus-visible:ring-0 pl-2 pr-4 text-white placeholder:text-white"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ExtendableSearch;
