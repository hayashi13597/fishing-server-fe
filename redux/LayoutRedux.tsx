"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import LayoutGlobal from "@/app/LayoutGlobal";
const LayoutCustomerRedux = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <LayoutGlobal />
      {children}
    </Provider>
  );
};

export default LayoutCustomerRedux;
