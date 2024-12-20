import { useAuth } from "@/contexts/Auth-context";
import { setIsWishlist } from "@/redux/slice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

export default function NewCredentials() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const { updateUserDetails } = useAuth();
  const dispatch = useDispatch();
  const parsedUser = localStorage.getItem("user");
  const user = parsedUser ? JSON.parse(parsedUser) : null;

  useEffect(() => {
    dispatch(setIsWishlist(false));
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPasswordConfirmation == newPassword && user) {
      if (updateUserDetails) {
        setError("");
        updateUserDetails(user.email, newEmail, newPassword);
      }
    } else {
      setError("Your password mismatch. Please try again");
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col pt-[90px]">
      <h2 className="text-[2rem] mb-[25px] title">
        Change Your credentials here:
      </h2>
      <div className="bg-[#f7f7f7] rounded-xl p-[30px]">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <div className="flex gap-8 personalInfoBlock flex-col">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-[5px]">
                New email
              </label>
              <input
                type="email"
                name="email"
                className="rounded-xl py-[5px] px-[15px] w-[350px] emailInput"
                placeholder="example@email.com"
                required
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-[5px]">
                New password
              </label>
              <input
                type="password"
                className="rounded-xl py-[5px] px-[15px]"
                placeholder="password"
                name="password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-[5px]">
                Repeat your password
              </label>
              <input
                type="password"
                className="rounded-xl py-[5px] px-[15px]"
                placeholder="your password again"
                name="password"
                required
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              />
              <p className="text-red-600">{error}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="py-[5px] px-[15px] bg-white rounded-xl w-[150px] changeButton"
              >
                Change
              </button>
            </div>
          </div>
        </form>
      </div>
      <Link href={"/profile"}>
        <button className="py-[5px] px-[15px] border rounded-xl w-[150px] mt-[25px] goback">
          Go Back
        </button>
      </Link>
    </div>
  );
}
