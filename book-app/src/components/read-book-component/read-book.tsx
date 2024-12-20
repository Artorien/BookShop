import { useEffect, useState } from "react";
import { Basic } from "./reader";
import { readBook } from "@/lib/data";
import { User } from "@/types/user";

export default function ReadBookPage(properties: {
  title: string;
  user: User;
}) {
  const [bookBlob, setBookBlob] = useState<Blob | null>(null);

  const fetchBookUrl = async (token: string, title: string) => {
    const response = await readBook(token, title);

    if (response) {
      setBookBlob(response);
    }
  };

  useEffect(() => {
    fetchBookUrl(properties.user?.jwtToken, properties.title);
  }, [properties.user?.token, properties.title]);
  if (!bookBlob) return <p>Loading book...</p>;
  return (
    <div className="min-w-full h-full">
      <Basic blob={bookBlob} />
    </div>
  );
}
