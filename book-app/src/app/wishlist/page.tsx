"use client";

import Choice from "@/components/new-user-component/registration-or-login";
import WishlistComponent from "@/components/wishlist-component/wishlist";
import { useAuth } from "@/contexts/Auth-context";

export default function Wishlist() {
  const { user } = useAuth();

  return user == null ? (
    <Choice></Choice>
  ) : (
    <WishlistComponent user={user}></WishlistComponent>
  );
}
