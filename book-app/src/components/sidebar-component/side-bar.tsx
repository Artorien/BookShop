"use client";
import { clearTheWishlist } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import { useEffect, useState } from "react";
import { setClearWishList } from "@/redux/slice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleDelete = async (token: string) => {
    await clearTheWishlist(token);
    dispatch(setClearWishList(true));
  };

  useEffect(() => {
    const memoryUser = localStorage.getItem("user");
    if (memoryUser) {
      const parsedUser = JSON.parse(memoryUser);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  const data = [
    {
      name: "My library",
      icon: (
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
          className="lucide lucide-library-big"
        >
          <rect width="8" height="18" x="3" y="3" rx="1" />
          <path d="M7 3v18" />
          <path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" />
        </svg>
      ),
      link: "/library",
    },
    {
      name: "Shop",
      icon: (
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
          className="lucide lucide-shopping-cart"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      ),
      link: "/shop",
    },
    {
      name: "Contact",
      icon: (
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
          className="lucide lucide-mail"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      link: "/contact",
    },
    {
      name: "About Us",
      icon: (
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
          className="lucide lucide-info"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
      link: "/about",
    },
    {
      name: "Profile",
      icon: (
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
          className="lucide lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      link: "/profile",
    },
  ];

  return (
    <>
      <div className="px-[50px] w-[170px] mr-[100px] sidebar">
        {data.map((item, index) => (
          <Link href={item.link} key={index}>
            <motion.div
              key={index}
              transition={{ type: "spring", damping: 18, mass: 0.75 }}
              initial={{ opacity: 0, x: -20 * (index + 1) }}
              animate={{ opacity: 1, x: 0 }}
              className="flex border rounded-xl px-[20px] py-[7px] justify-start items-center w-[170px] mb-[15px] text-[1rem]"
            >
              <div className="">{item.icon}</div>
              <p className="ml-[10px]">{item.name}</p>
            </motion.div>
          </Link>
        ))}
        {pathname === "/wishlist" ? (
          <Dialog>
            <DialogTrigger>
              <motion.div
                transition={{ type: "spring", damping: 18, mass: 0.75 }}
                initial={{ opacity: 0, x: -20 * (data.length + 1) }}
                animate={{ opacity: 1, x: 0 }}
                className="flex border rounded-xl px-[20px] py-[7px] justify-start items-center w-[170px] mb-[15px] text-[1rem] cursor-pointer text-red-600"
              >
                <div>
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
                    className="lucide lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </div>
                <p className="ml-[10px]">Remove all</p>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  All items will be removed from your wishlist permanently.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <DialogClose>
                  <button className="px-4 py-2 bg-gray-300 rounded-md">
                    Cancel
                  </button>
                </DialogClose>
                <DialogClose>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                    onClick={() => handleDelete(user?.token)}
                  >
                    Confirm
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
    </>
  );
}
