"use client";

import { MyBooks } from "@/lib/data";
import { useCallback, useEffect, useState } from "react";
import Skeleton from "../skeleton-component/skeleton";
import BookCard from "../book-card-component/book-card";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setUser } from "@/redux/slice";
import Pagination from "../pagination-component/pagination";
import { Book } from "@/types/book";
import { RootState } from "@/types/search";

export default function MyShop() {
  const [data, setData] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const searchData = useSelector(
    (state: RootState) => state.searchValues.searchValues
  );
  const dispatch = useDispatch();

  const fetchBooks = useCallback(async (page: number) => {
    setIsLoading(true);

    try {
      const response = await MyBooks(page);

      if (response) {
        setTotalPages(response.totalPages);
        setData(response.content);
        setSize(response.size);
      }
    } catch (error) {
      console.error("Failed to fetch the books: " + error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Why this code is bad: can be optimized and combined into one useEffect
  // useEffect(() => {
  //   const parsedUser = localStorage.getItem("user");
  //   if (parsedUser) {
  //     dispatch(setUser(JSON.parse(parsedUser)));
  //   }
  //   dispatch(setIsWishlist(false));
  // }, []);

  // useEffect(() => {
  //   dispatch(setIsStore(true));
  // });

  useEffect(() => {
    const parsedUser = localStorage.getItem("user");

    if (parsedUser) {
      dispatch(setUser(JSON.parse(parsedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    setData(searchData.content);
  }, [searchData]);

  // Why this code is bad: re-renders every time, so I added `useCallBack`, as well as try-catch
  // const fetchBooks = async (page: number) => {
  //   setIsLoading(true);
  //   const response = await MyBooks(page);
  //   if (response) {
  //     setTotalPages(response.totalPages);
  //     setData(response.content);
  //     setIsLoading(false);
  //     setSize(response.size);
  //   }
  // };

  useEffect(() => {
    setSize(searchData.size);
  }, [searchData.size]);

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  return (
    <>
      <div className="flex flex-wrap">
        {isLoading ? (
          [...new Array(6)].map((_, index) => <Skeleton key={index} />)
        ) : data.length > 0 ? (
          <div className="flex flex-wrap gap-[30px] bookCardContainer">
            {data.map((book: Book, index) => (
              <BookCard key={index} {...book}></BookCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Image
              src={"/images/Think.webp"}
              width={300}
              height={300}
              alt="Nothing was found"
            ></Image>
            <div className="flex flex-col items-center mt-[90px]">
              <h2 className="text-[2rem]">Woops!</h2>
              <p className="text-[1.2rem]">No books were found</p>
            </div>
          </div>
        )}
      </div>
      {size >= 15 ? (
        <Pagination totalPages={totalPages} setPage={setPage}></Pagination>
      ) : null}
      {/* Removed this code to another component for better readability */}
      {/* <div className="flex justify-between items-center min-w-[70px] mt-[90px]">
        {!isLoading && totalPages !== 0 && data.length > 0 && size >= 15
          ? [...new Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className="border rounded-[0.45rem] p-[10px] paginationButton"
                onClick={() => setPage(index)}
              >
                {index + 1}
              </button>
            ))
          : null}
      </div> */}
    </>
  );
}
