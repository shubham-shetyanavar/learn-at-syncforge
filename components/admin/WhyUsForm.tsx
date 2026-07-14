"use client";

import { useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface WhyUsData {
  badge: string;

  title1: string;
  title2: string;

  image: string;

  rating: string;
  ratingText: string;

  features: Feature[];
}

export default function WhyUsForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<WhyUsData>({
    badge: "",

    title1: "",
    title2: "",

    image: "",

    rating: "",
    ratingText: "",

    features: [
      {
        icon: "BookOpen",
        title: "",
        description: "",
      },
      {
        icon: "MonitorPlay",
        title: "",
        description: "",
      },
      {
        icon: "Laptop",
        title: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const snap = await getDoc(doc(db, "whyus", "main"));

      if (snap.exists()) {
        setForm(snap.data() as WhyUsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveData = async () => {
    try {
      setLoading(true);

      await setDoc(doc(db, "whyus", "main"), form);

      alert("Why Us Updated");
    } catch (error) {
      console.log(error);
      alert("Failed To Save");
    } finally {
      setLoading(false);
    }
  };

  const updateFeature = (
    index: number,
    field: keyof Feature,
    value: string,
  ) => {
    const updated = [...form.features];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({
      ...form,
      features: updated,
    });
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="grid gap-6">
        <input
          value={form.badge}
          onChange={(e) =>
            setForm({
              ...form,
              badge: e.target.value,
            })
          }
          placeholder="Badge"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.title1}
          onChange={(e) =>
            setForm({
              ...form,
              title1: e.target.value,
            })
          }
          placeholder="Title Line 1"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.title2}
          onChange={(e) =>
            setForm({
              ...form,
              title2: e.target.value,
            })
          }
          placeholder="Highlighted Title"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
            })
          }
          placeholder="Image URL"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.rating}
            onChange={(e) =>
              setForm({
                ...form,
                rating: e.target.value,
              })
            }
            placeholder="Rating"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            value={form.ratingText}
            onChange={(e) =>
              setForm({
                ...form,
                ratingText: e.target.value,
              })
            }
            placeholder="Rating Text"
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />
        </div>

        <h2 className="mt-6 text-2xl font-semibold">Features</h2>

        {form.features.map((feature, index) => (
          <div key={index} className="rounded-2xl border border-zinc-800 p-6">
            <h3 className="mb-4 text-lg font-semibold">Feature {index + 1}</h3>

            <div className="grid gap-4">
              <input
                value={feature.icon}
                onChange={(e) => updateFeature(index, "icon", e.target.value)}
                placeholder="Icon Name"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />

              <input
                value={feature.title}
                onChange={(e) => updateFeature(index, "title", e.target.value)}
                placeholder="Feature Title"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />

              <textarea
                rows={4}
                value={feature.description}
                onChange={(e) =>
                  updateFeature(index, "description", e.target.value)
                }
                placeholder="Feature Description"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />
            </div>
          </div>
        ))}

        <Button onClick={saveData} disabled={loading}>
          {loading ? "Saving..." : "Save Why Us Section"}
        </Button>
      </div>
    </div>
  );
}
