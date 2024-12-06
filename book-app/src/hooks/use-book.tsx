import { getBookByTitle } from "@/lib/data";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsWishlist, setUser } from "@/redux/slice";

export const useBook = (title: string) => {
  const [book, setBook] = useState(null);
  const [isBought, setIsBought] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const fetchBook = useCallback(async () => {
    const response = await getBookByTitle(title);
    if (response) {
      setIsLoading(true);
      setBook(response);
    }
  }, []);

  useEffect(() => {
    fetchBook();

    const parsedUser = localStorage.getItem("user");

    if (parsedUser) {
      dispatch(setUser(JSON.parse(parsedUser)));
    }
  }, [fetchBook, dispatch]);

  useEffect(() => {
    if (user?.purchasesLocalMemory.includes(book?.title)) {
      setIsBought(true);
    }
  }, [user, book]);

  return { user, book, isBought, isLoading };
};
