"use client";

import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";

interface Course {
  id?: string;
  category: string;
  title: string;
  image: string;
  instructor: string;
  sessions: string;
  price: string;
  oldPrice: string;
}

interface SectionData {
  badge: string;
  title1: string;
  title2: string;
}

export default function CourseForm() {
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [section, setSection] = useState<SectionData>({
    badge: "",
    title1: "",
    title2: "",
  });

  const [newCourse, setNewCourse] = useState<Course>({
    category: "",
    title: "",
    image: "",
    instructor: "",
    sessions: "",
    price: "",
    oldPrice: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const updateCourse = async () => {
    try {
      if (!editingId) return;

      setLoading(true);

      await updateDoc(doc(db, "courses", editingId), {
        category: newCourse.category,
        title: newCourse.title,
        image: newCourse.image,
        instructor: newCourse.instructor,
        sessions: newCourse.sessions,
        price: newCourse.price,
        oldPrice: newCourse.oldPrice,
      });

      alert("Course Updated");

      setEditingId(null);

      setNewCourse({
        category: "",
        title: "",
        image: "",
        instructor: "",
        sessions: "",
        price: "",
        oldPrice: "",
      });

      loadData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const sectionRef = doc(db, "courseSection", "main");

      const sectionSnap = await getDoc(sectionRef);

      if (sectionSnap.exists()) {
        setSection(sectionSnap.data() as SectionData);
      }

      const querySnap = await getDocs(collection(db, "courses"));

      const list: Course[] = [];

      querySnap.forEach((item) => {
        list.push({
          id: item.id,
          ...(item.data() as Course),
        });
      });

      setCourses(list);
    } catch (error) {
      console.log(error);
    }
  };

  const saveSection = async () => {
    await setDoc(doc(db, "courseSection", "main"), section);

    alert("Section Updated");
  };

  const addCourse = async () => {
    try {
      setLoading(true);

      await addDoc(collection(db, "courses"), newCourse);

      alert("Course Added");

      setNewCourse({
        category: "",
        title: "",
        image: "",
        instructor: "",
        sessions: "",
        price: "",
        oldPrice: "",
      });

      loadData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async (id: string) => {
    await deleteDoc(doc(db, "courses", id));

    loadData();
  };

  const editCourse = (course: Course) => {
    setEditingId(course.id || null);

    setNewCourse({
      category: course.category,
      title: course.title,
      image: course.image,
      instructor: course.instructor,
      sessions: course.sessions,
      price: course.price,
      oldPrice: course.oldPrice,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-10">
      {/* Add Course */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="mb-6 text-2xl font-bold">Add Course</h2>

        <div className="grid gap-4">
          <input
            placeholder="Category"
            value={newCourse.category}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                category: e.target.value,
              })
            }
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                title: e.target.value,
              })
            }
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            placeholder="Image URL"
            value={newCourse.image}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                image: e.target.value,
              })
            }
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            placeholder="Instructor"
            value={newCourse.instructor}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                instructor: e.target.value,
              })
            }
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            placeholder="Sessions"
            value={newCourse.sessions}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                sessions: e.target.value,
              })
            }
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            placeholder="Price"
            value={newCourse.price}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                price: e.target.value,
              })
            }
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          <input
            placeholder="Old Price"
            value={newCourse.oldPrice}
            onChange={(e) =>
              setNewCourse({
                ...newCourse,
                oldPrice: e.target.value,
              })
            }
            className="rounded-xl border border-zinc-700 bg-black p-4"
          />

          {editingId ? (
            <Button onClick={updateCourse} disabled={loading}>
              {loading ? "Updating..." : "Update Course"}
            </Button>
          ) : (
            <Button onClick={addCourse} disabled={loading}>
              {loading ? "Adding..." : "Add Course"}
            </Button>
          )}
        </div>
      </div>

      {/* Existing Courses */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="mb-6 text-2xl font-bold">Existing Courses</h2>

        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between rounded-xl border border-zinc-700 p-4"
            >
              <div>
                <h3 className="font-semibold">{course.title}</h3>

                <p className="text-zinc-400">{course.category}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => editCourse(course)}>
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => removeCourse(course.id!)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
