import { signInAction } from "@/lib/actions";

export function LoginButton() {
  return (
    <form action={signInAction}>
      <button
        type="submit"
        className="cursor-pointer rounded-md bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Login with Spotify
      </button>
    </form>
  );
}
