"use client";

import Image from "next/image";
import { BookProperties } from "@/types/book";
import stripePromise from "@/lib/stripe";
import { createCheckoutSession } from "@/lib/data";
// import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { setRead } from "@/redux/slice";
import { useBook } from "@/hooks/use-book";
import "./style.scss";

export default function BookPageComponent(properties : BookProperties) {
  // const [book, setBook] = useState(null);
  // const user = useSelector((state) => state.user.user);
  // const dispatch = useDispatch();
  // const [isBought, setIsBought] = useState(false);
  const router = useRouter();
  const { book, user, isBought, isLoading } = useBook(properties.title);

  // Why this code is bad: to prevent unnecessary re-renders, it`s better to use `useCallBack`
  // const fetchBook = async (title: string) => {
  //   const response = await getBookByTitle(title);
  //   setBook(response);
  // };
  //
  // I decided to create a custom hook `useBook()` to make the code clean.
  // const fetchBook = useCallback(async (title: string) => {
  //   const response = await getBookByTitle(title);
  //   setBook(response);
  // }, []);

  const handleRead = async () => {
    // dispatch(setRead(book?.title || null));
    router.push("/read/" + book?.title);
  };

  // Why this code is bad: redundand usage, could be placed inside another useEffect

  // useEffect(() => {
  //   fetchBook(properties.title);
  // }, [properties.title]);
  //
  // I decided to create a custom hook `useBook()` to make the code clean.
  // useEffect(() => {
  //   fetchBook(properties.title);

  //   const parsedUser = localStorage.getItem("user");
  //   if (parsedUser) {
  //     dispatch(setUser(JSON.parse(parsedUser)));
  //   }

  //   dispatch(setIsWishlist(false));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (user?.purchasesLocalMemory.includes(book?.title)) {
  //     setIsBought(true);
  //   }
  // }, [user, book]);

  const handleCheckout = async (
    token: string,
    bookTitle: string,
    price: number
  ) => {
    if (user) {
      const response = await createCheckoutSession(token, bookTitle, price);

      if (response) {
        const sessionId = response;
        const stripe = await stripePromise;
        sessionStorage.setItem("paymentMade", "true");
        await stripe?.redirectToCheckout(sessionId);
      }
    } else {
      toast("Log in to buy");
    }
  };

  return (
    <div className="py-[90px]">
      <div className="grid grid-cols-[1fr_1fr] bookBlock">
        <div className="col-start-1 flex justify-center">
          {isLoading && (
            <Image
              width={300}
              height={450}
              src={book?.image || ""}
              alt="book image"
              loading="lazy"
              className="bookCover"
            ></Image>
          )}
        </div>
        <div className="col-start-2 flex flex-col justify-center bookDetails">
          <p className="text-[2rem] bookTitle">{book?.title || "Loading..."}</p>
          <p className="text-[1rem] bookText">{book?.author || "Loading..."}</p>
          {isBought ? (
            <br></br>
          ) : (
            <p className="mb-[20px] text-[1.2rem] bookText">
              {book?.price || "Loading..."}$
            </p>
          )}
          {isBought ? (
            <button
              className="rounded-xl text-[1.1rem] flex items-center justify-center border py-[5px] px-[15px] mt-[10px] signup w-[200px] bookTitle"
              onClick={handleRead}
            >
              Read
            </button>
          ) : (
            <button
              className="rounded-xl text-[1.1rem] flex items-center justify-center border py-[5px] px-[15px] mt-[10px] signup w-[200px] bookTitle"
              onClick={() =>
                handleCheckout(user?.token || "", book?.title || "", book?.price || 0)
              }
            >
              Buy
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-cart ml-[10px]"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center pt-[45px] mt-[65px] border-t flex-col items-center">
        <h1 className="text-[2rem] mb-[45px] w-[70%] bookTitle">
          Description:
        </h1>
        <p className="w-[70%] bookText">{book?.description || "Loading..."}</p>
      </div>
    </div>
  );
}
