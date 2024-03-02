"use server";

import { cookies } from "next/headers";

export async function addCookie(name: string, value: string) {
  cookies().set(name, value);
}

export async function getCookie(name: string) {
  const cookieStore = cookies();
  const data = cookieStore.get(name);

  return data;
}
