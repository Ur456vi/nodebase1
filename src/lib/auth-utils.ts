import "server-only"; // <-- important to keep this server-only

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requireAuth = async () => {
  // 1. Get the ReadonlyHeaders
  const headersList = await headers();

  // 2. Convert to a plain object (Record<string, string>)
  const headerObject = Object.fromEntries(headersList.entries());

  // 3. Pass that into getSession
  const session = await auth.api.getSession({
    headers: headerObject,
  });

  if (!session) {
    redirect("/login");
  }

  return session;
};

export const requireUnauth = async () => {
  const headersList = await headers();
  const headerObject = Object.fromEntries(headersList.entries());

  const session = await auth.api.getSession({
    headers: headerObject,
  });

  // For unauth-only routes, usually redirect if the user IS logged in
  if (session) {
    redirect("/");
  }

  return session;
};
