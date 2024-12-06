import { AddToWishList, removeFromWishList } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import { toast } from "sonner";
import Link from "next/link";
import "./style.scss";

// interface Book {
//   title:string;

// }
export default function BookCard(properties) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User: " + user);
    if (user) {
      if (!user.purchasesLocalMemory.includes(properties.title)) {
        setIsAdded(user.wishlist?.includes(properties.title) || false);
      } else {
        setIsBought(true);
      }
    } else {
      setIsBought(false);
      setIsAdded(false);
    }
  }, [properties.title, user]);

  const handleAddToWishList = async () => {
    if (user) {
      const response = isAdded
        ? await removeFromWishList(properties.title, user?.token)
        : await AddToWishList(properties.title, user?.token);

      if (response) {
        const updatedWishlist = isAdded
          ? user.wishlist.filter((title) => title !== properties.title)
          : [...user.wishlist, properties.title];

        const updatedUser = { ...user, wishlist: updatedWishlist };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        dispatch(setUser(updatedUser));
        setIsAdded(!isAdded);
      }
    } else {
      toast("Log in to add");
    }
  };

  return (
    <div className="p-[40px] pb-[20px] rounded-2xl shadowclass mb-[20px] card">
      <div
        className="w-[200px] h-[270px]  bg-[#f7f7f7] p-[20px] flex justify-center items-center relative imageCard"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={properties.image}
          alt="book cover"
          width={200}
          height={270}
          className="bookImage"
        ></Image>
        {isHovered && !isBought ? (
          <div
            className="absolute flex rounded-[50px] justify-center items-center bg-[white] p-[8px] top-2 right-2 cursor-pointer"
            onClick={handleAddToWishList}
          >
            {isAdded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bookmark-check"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
                <path d="m9 10 2 2 4-4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bookmark"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            )}
          </div>
        ) : null}
        {!isBought ? (
          <div
            className="absolute flex rounded-[50px] justify-center items-center bg-[white] p-[8px] top-2 right-2 cursor-pointer bookMark hidden"
            onClick={handleAddToWishList}
          >
            {isAdded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bookmark-check"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
                <path d="m9 10 2 2 4-4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bookmark"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            )}
          </div>
        ) : null}
      </div>

      <div className="flex justify-center items-center flex-col mt-[40px] props">
        <div className="bookTitleBlock">
          <p className="truncated-title text-start text-[1.1rem]">
            {properties.title}
          </p>
        </div>

        <p className="text-[0.8rem] text-start w-[200px] opacity-55 bookProps">
          {properties.author}
        </p>
        {isBought ? (
          <p>
            <br></br>
          </p>
        ) : (
          <p className="text-[1.2rem] text-start w-[200px] bookProps">
            {properties.price}$
          </p>
        )}
        {isBought ? (
          <Link href={`/book/${properties.title}`}>
            <button className="rounded-xl border py-[5px] px-[15px] mt-[10px] signup w-[200px] bookProps">
              Read
            </button>
          </Link>
        ) : (
          <Link href={`/book/${properties.title}`}>
            <button className="rounded-xl border py-[5px] px-[15px] mt-[10px] signup w-[200px] bookProps">
              Buy
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
