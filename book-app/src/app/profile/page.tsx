"use client";

import { useAuth } from "@/contexts/Auth-context";
import Choice from "@/components/new-user-component/registration-or-login";
import UserProfile from "@/components/profile-component/profile";

export default function Profile() {
  const { user } = useAuth();

  return <>{user == null ? <Choice></Choice> : <UserProfile></UserProfile>}</>;
}
