import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingContainer = () => {
  return (
    <div className="fixed inset-0 z-9999 flex bg-black/20">
      <div className="m-auto animate-spin text-3xl text-primary">
        <FaSpinner />
      </div>
    </div>
  );
};

export default LoadingContainer;
