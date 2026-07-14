"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero({ data }: { data: any }) {
  console.log("demo", data);
  return (
    <section id="home" className="relative overflow-hidden px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            {/* <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400"
            >
              🚀 Launching Soon
            </motion.span> */}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-5xl font-bold leading-tight md:text-5xl"
            >
              <span className="text-amber-50">{data.title1}</span>
              <span className="block text-purple-500">{data.title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-xl text-lg text-zinc-400"
            >
              {data.description}
            </motion.p>

            <div className="mt-10 flex flex-wrap gap-4 text-amber-50">
              <Button size="lg">
                {data.button1Text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button size="lg" variant="outline">
                {data.button2Text}
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 text-sm text-purple-500">
              <span>✓ {data.feature1}</span>
              <span>✓ {data.feature2}</span>
              <span>✓ {data.feature3}</span>
              <span>✓ {data.feature4}</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Circles Behind */}
            <div className="absolute h-[450px] w-[450px] rounded-full border-[8px] border-purple-700/60" />

            <div className="absolute h-[380px] w-[380px] rounded-full border-[8px] border-purple-700/60" />

            <div className="absolute h-[310px] w-[310px] rounded-full border-[8px] border-purple-700/60" />

            {/* Floating Video Card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute left-0 top-1/2 z-20 flex h-28 w-28 items-center justify-center rounded-full bg-purple-600 shadow-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 7h9a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
            </motion.div>

            {/* Floating Code Card */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute right-0 top-1/3 z-20 flex h-28 w-28 items-center justify-center rounded-full bg-purple-600 shadow-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 9l-3 3 3 3m8-6l3 3-3 3"
                />
              </svg>
            </motion.div>

            {/* Hero Image */}
            <motion.img
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              src={data?.heroImage}
              alt="student"
              className="relative z-10 max-h-[650px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
