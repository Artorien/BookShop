"use client";

import { getWishList } from "@/lib/data";
import { useCallback, useEffect, useState } from "react";
import BookCard from "../book-card-component/book-card";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import { setIsWishlist } from "@/redux/slice";
import Pagination from "../pagination-component/pagination";

export default function WishlistComponent(properties) {
  const [wishlistData, setWishlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [totalPages, setTotalPages] = useState(0);
  const clearWishlist = useSelector(
    (state) => state.clearWishList.clearWishList
  );
  const user = useSelector((state) => state.user.user);

  // Why this code is bad: fetching the data each re-render, so added `useCallBack`. Also added try-catch
  // const handleWishlistRetrieve = async (token: string, page: number) => {
  //   setIsLoading(true);
  //   const response = await getWishList(token, page);
  //   if (response) {
  //     setWishlistData(response.content);
  //     setIsLoading(false);
  //     setTotalPages(response.totalPages);
  //     setSize(response.size);
  //   }
  // };

  const handleWishlistRetrieve = useCallback(
    async (token: string, page: number) => {
      setIsLoading(true);

      try {
        const response = await getWishList(token, page);

        if (response) {
          setWishlistData(response.content);
          setTotalPages(response.totalPages);
          setSize(response.size);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist data");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const parsedUser = localStorage.getItem("user");

    if (parsedUser) {
      dispatch(setUser(JSON.parse(parsedUser)));
    }
    dispatch(setIsWishlist(true));
  }, [dispatch]);

  useEffect(() => {
    if (clearWishlist) {
      setWishlistData([]);
      const updatedUser = { ...user, wishlist: [] };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [clearWishlist, user]);

  useEffect(() => {
    handleWishlistRetrieve(properties.user.token, page);
  }, [properties.user.token, page, handleWishlistRetrieve]);

  return (
    <div className="flex flex-col justify-center items-center py-[90px]">
      <h1 className="text-[2rem] mb-[90px]">Wishlist</h1>
      <div className="flex justify-center w-fit">
        {wishlistData.length > 0 ? (
          <div className="flex flex-wrap gap-[30px] bookCardContainer">
            {wishlistData.map((book, index) => (
              <BookCard key={index} {...book}></BookCard>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <p className="text-[1.1rem]">... is empty</p>
          </div>
        )}
      </div>
    </div>
    // <div className="py-[90px]">
    //   <h1 className="text-[2rem] mb-[90px]">Your wishlist</h1>
    //   <div className="flex flex-wrap w-full">
    //     {isLoading ? (
    //       <div className="flex justify-center">
    //         <p className="text-[1.1rem]">Loading...</p>
    //       </div>
    //     ) : wishlistData.length > 0 ? (
    //       <div className="flex flex-col justify-center gap-[30px] bookCardContainer">
    //         {wishlistData.map((wishlistItem, index) => (
    //           <BookCard key={index} {...wishlistItem}></BookCard>
    //         ))}
    //       </div>
    //     ) : (
    //       <div className="flex justify-center">
    //         <p className="text-[1.1rem]">... is empty</p>
    //       </div>
    //     )}
    //   </div>
    //   <Pagination totalPages={totalPages} setPage={setPage}></Pagination>
    // </div>
  );
}
