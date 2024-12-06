"use client";
import "./style.scss";

export function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast("Message has been sent");
  };
  return (
    <form action={handleSubmit} method="post" className="flex flex-col gap-8">
      <div className="flex gap-8 personalInfoBlock">
        <div className="flex flex-col">
          <label htmlFor="first-name" className="mb-[5px]">
            First name
          </label>
          <input
            type="text"
            name="first-name"
            className="rounded-xl py-[5px] px-[15px]"
            placeholder="John"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="last-name" className="mb-[5px]">
            Last name
          </label>
          <input
            type="text"
            className="rounded-xl py-[5px] px-[15px]"
            placeholder="Smith"
            name="last-name"
            required
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-[5px]">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="rounded-xl py-[5px] px-[15px]"
            placeholder="youremail@email.com"
            required
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-[5px]">
            Your message
          </label>
          <textarea
            name="message"
            className="rounded-xl py-[5px] px-[15px] resize-none h-[100px]"
            placeholder="Write your message here"
            required
            rows={10}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="py-[5px] px-[15px] bg-white rounded-xl w-[150px]"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
