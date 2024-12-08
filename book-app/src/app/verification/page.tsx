import VerificationProcess from "@/components/registration-component/verification-context";
import { Suspense } from "react";

export default function Verification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationProcess></VerificationProcess>
    </Suspense>
  );
}
