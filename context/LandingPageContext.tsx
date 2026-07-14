"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const LandingPageContext = createContext<any>(null);

export function LandingPageProvider({ children }: { children: ReactNode }) {
  const [landingData, setLandingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          heroSnap,
          statsSnap,
          whyUsSnap,
          testimonialsSnap,
          blogsSnap,
          coursesSnap,
          faqSnap,
        ] = await Promise.all([
          getDoc(doc(db, "hero", "main")),
          getDoc(doc(db, "stats", "main")),
          getDoc(doc(db, "whyus", "main")),
          getDoc(doc(db, "testimonials", "main")),
          getDoc(doc(db, "blogs", "main")),
          getDocs(collection(db, "courses")),
          getDocs(collection(db, "faqs")),
        ]);

        const courses = coursesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const faqs = faqSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLandingData({
          hero: heroSnap.exists() ? heroSnap.data() : null,
          stats: statsSnap.exists() ? statsSnap.data() : null,
          whyUs: whyUsSnap.exists() ? whyUsSnap.data() : null,
          testimonials: testimonialsSnap.exists()
            ? testimonialsSnap.data()
            : null,
          blogs: blogsSnap.exists() ? blogsSnap.data() : null,

          courses,
          faqs,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <LandingPageContext.Provider
      value={{
        landingData,
        loading,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
}

export function useLandingPage() {
  const context = useContext(LandingPageContext);

  if (!context) {
    throw new Error("useLandingPage must be used within LandingPageProvider");
  }

  return context;
}
