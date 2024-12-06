"use client"

import { useAuth } from "@/contexts/Auth-context";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerificationProcess() {
  const { verification, verificationMessage } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    verification(token);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>{verificationMessage}</p>
    </div>
  );
}
