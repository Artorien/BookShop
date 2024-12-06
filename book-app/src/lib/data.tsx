export const MyBooks = async (page: number) => {
  const response = await fetch("http://localhost:8080/all?page=" + page);

  return response.json();
};

export const SearchResponse = async (name: string) => {
  const response = await fetch("http://localhost:8080/search?name=" + name);

  return response.json();
};

export const AddToWishList = async (title: string, token: string) => {
  const response = await fetch(
    "http://localhost:8080/addtowishlist?title=" + title,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const removeFromWishList = async (title: string, token: string) => {
  const response = await fetch(
    "http://localhost:8080/removefromwishlist?title=" + title,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const getWishList = async (token: string, page: number) => {
  const response = await fetch("http://localhost:8080/wishlist?page=" + page, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const getBookByTitle = async (title: string) => {
  const response = await fetch("http://localhost:8080/book?title=" + title);

  return response.json();
};

export const createCheckoutSession = async (
  token: string,
  bookTitle: string,
  price: number
): Promise<any> => {
  try {
    const response = await fetch(
      "http://localhost:8080/create-checkout-session",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookTitle, price }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};

export const MyLibrary = async (token: string) => {
  const response = await fetch("http://localhost:8080/mybooks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const clearTheWishlist = async (token: string) => {
  const response = await fetch("http://localhost:8080/clearwishlist", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return null;
  }
};

export const readBook = async (token: string, title: string) => {
  const response = await fetch("http://localhost:8080/read?title=" + title, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const blob = await response.blob();
    // const objectURL = URL.createObjectURL(blob);
    // console.log("URL in response: " + objectURL);
    // return objectURL;
    return blob;
  }
};

export const data = [
  {
    name: "My library",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-library-big"
      >
        <rect width="8" height="18" x="3" y="3" rx="1" />
        <path d="M7 3v18" />
        <path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" />
      </svg>
    ),
    link: "/library",
  },
  {
    name: "Shop",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-cart"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
    link: "/shop",
  },
  {
    name: "Contact",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mail"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    link: "/contact",
  },
  {
    name: "About Us",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-info"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    link: "/about",
  },
  {
    name: "Profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    link: "/profile",
  },
];
