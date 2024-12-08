"use client";

import { motion } from "framer-motion";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Header from "../header-component/header";
import Sidebar from "../sidebar-component/side-bar";
import AuthProvider from "@/contexts/Auth-context";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Header></Header>
        <div className="flex">
          <Sidebar></Sidebar>
          <motion.div
            className="w-full childContainer h-fit rounded-2xl p-[30px] mr-[50px] mt-[70px] flex justify-center"
            transition={{ type: "spring", damping: 18, mass: 0.75 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {children}
          </motion.div>
        </div>
      </AuthProvider>
    </Provider>
  );
}
