"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Courses({ data }: { data: any }) {
  console.log("course", data);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    return data.filter((course: any) => {
      const search = searchTerm.toLowerCase();

      return (
        course.title.toLowerCase().includes(search) ||
        course.category.toLowerCase().includes(search) ||
        course.instructor.toLowerCase().includes(search)
      );
    });
  }, [searchTerm]);

  return (
    <section id="courses" className="py-28 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 px-5 py-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />

              <span className="text-sm uppercase tracking-wider text-zinc-300">
                Our Courses
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold text-white md:text-6xl">
              Explore Our Best <span className="text-purple-500">Courses</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search course..."
                className="h-16 w-full rounded-full border border-zinc-800 bg-[#111111] px-6 pr-12 text-white outline-none transition-all focus:border-purple-500 sm:w-[380px]"
              />

              <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {filteredCourses.map((course: any) => (
            <motion.div
              key={course.id}
              whileHover={{
                y: -10,
              }}
              className="
                group
                overflow-hidden
                rounded-[32px]
                border
                border-zinc-800
                bg-[#111111]
                transition-all
                duration-500
                hover:border-purple-500
                hover:bg-gradient-to-b
                hover:from-purple-600
                hover:to-purple-800
              "
            >
              <div className="p-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="
                    h-[240px]
                    w-full
                    rounded-[24px]
                    object-cover
                  "
                />

                <p
                  className="
                    mt-6
                    text-xs
                    uppercase
                    tracking-widest
                    text-zinc-500
                    transition-colors
                    group-hover:text-purple-100
                  "
                >
                  {course.category}
                </p>

                <h3
                  className="
                    mt-3
                    min-h-[80px]
                    text-3xl
                    font-semibold
                    leading-tight
                    text-white
                  "
                >
                  {course.title}
                </h3>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        h-10
                        w-10
                        rounded-full
                        bg-purple-500
                      "
                    />

                    <span
                      className="
                        text-sm
                        text-zinc-300
                        transition-colors
                        group-hover:text-white
                      "
                    >
                      {course.instructor}
                    </span>
                  </div>

                  <span
                    className="
                      text-sm
                      text-zinc-400
                      transition-colors
                      group-hover:text-white
                    "
                  >
                    {course.sessions}
                  </span>
                </div>

                <div className="mt-8 md:flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-white">
                        {course.price}
                      </span>

                      <span
                        className="
                          text-lg
                          text-zinc-500
                          line-through
                          transition-colors
                          group-hover:text-purple-200
                        "
                      >
                        {course.oldPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    className="
                      rounded-full
                      bg-purple-600
                      px-8
                      py-4
                      font-medium
                      text-white
                      transition-all
                      duration-300
                      hover:scale-105
                      mt-4
                      md:mt-0
                      group-hover:bg-white
                      group-hover:text-purple-700
                    "
                  >
                    Notify Me
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No courses found
            </h3>

            <p className="mt-2 text-zinc-400">
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
