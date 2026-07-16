export default function CollageLoading() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="aspect-square w-full max-w-175 animate-pulse rounded-lg bg-foreground/10" />
      <div className="flex gap-4">
        <div className="h-12 w-40 animate-pulse rounded-md bg-foreground/10" />
        <div className="h-12 w-24 animate-pulse rounded-md bg-foreground/10" />
      </div>
    </main>
  );
}
