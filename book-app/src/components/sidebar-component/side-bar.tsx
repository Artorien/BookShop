"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { RootInterface } from "@/types/user";
import WishlistDialog from "../wishlist-component/wishlist-dialog";

export default function Sidebar() {
  const user = useSelector((state: RootInterface) => state.user.user);
  const dispatch = useDispatch();
  const pathname = usePathname();

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
      <div className="px-[50px] w-[170px] mr-[100px] mt-[70px] sidebar">
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
          <WishlistDialog
            jwtToken={user?.jwtToken}
            data={data}
          ></WishlistDialog>
        ) : null}
      </div>
    </>
  );
}
