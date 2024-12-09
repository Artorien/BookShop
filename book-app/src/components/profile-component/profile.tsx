import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsStore, setIsWishlist } from "@/redux/slice";
import Link from "next/link";
import Image from "next/image";
import "./style.scss";
import { User } from "@/types/user";

export default function UserProfile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(setIsStore(false));
    dispatch(setIsWishlist(false));

    const parsedUser = localStorage.getItem("user");

    if (parsedUser) {
      setUser(JSON.parse(parsedUser));
    }
  }, []);

  return (
    <div className="flex py-[90px] flex-col w-full">
      <h1 className="text-[2rem] text-center mb-[90px]">Dashbopard</h1>
      <div className="grid grid-cols-[1fr_1fr] container">
        <div className="col-start-1 flex flex-col items-center w-full justify-center">
          <div className="flex justify-center items-start flex-col detailsBlock">
            <h2 className="text-[1.2rem] mb-[25px]">My Credentials:</h2>
            <div className="bg-[#f7f7f7] rounded-xl p-[30px] flex flex-col">
              <div>
                <div className="flex gap-8 personalData">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-[5px]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      readOnly
                      className="rounded-xl py-[5px] px-[15px]"
                      value={user?.email}
                    />
                  </div>
                  <div className="flex flex-col relative">
                    <label htmlFor="dateOfCreation" className="mb-[5px]">
                      Account created
                    </label>
                    <input
                      type="text"
                      className="rounded-xl py-[5px] px-[15px]"
                      name="dateOfCreation"
                      readOnly
                      value={user?.dateOfCreation}
                    />
                  </div>
                </div>
                <div className="text-start  w-[171px] mt-[30px]">
                  <Link
                    href={"/changecredentials"}
                    className="underline decoration-solid"
                  >
                    <p className="">Change your credentials</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex my-[25px] w-[514px] flex-col changeBlock">
            <>
              <h1 className="text-[1.2rem] text-start mb-[25px]">
                My Wishlist:
              </h1>
              <Link href={"/wishlist"}>
                <button className="border rounded-xl py-[5px] px-[15px] text-[1rem] bg-[#f7f7f7] flex justify-center items-center wishListButton">
                  Go to my Wishlist
                  <span>
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
                      className="lucide lucide-chevron-right ml-[15px]"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </button>
              </Link>
            </>
          </div>
        </div>
        <div className="col-start-2 flex items-center justify-center">
          <Image
            src="/images/reading.webp"
            alt="Reading image"
            width={400}
            height={400}
            className="profileImage"
          ></Image>
        </div>
      </div>
    </div>
  );
}
