"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "How it works", href: "#how" },
  { name: "Courses", href: "#courses" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blogs", href: "#blogs" },
  { name: "FAQ", href: "#faq" },
  { name: "Roadmap", href: "#roadmap" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.replace("#", ""));

      for (const section of sections) {
        const element = document.getElementById(section);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (href: any) => {
    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-300
      `}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div
          className={`
            flex
            items-center
            justify-between
            rounded-full
            border
            px-6
            py-4
            transition-all
            duration-300

            ${
              scrolled
                ? "border-purple-500/20 bg-black/70 backdrop-blur-xl"
                : "border-transparent bg-transparent"
            }
          `}
        >
          {/* Logo */}

          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2"
          >
            <div>
              <h3 className="text-lg font-bold text-white">
                Learn
                <span className="text-purple-500">@SyncForge</span>
              </h3>
            </div>
          </button>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    relative
                    text-sm
                    font-medium
                    transition-colors

                    ${
                      isActive
                        ? "text-purple-500"
                        : "text-zinc-300 hover:text-white"
                    }
                  `}
                >
                  {item.name}

                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="
                        absolute
                        -bottom-2
                        left-0
                        right-0
                        h-[2px]
                        rounded-full
                        bg-purple-500
                      "
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side */}

          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection("#waitlist")}
              className="
                rounded-full
                bg-purple-600
                px-6
                hover:bg-purple-700
              "
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile */}

          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden">
                <Menu className="h-6 w-6 text-white" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="
                border-zinc-800
                bg-black
              "
            >
              <div className="mt-10 flex flex-col gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="
                      text-lg
                      text-zinc-300
                    "
                  >
                    {item.name}
                  </button>
                ))}

                {/* <Button
                  onClick={() => scrollToSection("#waitlist")}
                  className="
                    mt-4
                    rounded-full
                    bg-purple-600
                  "
                >
                  Join Waitlist
                </Button> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
