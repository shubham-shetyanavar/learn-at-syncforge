"use client";

import HeroForm from "@/components/admin/HeroForm";

export default function HeroAdminPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Hero Section</h1>

        <p className="mt-2 text-zinc-400">Manage homepage hero content.</p>
      </div>

      <HeroForm />
    </div>
  );
}
