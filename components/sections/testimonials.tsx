"use client";

import { motion } from "framer-motion";
import { Quote, Star, ArrowUpRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/100?img=1",
    review:
      "The React workshop helped me crack interviews and improve my architecture skills significantly.",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/100?img=5",
    review:
      "The teaching style is practical. Every concept is backed by real-world implementation.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/100?img=8",
    review:
      "Finally found a platform that focuses on actual development rather than just theory.",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    role: "React Developer",
    image: "https://i.pravatar.cc/100?img=9",
    review:
      "The live sessions and mentorship are extremely valuable for working professionals.",
  },
  {
    id: 5,
    name: "Akshay Deshmukh",
    role: "Frontend Engineer",
    image: "https://i.pravatar.cc/100?img=11",
    review:
      "Loved the depth of JavaScript concepts and production-level examples.",
  },
];

export default function Testimonials({ data }: { data: any }) {
  const col1 = [...data.reviews, ...data.reviews];
  const col2 = [...data.reviews, ...data.reviews];
  const col3 = [...data.reviews, ...data.reviews];

  function ReviewCard({ review }: any) {
    return (
      <div
        className="
      relative
      rounded-3xl
      border
      border-zinc-800
      bg-[#111111]
      p-6
      backdrop-blur
    "
      >
        <div className="mb-4 flex gap-1">
          {[...Array(Number(review.rating) || 5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <p className="text-zinc-300 leading-relaxed">"{review.review}"</p>

        <div className="mt-6 flex items-center gap-3">
          {/* <img
            src={review.image}
            alt={review.name}
            className="h-12 w-12 rounded-full"
          /> */}

          <div>
            <h4 className="font-semibold text-white">{review.name}</h4>

            <p className="text-sm text-zinc-400">{review.role}</p>
          </div>
        </div>

        <Quote
          className="
        absolute
        right-4
        top-4
        h-8
        w-8
        text-purple-500/50
      "
        />
      </div>
    );
  }

  return (
    <section id="testimonials" className="py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 px-5 py-2">
            <div className="h-2 w-2 rounded-full bg-purple-500" />

            <span className="text-sm uppercase tracking-wider text-zinc-300">
              Testimonials
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-bold text-white">
            What Our Learners Are{" "}
            <span className="text-purple-500">Saying</span>
          </h2>

          <p className="mt-4 text-zinc-400">
            Real feedback from developers who attended our workshops and
            programs.
          </p>
        </div>

        {/* Marquee Columns */}

        <div className="relative h-[700px] overflow-hidden">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Column 1 */}

            <motion.div
              animate={{ y: [0, -1200] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="space-y-6"
            >
              {col1.map((review, index) => (
                <ReviewCard key={`c1-${index}`} review={review} />
              ))}
            </motion.div>

            {/* Column 2 */}

            <motion.div
              animate={{ y: [-1200, 0] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="space-y-6"
            >
              {col2.map((review, index) => (
                <ReviewCard key={`c2-${index}`} review={review} />
              ))}
            </motion.div>

            {/* Column 3 */}

            <motion.div
              animate={{ y: [0, -1200] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="space-y-6"
            >
              {col3.map((review, index) => (
                <ReviewCard key={`c3-${index}`} review={review} />
              ))}
            </motion.div>
          </div>

          {/* Top Fade */}

          <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#2d2d2d] to-transparent" />

          {/* Bottom Fade */}

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2d2d2d] to-transparent" />
        </div>
      </div>
    </section>
  );
}
