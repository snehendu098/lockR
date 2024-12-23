"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const account = useAccount();

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      {account.address && <>{children}</>}
      {!account.address && (
        <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center">
          <p className="text-xl mt-[30vh] font-semibold mb-10">
            Connect your wallet to access{" "}
            <span className="bg-amber-200 px-2 py-1 rounded-md">lockR</span>
          </p>
          <div className="w-full h-full justify-center flex">
            <ConnectButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
