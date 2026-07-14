export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="text-3xl font-semibold text-purple-500">
            Learn at SyncForge
          </h3>

          <p className="mt-2 text-white">
            Practical learning for modern developers.
          </p>
        </div>

        <div className="flex gap-6 text-white">
          <a href="#courses">Courses</a>
          <a href="#workshops">Workshops</a>
          <a href="#blogs">Blogs</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-white">
        © 2026 Learn at SyncForge. All rights reserved.
      </div>
    </footer>
  );
}
