import { signOutAction } from "@/lib/actions";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="cursor-pointer text-sm underline opacity-60 transition-opacity hover:opacity-100"
      >
        Sign out
      </button>
    </form>
  );
}
