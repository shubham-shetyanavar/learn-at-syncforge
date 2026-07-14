"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  name: string;
  role: string;
  rating: string;
  review: string;
}

interface TestimonialsData {
  badge: string;
  title1: string;
  title2: string;
  description: string;
  reviews: Review[];
}

const initialData: TestimonialsData = {
  badge: "Testimonials",
  title1: "What Our Learners Are",
  title2: "Saying",
  description:
    "Real feedback from developers who attended our workshops and programs.",
  reviews: [
    {
      id: 1,
      name: "",
      role: "",
      rating: "",
      review: "",
    },
  ],
};

export default function TestimonialsForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<TestimonialsData>(initialData);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const ref = doc(db, "testimonials", "main");

      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForm(snap.data() as TestimonialsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateReview = (index: number, field: keyof Review, value: string) => {
    const updated = [...form.reviews];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm((prev) => ({
      ...prev,
      reviews: updated,
    }));
  };

  const addReview = () => {
    setForm((prev) => ({
      ...prev,
      reviews: [
        ...prev.reviews,
        {
          id: Date.now(),
          name: "",
          role: "",
          rating: "",
          review: "",
        },
      ],
    }));
  };

  const removeReview = (index: number) => {
    const updated = [...form.reviews];

    updated.splice(index, 1);

    setForm((prev) => ({
      ...prev,
      reviews: updated,
    }));
  };

  const saveData = async () => {
    try {
      setLoading(true);

      await setDoc(doc(db, "testimonials", "main"), form);

      alert("Testimonials Updated");
    } catch (error) {
      console.error(error);
      alert("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="space-y-6">
        <input
          name="badge"
          value={form.badge}
          onChange={handleChange}
          placeholder="Badge"
          className="w-full rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          name="title1"
          value={form.title1}
          onChange={handleChange}
          placeholder="Heading Line 1"
          className="w-full rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          name="title2"
          value={form.title2}
          onChange={handleChange}
          placeholder="Purple Heading"
          className="w-full rounded-xl border border-zinc-700 bg-black p-4"
        />

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full rounded-xl border border-zinc-700 bg-black p-4"
        />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Testimonials</h2>

          <Button onClick={addReview}>Add Testimonial</Button>
        </div>

        {form.reviews.map((review, index) => (
          <div
            key={review.id}
            className="space-y-4 rounded-2xl border border-zinc-700 p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={review.name}
                onChange={(e) => updateReview(index, "name", e.target.value)}
                placeholder="Name"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />

              <input
                value={review.role}
                onChange={(e) => updateReview(index, "role", e.target.value)}
                placeholder="Role"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />
              <input
                type="number"
                min="1"
                max="5"
                value={review.rating}
                onChange={(e) => updateReview(index, "rating", e.target.value)}
                placeholder="Rating"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />
            </div>

            <textarea
              rows={4}
              value={review.review}
              onChange={(e) => updateReview(index, "review", e.target.value)}
              placeholder="Review"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <Button variant="destructive" onClick={() => removeReview(index)}>
              Delete
            </Button>
          </div>
        ))}

        <Button onClick={saveData} disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Testimonials"}
        </Button>
      </div>
    </div>
  );
}
