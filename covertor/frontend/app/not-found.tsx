import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <section className="surface-panel rounded-[2.25rem] px-8 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink/50">404</p>
          <h1 className="mt-4 font-display text-5xl text-ink">That page is not available.</h1>
          <p className="mt-4 text-sm leading-7 text-ink/70">
            The route may have moved, or the link may be outdated. You can go back to the homepage or open one of the file conversion tools.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-pine"
            >
              Back to home
            </Link>
            <Link
              href="/mp4-to-mp3"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/10 px-6 text-sm font-semibold text-ink transition hover:bg-white"
            >
              Open a converter
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
