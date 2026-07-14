"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Learn at SyncForge?",
    answer:
      "Learn at SyncForge is a practical learning platform focused on React, Next.js, JavaScript, TypeScript, Full Stack Development and AI technologies through live workshops and hands-on projects.",
  },
  {
    question: "Who can join the courses?",
    answer:
      "Students, working professionals, freelancers and developers looking to upgrade their skills can join.",
  },
  {
    question: "Are the courses beginner friendly?",
    answer:
      "Yes. We start from fundamentals and gradually move towards advanced real-world implementations.",
  },
  {
    question: "Will recordings be available?",
    answer: "Yes. Session recordings will be available for enrolled students.",
  },
  {
    question: "Will there be live doubt solving?",
    answer:
      "Yes. Dedicated doubt solving sessions will be conducted regularly.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes. Certificates will be issued after successful completion of the course.",
  },
];

export default function FAQ({ data }: { data: any }) {
  const [active, setActive] = useState(0);

  console.log("faq", data);

  return (
    <section id="faq" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[420px_1fr]">
          {/* LEFT SIDE */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 px-5 py-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />

              <span className="text-sm uppercase tracking-wider text-zinc-300">
                Need Help
              </span>
            </div>

            <h2 className="mt-8 text-5xl font-bold leading-tight text-white md:text-6xl">
              Frequently Asked
              <br />
              <span className="text-purple-500">Questions</span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              We're here to make learning easy. Explore our FAQs to quickly find
              the information you need about courses, workshops, access and
              more.
            </p>

            {/* Question Card */}

            <div className="mt-24 rounded-[32px] border border-zinc-800 bg-[#0f0f0f] p-8">
              <h3 className="text-4xl font-semibold text-white">
                Still have a question?
              </h3>

              <p className="mt-5 text-zinc-400">
                We're here to help. If you have any questions or need more
                information, feel free to reach out.
              </p>

              <button
                className="
                  mt-8
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-zinc-600
                  px-8
                  py-4
                  text-lg
                  text-white
                  transition-all
                  hover:border-purple-500
                "
              >
                Ask a Question
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6">
            {data.map((faq: any, index: number) => {
              const isOpen = active === index;

              return (
                <div
                  key={index}
                  className={`
                    overflow-hidden
                    rounded-[32px]
                    border
                    transition-all
                    duration-300

                    ${
                      isOpen
                        ? "border-purple-500 bg-purple-700"
                        : "border-zinc-800 bg-[#121212]"
                    }
                  `}
                >
                  <button
                    onClick={() => setActive(isOpen ? -1 : index)}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      p-6
                      text-left
                    "
                  >
                    <span className="text-xl font-medium text-white">
                      {faq.question}
                    </span>

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/50
                      "
                    >
                      {isOpen ? (
                        <Minus className="h-5 w-5 text-white" />
                      ) : (
                        <Plus className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <div className="px-8 pb-8">
                          <p className="max-w-3xl text-lg leading-relaxed text-purple-100">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
