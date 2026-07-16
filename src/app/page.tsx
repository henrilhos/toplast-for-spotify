import { auth } from "@/auth";
import { Credits } from "@/components/credits";
import { LoginButton } from "@/components/login-button";
import { SignOutButton } from "@/components/sign-out-button";
import { TopForm } from "@/components/top-form";
import { parseTimeRange } from "@/lib/types";

export default async function HomePage(props: PageProps<"/">) {
  const searchParams = await props.searchParams;
  const timeRange = parseTimeRange(searchParams.time_range);

  const session = await auth();
  const isAuthed = !!session?.accessToken && !session.error;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-4xl sm:text-5xl">Welcome to Toplast</h1>
        <p className="text-lg opacity-70">
          Generate custom charts with your most listened artists and tracks.
        </p>
      </div>

      {isAuthed ? (
        <div className="flex flex-col items-center gap-4">
          <TopForm defaultTimeRange={timeRange} />
          <SignOutButton />
        </div>
      ) : (
        <LoginButton />
      )}

      <Credits />
    </main>
  );
}
