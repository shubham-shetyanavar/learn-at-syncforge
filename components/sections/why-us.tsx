"use client";

import { motion } from "framer-motion";
import {
  MonitorPlay,
  BookOpen,
  Laptop,
  Star,
  Users,
  Briefcase,
  Award,
} from "lucide-react";
const iconMap = {
  BookOpen,
  MonitorPlay,
  Laptop,
  Users,
  Briefcase,
  Award,
} as const;

export default function WhyUs({ data }: { data: any }) {
  console.log("data", data);
  return (
    <section id="why-us" className="relative overflow-hidden py-32">
      <div className="px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT SIDE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-purple-500/30 to-purple-900/20">
              <img
                src="/why-us-student.jpg"
                alt="Learn at SyncForge"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Rating Card */}
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-full bg-purple-700 px-6 py-4 shadow-2xl">
              <Star className="fill-yellow-400 text-yellow-400" size={22} />

              <span className="font-semibold text-white">{data.rating}</span>

              <span className="text-white/90">{data.ratingText}</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 px-5 py-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />

              <span className="text-sm uppercase tracking-wider text-zinc-300">
                {data.badge}
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-8 text-5xl font-bold leading-tight text-white lg:text-4xl">
              {data.title1}
              <br />
              <span className="text-purple-500">{data.title2}</span>
            </h2>

            {/* Features */}
            <div className="mt-12 space-y-10">
              {data.features.map((feature: any) => {
                const Icon =
                  iconMap[feature.icon as keyof typeof iconMap] || BookOpen;

                return (
                  <div key={feature.title} className="flex gap-6">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-purple-700">
                      <Icon className="text-white" size={32} />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-3 text-lg leading-relaxed text-zinc-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
