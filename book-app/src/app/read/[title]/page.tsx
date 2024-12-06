"use client";

import { useDispatch, useSelector } from "react-redux";
import ReadBookPage from "@/components/read-book-component/read-book";
import { useEffect } from "react";
import { useAuth } from "@/contexts/Auth-context";
import Profile from "@/app/profile/page";

interface ReadProps {
  params: {
    title: string;
  };
}

export default function Page({ params }: ReadProps) {
  // const bookURL = useSelector((state) => state.bookURL.bookURL);
  // const { user, loading } = useAuth();
  const { user } = useAuth();
  const { title } = params;

  useEffect(() => {
    console.log("UserA:", user);
  }, [user]);

  // useEffect(() => {
  //   if (!user) {
  //     const parsedUser = localStorage.getItem("user");
  //     console.log("Parsed user:", parsedUser);

  //     if (parsedUser) {
  //       dispatch(setUser(JSON.parse(parsedUser)));
  //     } else {
  //       router.push("/profile");
  //     }
  //   }
  // }, [user, dispatch, router]);
  // if (loading) {
  //   return (
  //     <>
  //       <p>Loading...</p>
  //     </>
  //   );
  // }

  // useEffect(() => {
  //   const parsedUser = localStorage.getItem("user");

  //   if (parsedUser) {
  //     dispatch(setUser(JSON.parse(parsedUser)));
  //   }
  // }, []);

  return (
    <div className="w-full h-full">
      {user == null ? (
        <Profile></Profile>
      ) : (
        <ReadBookPage title={title} user={user}></ReadBookPage>
      )}
    </div>
  );
}
