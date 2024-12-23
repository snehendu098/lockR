"use client";

import { FileKey2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Link href={"/"}>
        <div className="text-2xl bg-amber-200 py-1 px-4 rounded-md font-bold text-[#2c1810] flex items-center space-x-2">
          <FileKey2 />
          <p>lockR</p>
        </div>
      </Link>
      {children}
    </div>
  );
};

export default Header;
