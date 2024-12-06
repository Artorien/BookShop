"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsStore, setUser } from "@/redux/slice";
import { MyLibrary } from "@/lib/data";
import BookCard from "../book-card-component/book-card";

export default function Books() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [books, setBooks] = useState("");

  const fetchBooks = async (token: string) => {
    const response = await MyLibrary(token);
    setBooks(response);
  };

  useEffect(() => {
    dispatch(setIsStore(true));

    const parsedUser = localStorage.getItem("user");
    if (parsedUser) {
      dispatch(setUser(JSON.parse(parsedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      fetchBooks(user?.token);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center py-[90px]">
      <h1 className="text-[2rem] mb-[90px]">Your library</h1>
      <div className="flex justify-center w-fit">
        {books.length > 0 ? (
          <div className="flex flex-wrap gap-[30px] bookCardContainer">
            {books.map((book, index) => (
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
  );
}
