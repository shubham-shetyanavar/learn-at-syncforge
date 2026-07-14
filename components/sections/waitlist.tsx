"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Waitlist() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
        <div className="text-center">
          <span className="text-purple-500">JOIN WAITLIST</span>

          <h2 className="mt-4 text-4xl font-bold">Be The First To Know</h2>

          <p className="mt-4 text-zinc-400">
            Get notified when workshops and courses launch.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Email" />
          <Input placeholder="Phone Number" />

          <Button size="lg">Join Waitlist</Button>
        </div>
      </div>
    </section>
  );
}
