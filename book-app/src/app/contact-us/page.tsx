import { ContactForm } from "@/components/contact-us-component/contact-form";
import Link from "next/link";

export default function ContactUs() {
  return (
    <div className="flex flex-col items-center py-[90px]">
      <h1 className="text-[2rem] mb-[90px]">Contact Us</h1>
      <div className="bg-[#f7f7f7] rounded-xl p-[30px]">
        <ContactForm />
      </div>
      <Link href={"/profile"}>
        <button className="py-[5px] px-[15px] border rounded-xl w-[150px] mt-[25px] goback">
          Go Back
        </button>
      </Link>
    </div>
  );
}
