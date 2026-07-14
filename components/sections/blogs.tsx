"use client";

import { CalendarDays, ArrowUpRight, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Blogs({ data }: { data: any }) {
  if (!data) return null;
  const featured = data.featuredBlog;
  const centerBlogs = data.centerBlogs || [];
  const sideBlogs = data.sideBlogs || [];

  return (
    <section id="blogs" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 px-5 py-2">
            <div className="h-2 w-2 rounded-full bg-purple-500" />

            <span className="text-sm uppercase tracking-wider text-zinc-300">
              {data.badgeText}
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-bold text-white">
            {data.heading1}{" "}
            <span className="text-purple-500">{data.heading2}</span>
          </h2>

          <p className="mt-5 text-zinc-400">{data.description}</p>
        </div>

        {/* Content */}

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Featured Blog */}

          <motion.div whileHover={{ y: -8 }} className="space-y-5">
            <div className="overflow-hidden rounded-[32px]">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-[420px] w-full object-cover transition duration-700 hover:scale-110"
              />
            </div>

            <div className="rounded-[32px] border border-zinc-800 bg-[#111111] p-8">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-purple-700 px-4 py-2 text-sm text-white">
                  <User className="mr-2 inline h-4 w-4" />
                  {featured.author}
                </span>

                <span className="rounded-full bg-purple-700 px-4 py-2 text-sm text-white">
                  <CalendarDays className="mr-2 inline h-4 w-4" />
                  {featured.date}
                </span>
              </div>

              <h3 className="mt-6 text-4xl font-semibold text-white">
                {featured.title}
              </h3>

              <p className="mt-5 text-zinc-400">{featured.excerpt}</p>

              <Link
                href={featured.link}
                className="mt-8 flex items-center gap-2 text-xl text-white"
              >
                Read More
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Center Blogs */}

          <div className="space-y-6">
            {centerBlogs.map(
              (
                blog: {
                  category: string;
                  image: string;
                  title: string;
                  date: string;
                  excerpt: string;
                  link: string;
                },
                index: number,
              ) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-[32px] border border-zinc-800 bg-[#111111]"
                >
                  <div className="relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-[260px] w-full object-cover"
                    />

                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {blog.title}
                    </h3>

                    <Link
                      href={blog?.link}
                      className="mt-4 flex items-center gap-2 text-white"
                    >
                      Read More
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ),
            )}
          </div>

          {/* Side Blogs */}

          <div className="space-y-6">
            {sideBlogs.map(
              (
                blog: {
                  title: string;
                  date: string;
                  excerpt: string;
                  link: string;
                },
                index: number,
              ) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="rounded-[32px] border border-zinc-800 bg-[#111111] p-7"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-4 py-2 text-sm text-white">
                    <CalendarDays className="h-4 w-4" />
                    {blog.date}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {blog.title}
                  </h3>

                  <p className="mt-4 text-zinc-400">{blog.excerpt}</p>

                  <Link
                    href={blog?.link}
                    className="mt-6 flex items-center gap-2 text-white"
                  >
                    Read More
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
