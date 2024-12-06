import { ContactForm } from "./contact-form";
import "./style.scss";
import Link from "next/link";

export default function ContactUs() {
  return (
    <>
      <div className="flex justify-between items-center flex-col h-full w-[70%] py-[90px] contactBlock">
        <div className="w-full container">
          <div className="h-[50%] flex justify-start items-center w-full titleBlock">
            <p className="text-[2rem] mb-[40px]">Contact Us</p>
          </div>
          <div className="flex justify-between h-[50%] w-full contactWithUsBlock">
            <div className="w-[300px] mb-[20px]">
              <h2 className="text-[1.4rem] mb-[20px]">Via phone:</h2>
              <ul>
                <li className="mb-[10px]">
                  <div className="flex flex-col bg-[#f7f7f7] rounded-xl p-[15px]">
                    <p>Customer support</p>
                    <p>+1234567890</p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-col bg-[#f7f7f7] rounded-xl p-[15px]">
                    <p>Business questions</p>
                    <p>+0987654321</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hidden linkBlock">
              <Link href="/contact-us">
                <button className="border rounded-xl py-[5px] px-[15px] text-[1rem] bg-[#f7f7f7] flex justify-center items-center">
                  Write us an email
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-right ml-[15px]"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
            <div className="w-[514px] formBlock">
              <h2 className="text-[1.4rem] mb-[20px]">Via mail:</h2>
              <div className="bg-[#f7f7f7] rounded-xl p-[30px]">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
