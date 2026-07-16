"use server";

import { signIn, signOut } from "@/auth";

export async function signInAction() {
  await signIn("spotify", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
