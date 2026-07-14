"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
  active: boolean;
}

interface StatsFormData {
  badge: string;
  title1: string;
  title2: string;
  title3: string;
  description: string;
  steps: Step[];
}

export default function StatsForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<StatsFormData>({
    badge: "",
    title1: "",
    title2: "",
    title3: "",
    description: "",

    steps: [
      {
        id: "01",
        title: "",
        description: "",
        icon: "UserPlus",
        active: true,
      },
      {
        id: "02",
        title: "",
        description: "",
        icon: "BookOpen",
        active: false,
      },
      {
        id: "03",
        title: "",
        description: "",
        icon: "MonitorPlay",
        active: false,
      },
      {
        id: "04",
        title: "",
        description: "",
        icon: "Award",
        active: false,
      },
    ],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const ref = doc(db, "stats", "main");

      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForm(snap.data() as StatsFormData);
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

  const handleStepChange = (
    index: number,
    field: keyof Step,
    value: string | boolean,
  ) => {
    const updated = [...form.steps];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({
      ...form,
      steps: updated,
    });
  };

  const saveStats = async () => {
    try {
      setLoading(true);

      await setDoc(doc(db, "stats", "main"), form);

      alert("Stats Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed To Save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="grid gap-6">
        <input
          name="badge"
          value={form.badge}
          onChange={handleChange}
          placeholder="Badge"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          name="title1"
          value={form.title1}
          onChange={handleChange}
          placeholder="Heading Part 1"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          name="title2"
          value={form.title2}
          onChange={handleChange}
          placeholder="Heading Part 2"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          name="title3"
          value={form.title3}
          onChange={handleChange}
          placeholder="Heading Part 3"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <h2 className="mt-4 text-2xl font-semibold">Journey Steps</h2>

        {form.steps.map((step, index) => (
          <div key={step.id} className="rounded-2xl border border-zinc-800 p-6">
            <h3 className="mb-4 text-lg font-semibold">Step {step.id}</h3>

            <div className="grid gap-4">
              <input
                value={step.title}
                onChange={(e) =>
                  handleStepChange(index, "title", e.target.value)
                }
                placeholder="Title"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />

              <textarea
                rows={3}
                value={step.description}
                onChange={(e) =>
                  handleStepChange(index, "description", e.target.value)
                }
                placeholder="Description"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />

              <input
                value={step.icon}
                onChange={(e) =>
                  handleStepChange(index, "icon", e.target.value)
                }
                placeholder="Icon Name"
                className="rounded-xl border border-zinc-700 bg-black p-4"
              />

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={step.active}
                  onChange={(e) =>
                    handleStepChange(index, "active", e.target.checked)
                  }
                />
                Active Step
              </label>
            </div>
          </div>
        ))}

        <Button onClick={saveStats} disabled={loading} className="mt-4">
          {loading ? "Saving..." : "Save Stats Section"}
        </Button>
      </div>
    </div>
  );
}
