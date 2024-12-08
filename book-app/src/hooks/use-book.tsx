import { getBookByTitle } from "@/lib/data";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import { Book } from "@/types/book";
import { RootInterface } from "@/types/user";

export const useBook = (title: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [isBought, setIsBought] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootInterface) => state.user.user);
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
    if (user?.purchasesLocalMemory && book?.title) {
      if (user.purchasesLocalMemory.includes(book.title)) {
        setIsBought(true);
      }
    }
  }, [user, book]);

  return { user, book, isBought, isLoading };
};
