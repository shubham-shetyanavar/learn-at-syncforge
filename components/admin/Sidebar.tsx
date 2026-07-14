"use client";

import Link from "next/link";

const menus = [
  "hero",
  "stats",
  "courses",
  "why-us",
  "testimonials",
  "blogs",
  "faq",
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-6">
      <h2 className="mb-10 text-2xl font-bold text-purple-500">
        Learn at SyncForge
      </h2>

      <div className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu}
            href={`/admin/dashboard/${menu}`}
            className="block rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800"
          >
            {menu}
          </Link>
        ))}
      </div>
    </aside>
  );
}
