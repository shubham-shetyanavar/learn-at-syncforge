"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, MonitorPlay, Award } from "lucide-react";

const iconMap = {
  UserPlus,
  BookOpen,
  MonitorPlay,
  Award,
};

export default function Stats({ data }: { data: any }) {
  console.log("stats", data);

  return (
    <section id="how" className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 px-5 py-2">
            <div className="h-2 w-2 rounded-full bg-purple-500" />

            <span className="text-sm uppercase tracking-wider text-zinc-300">
              {data.badge}
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h2 className="text-4xl font-bold text-white md:text-6xl">
            {data.title1} <span className="text-purple-500">{data.title2}</span>{" "}
            {data.title3}
          </h2>

          <p className="mt-4 text-zinc-400">{data.description}</p>
        </div>

        {/* Timeline */}
        <div className="relative mt-24">
          {/* Horizontal Line */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-zinc-800 lg:block" />

          <div className="grid gap-14 lg:grid-cols-4">
            {data.steps.map((step: any) => {
              const Icon =
                iconMap[step.icon as keyof typeof iconMap] || UserPlus;

              return (
                <motion.div
                  key={step.id}
                  whileHover={{
                    y: -10,
                  }}
                  className="relative text-center"
                >
                  {/* Circle */}
                  <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
                    <div
                      className={`
                        flex h-28 w-28 items-center justify-center rounded-full border
                        ${
                          step.active
                            ? "border-purple-500 bg-gradient-to-b from-purple-600 to-purple-800"
                            : "border-zinc-700 bg-zinc-900"
                        }
                      `}
                    >
                      <Icon className="h-12 w-12 text-white" />
                    </div>

                    {/* Step Number */}
                    <div className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-[#111111] text-lg font-semibold text-white">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mt-8 text-2xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
