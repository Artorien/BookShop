"use client";

import Books from "@/components/library-component/library";
import { useAuth } from "@/contexts/Auth-context";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsStore, setIsWishlist } from "@/redux/slice";

export default function Library() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setIsStore(false));
    dispatch(setIsWishlist(false));
  }, [dispatch]);

  return (
    <>
      {user == null ? (
        <>
          <div className="flex flex-col justify-center items-center py-[90px] overflow-hidden">
            <Image
              width={640}
              height={390}
              src={"/images/notfound.webp"}
              alt="log in image"
              loading="lazy"
            ></Image>
            <h1>Log into your account to see your books</h1>
            <div className="mt-[45px]">
              <Link href={"/registration"}>
                <button className="border rounded-2xl py-[5px] px-[15px] text-[1.3rem] signup mr-[25px]">
                  Sign Up
                </button>
              </Link>
              <Link href={"/login"}>
                <button className="border rounded-2xl py-[5px] px-[15px] text-[1.3rem] signin">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <Books></Books>
        </>
      )}
    </>
  );
}
