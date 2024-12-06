"use client";

import NewCredentials from "@/components/change-credentials-component/new-credentials";
import Choice from "@/components/new-user-component/registration-or-login";
import { useAuth } from "@/contexts/Auth-context";

export default function ChangeCredentials() {
  const { user } = useAuth();

  return (
    <>{user == null ? <Choice></Choice> : <NewCredentials></NewCredentials>}</>
  );
}
