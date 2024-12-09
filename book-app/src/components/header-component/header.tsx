"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./style.scss";
import { useAuth } from "@/contexts/Auth-context";
import { useDispatch } from "react-redux";
import { data } from "@/lib/data";
import { fetchSearchValues } from "@/redux/slice";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { AppDispatch } from "@/redux/store";
import WishListButton from "../wishlist-component/wishlist-dialog-button";
const dataSource = data;

export default function Header() {
  const { user, logout } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const handleSearch = (query: string) => {
    dispatch(fetchSearchValues(query));
  };

  return (
    <header className="flex py-[35px] px-[50px] justify-between overflow-hidden header-element mb-[50px h-[70px]">
      <motion.div
        className="items-center flex justify-between col-start-2"
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link href={"/about"} className="titleLink">
          <h1 className="text-[2rem] p-0">MyBook</h1>
        </Link>
        {pathname === "/shop" ? (
          <div className="relative">
            <motion.input
              type="text"
              placeholder="Search..."
              className="rounded-2xl border-[#9b9b9b] border px-[15px] py-[3px] ml-[100px] w-[350px] pl-[30px] search"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search absolute top-[5px] left-[106px] opacity-[0.8]"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        ) : null}
      </motion.div>
      <motion.div
        className="items-center flex"
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {user == null ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-align-justify hidden burgerMenu"
                >
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                  <path d="M3 6h18" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded border border-gray-200 p-2 z-10">
                <DropdownMenuLabel>
                  <p className="font-medium">Menu</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-t my-1" />
                {dataSource.map((data, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={data.link}>
                      <div className="flex justify-between w-[135px] items-center my-[10px]">
                        <p className="text-gray-700 burgerItem">{data.name}</p>
                        <span>{data.icon}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="border-t my-1" />
                <DropdownMenuItem>
                  <Link href={"/registration"}>
                    <button className="border rounded-xl py-1 px-4 mt-[5px] text-sm bg-white text-black signup w-[135px]">
                      Sign Up
                    </button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/login"}>
                    <button className="border rounded-xl py-1 px-4 mt-[5px] text-sm bg-black text-white signin w-[135px]">
                      Sign In
                    </button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href={"/registration"}>
              <button className="border rounded-2xl py-[5px] px-[15px] text-[1.3rem] signup signupHeader mr-[25px]">
                Sign Up
              </button>
            </Link>
            <Link href={"/login"}>
              <button className="border rounded-2xl py-[5px] px-[15px] text-[1.3rem] signin signinHeader">
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-align-justify hidden burgerMenu"
                >
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                  <path d="M3 6h18" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded border border-gray-200 p-2 z-10">
                <DropdownMenuLabel>
                  <p className="font-medium">Menu</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-t my-1" />
                {dataSource.map((data, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={data.link}>
                      <div className="flex justify-between w-[135px] items-center my-[10px]">
                        <p className="text-gray-700 burgerItem">{data.name}</p>
                        <span>{data.icon}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem>
                  <button
                    className="border rounded-xl py-1 px-4 mt-[5px] w-[135px] text-sm bg-black text-white hover:bg-red-600"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </DropdownMenuItem>
                {pathname === "/wishlist" ? (
                  <WishListButton jwtToken={user?.jwtToken}></WishListButton>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="border rounded-2xl py-[5px] px-[15px] text-[1.3rem] logout"
              onClick={logout}
            >
              Log Out
            </button>
          </>
        )}
      </motion.div>
    </header>
  );
}
