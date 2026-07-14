"use client";

import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import WhyUs from "@/components/sections/why-us";
import Workshops from "@/components/sections/workshops";
import Testimonials from "@/components/sections/testimonials";
import Blogs from "@/components/sections/blogs";
import FAQ from "@/components/sections/faq";
import Roadmap from "@/components/sections/roadmap";
import Footer from "@/components/sections/footer";

import { useLandingPage } from "@/context/LandingPageContext";

export default function HomePage() {
  const { landingData, loading } = useLandingPage();

  console.log("landingData", landingData);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Hero data={landingData?.hero} />

      <Stats data={landingData?.stats} />

      <WhyUs data={landingData?.whyUs} />

      {/* <Courses data={landingData?.courses} /> */}

      <Workshops data={landingData?.courses} />

      <Testimonials data={landingData?.testimonials || []} />

      <Blogs data={landingData?.blogs || []} />

      <FAQ data={landingData?.faqs || []} />

      <Roadmap />

      <Footer />
    </>
  );
}
