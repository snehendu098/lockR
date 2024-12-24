import React from "react";

const Exception = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full px-4 shadow-md p-2 bg-white/90 rounded-lg text-gray-800">
      <p>{children}</p>
    </div>
  );
};

export default Exception;
