"use client";

import { useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";

interface HeroFormData {
  title1: string;
  title2: string;
  description: string;

  button1Text: string;
  button1Link: string;

  button2Text: string;
  button2Link: string;

  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;

  heroImage: string;
}

export default function HeroForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<HeroFormData>({
    title1: "",
    title2: "",
    description: "",

    button1Text: "",
    button1Link: "",

    button2Text: "",
    button2Link: "",

    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",

    heroImage: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const ref = doc(db, "hero", "main");

    const snap = await getDoc(ref);

    if (snap.exists()) {
      setForm(snap.data() as HeroFormData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveHero = async () => {
    try {
      setLoading(true);

      await setDoc(doc(db, "hero", "main"), form);

      alert("Hero Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Error Saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="grid gap-6">
        <input
          name="title1"
          value={form.title1}
          onChange={handleChange}
          placeholder="Title Line 1"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          name="title2"
          value={form.title2}
          onChange={handleChange}
          placeholder="Title Line 2"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <textarea
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="button1Text"
            value={form.button1Text}
            onChange={handleChange}
            placeholder="Button 1 Text"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            name="button1Link"
            value={form.button1Link}
            onChange={handleChange}
            placeholder="Button 1 Link"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="button2Text"
            value={form.button2Text}
            onChange={handleChange}
            placeholder="Button 2 Text"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            name="button2Link"
            value={form.button2Link}
            onChange={handleChange}
            placeholder="Button 2 Link"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />
        </div>

        <h2 className="mt-4 text-xl font-semibold">Features</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="feature1"
            value={form.feature1}
            onChange={handleChange}
            placeholder="Feature 1"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            name="feature2"
            value={form.feature2}
            onChange={handleChange}
            placeholder="Feature 2"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            name="feature3"
            value={form.feature3}
            onChange={handleChange}
            placeholder="Feature 3"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            name="feature4"
            value={form.feature4}
            onChange={handleChange}
            placeholder="Feature 4"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />
        </div>

        <input
          name="heroImage"
          value={form.heroImage}
          onChange={handleChange}
          placeholder="Hero Image URL"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <Button onClick={saveHero} disabled={loading} className="mt-4">
          {loading ? "Saving..." : "Save Hero Section"}
        </Button>
      </div>
    </div>
  );
}
