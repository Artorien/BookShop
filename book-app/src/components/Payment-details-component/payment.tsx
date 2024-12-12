"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice";
import { RootInterface } from "@/types/user";
import { PaymentProps } from "@/types/payment";

export default function PaymentDetails(properties: PaymentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentMade, setIsPaymentMade] = useState(false);
  const user = useSelector((state: RootInterface) => state.user.user);
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false);
  const url = "https://egreg.xyz";

  useEffect(() => {
    const parsedUser = localStorage.getItem("user");

    if (parsedUser) {
      dispatch(setUser(JSON.parse(parsedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const session_id = properties.sessionId;
    if (session_id && user && !verified) {
      verifyPayment(session_id, user?.jwtToken);
    }
  }, [user, properties.sessionId, verified]);

  const verifyPayment = async (session_id: string, token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/payment/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: session_id }),
      });

      if (response) {
        setIsLoading(false);
        setVerified(true);
      }
      if (response.ok) {
        setIsPaymentMade(true);
        sessionStorage.removeItem("paymentMade");
        const updatedPurchaseList = [
          ...user.purchasesLocalMemory,
          properties.title,
        ];
        const updatedUser = {
          ...user,
          purchasesLocalMemory: updatedPurchaseList,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(setUser(updatedUser));
        setTimeout(() => {
          router.push("/shop");
        }, 3000);
      } else {
        setIsPaymentMade(false);
        sessionStorage.removeItem("paymentMade");
        setTimeout(() => {
          router.push("/shop");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setIsPaymentMade(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isPaymentMade ? (
        <div>
          <p>Payment was successfull. Returning to home page...</p>
        </div>
      ) : (
        <div>
          <p>Payment failed. Returning to home page</p>
        </div>
      )}
    </>
  );
}
