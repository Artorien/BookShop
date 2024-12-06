"use client";

import PaymentDetails from "@/components/Payment-details-component/payment";
import { useRouter } from "next/navigation";

interface DetailsPageProps {
  params: {
    sessionId: string;
    title: string;
  };
}

export default function Details({ params }: DetailsPageProps) {
  const { sessionId } = params;
  const { title } = params;
  const router = useRouter();
  const decodedSessionId = decodeURIComponent(sessionId);
  const decodedTitle = decodeURIComponent(title);

  const cleanSessionId = decodedSessionId.startsWith("sessionId=")
    ? decodedSessionId.split("=")[1]
    : decodedSessionId;
  const cleanTitle = decodedTitle.startsWith("title=")
    ? decodedTitle.split("=")[1]
    : decodedTitle;

  return sessionStorage.getItem("paymentMade") ? (
    <PaymentDetails
      sessionId={cleanSessionId}
      title={cleanTitle}
    ></PaymentDetails>
  ) : (
    router.push("/about")
  );
}
