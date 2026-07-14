"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative overflow-hidden py-32 px-6">
      {/* Background World Map */}
      <div className="section-glow left-0 top-0" />
      <div className="section-glow right-0 bottom-0" />
      <Image
        src="/world.svg"
        alt="World Map"
        fill
        priority
        className="object-contain opacity-20"
      />

      <div
        className="
          absolute
          inset-0
          opacity-20
          bg-[url('/world-map.png')]
          bg-cover
          bg-center
          bg-no-repeat
        "
      />

      {/* Purple Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-purple-900/20
          via-transparent
          to-purple-900/20
        "
      />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Badge */}

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-purple-500/50
            px-5
            py-2
          "
        >
          <div className="h-2 w-2 rounded-full bg-purple-500" />

          <span className="text-sm uppercase tracking-wider text-zinc-300">
            Get Started
          </span>
        </div>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            mt-8
            text-5xl
            font-bold
            leading-tight
            md:text-7xl
          "
        >
          <span className="text-white">Ready to Transform </span>
          <span className="text-purple-500">Your Skills</span>
          <br />

          <span className="text-white">into a Career?</span>
        </motion.h2>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-8
            max-w-3xl
            text-lg
            text-zinc-400
          "
        >
          Join thousands of learners building modern web development skills
          through practical projects, live workshops and industry-focused
          training.
        </p>

        {/* Buttons */}

        <div
          className="
            mt-12
            flex
            flex-wrap
            justify-center
            gap-5
          "
        >
          <Button
            size="lg"
            className="
              h-14
              rounded-full
              bg-purple-600
              px-8
              hover:bg-purple-700
              text-white
            "
          >
            Start Learning Now
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="
              h-14
              rounded-full
              border-white
              bg-transparent
              px-8
              text-white
            "
          >
            View Courses
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
