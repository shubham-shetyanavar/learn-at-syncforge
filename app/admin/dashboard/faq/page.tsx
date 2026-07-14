"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FAQAdminPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [faqs, setFaqs] = useState<any[]>([]);

  const fetchFaqs = async () => {
    const snapshot = await getDocs(collection(db, "faqs"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setFaqs(data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!question || !answer) return;

    await addDoc(collection(db, "faqs"), {
      question,
      answer,
      active: true,
      order: faqs.length + 1,
      createdAt: serverTimestamp(),
    });

    setQuestion("");
    setAnswer("");

    fetchFaqs();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "faqs", id));

    fetchFaqs();
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Manage FAQs</h1>

      {/* Form */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            className="w-full rounded-xl border border-zinc-700 bg-black p-4"
          />

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            rows={5}
            className="w-full rounded-xl border border-zinc-700 bg-black p-4"
          />

          <button
            type="submit"
            className="rounded bg-purple-600 px-6 py-3 text-white"
          >
            Add FAQ
          </button>
        </form>
      </div>

      {/* Table */}

      <div className="mt-10 overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-black text-white">
              <th className="p-4 text-left">Question</th>

              <th className="p-4 text-left">Answer</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-b">
                <td className="p-4">{faq.question}</td>

                <td className="p-4 max-w-md truncate">{faq.answer}</td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="rounded bg-red-500 px-4 py-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
