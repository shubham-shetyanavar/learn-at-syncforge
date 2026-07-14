"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Frontend Development Mastery",
    duration: "12 Weeks",
    topics: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"],
  },
  {
    title: "React & Next.js Masterclass",
    duration: "8 Weeks",
    topics: [
      "Advanced React",
      "Server Components",
      "Authentication",
      "Performance",
    ],
  },
  {
    title: "AI For Developers",
    duration: "6 Weeks",
    topics: ["OpenAI", "Prompt Engineering", "RAG", "AI Agents"],
  },
];

export default function Courses() {
  return (
    <section id="courses" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-purple-500">COURSES</span>

          <h2 className="mt-4 text-4xl font-bold">Explore Upcoming Courses</h2>

          <p className="mt-4 text-zinc-400">
            Structured learning programs designed to help you become
            industry-ready.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {courses.map((course) => (
            <motion.div
              key={course.title}
              whileHover={{
                y: -10,
              }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
            >
              <h3 className="text-2xl font-semibold">{course.title}</h3>

              <p className="mt-3 text-sm text-purple-400">{course.duration}</p>

              <ul className="mt-6 space-y-2">
                {course.topics.map((topic) => (
                  <li key={topic} className="text-zinc-400">
                    • {topic}
                  </li>
                ))}
              </ul>

              <Button className="mt-8 w-full">Notify Me</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
