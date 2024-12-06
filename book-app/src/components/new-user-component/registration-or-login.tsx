import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsStore, setIsWishlist } from "@/redux/slice";

export default function Choice() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsStore(false));
    dispatch(setIsWishlist(false));
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center my-[90px] flex-col">
      <Image
        width={640}
        height={390}
        src={"/images/hello.webp"}
        alt="log in image"
        loading="lazy"
      ></Image>
      <h1 className="text-[2rem]">Welcome to MyBook</h1>
      <div className="mt-[25px]">
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
  );
}
