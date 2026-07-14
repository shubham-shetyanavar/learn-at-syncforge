"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface CenterBlog {
  title: string;
  image: string;
  category: string;
  link: string;
  content: string;
}

interface SideBlog {
  title: string;
  excerpt: string;
  date: string;
  link: string;
  content: string;
}

interface FeaturedBlog {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  link: string;
  content: string;
}

interface BlogsData {
  badgeText: string;
  heading1: string;
  heading2: string;
  description: string;

  featuredBlog: FeaturedBlog;

  centerBlogs: CenterBlog[];

  sideBlogs: SideBlog[];
}

const initialState: BlogsData = {
  badgeText: "",
  heading1: "",
  heading2: "",
  description: "",

  featuredBlog: {
    title: "",
    excerpt: "",
    image: "",
    author: "",
    date: "",
    link: "",
    content: "",
  },

  centerBlogs: [
    {
      title: "",
      image: "",
      category: "",
      link: "",
      content: "",
    },
    {
      title: "",
      image: "",
      category: "",
      link: "",
      content: "",
    },
  ],

  sideBlogs: [
    {
      title: "",
      excerpt: "",
      date: "",
      link: "",
      content: "",
    },
    {
      title: "",
      excerpt: "",
      date: "",
      link: "",
      content: "",
    },
    {
      title: "",
      excerpt: "",
      date: "",
      link: "",
      content: "",
    },
  ],
};

export default function BlogsForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<BlogsData>(initialState);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const snap = await getDoc(doc(db, "blogs", "main"));

      if (snap.exists()) {
        setForm(snap.data() as BlogsData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveBlogs = async () => {
    try {
      setLoading(true);

      await setDoc(doc(db, "blogs", "main"), form);

      alert("Blogs Saved");
    } catch (err) {
      console.log(err);
      alert("Error Saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="grid gap-5">
        <input
          value={form.badgeText}
          onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
          placeholder="Badge Text"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.heading1}
          onChange={(e) => setForm({ ...form, heading1: e.target.value })}
          placeholder="Heading Part 1"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.heading2}
          onChange={(e) => setForm({ ...form, heading2: e.target.value })}
          placeholder="Heading Highlight"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <h2 className="mt-6 text-xl font-bold">Featured Blog</h2>

        <input
          value={form.featuredBlog.title}
          onChange={(e) =>
            setForm({
              ...form,
              featuredBlog: {
                ...form.featuredBlog,
                title: e.target.value,
              },
            })
          }
          placeholder="Title"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <textarea
          rows={3}
          value={form.featuredBlog.excerpt}
          onChange={(e) =>
            setForm({
              ...form,
              featuredBlog: {
                ...form.featuredBlog,
                excerpt: e.target.value,
              },
            })
          }
          placeholder="Excerpt"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.featuredBlog.image}
          onChange={(e) =>
            setForm({
              ...form,
              featuredBlog: {
                ...form.featuredBlog,
                image: e.target.value,
              },
            })
          }
          placeholder="Image URL"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.featuredBlog.author}
          onChange={(e) =>
            setForm({
              ...form,
              featuredBlog: {
                ...form.featuredBlog,
                author: e.target.value,
              },
            })
          }
          placeholder="Author"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.featuredBlog.date}
          onChange={(e) =>
            setForm({
              ...form,
              featuredBlog: {
                ...form.featuredBlog,
                date: e.target.value,
              },
            })
          }
          placeholder="Date"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <input
          value={form.featuredBlog.link}
          onChange={(e) =>
            setForm({
              ...form,
              featuredBlog: {
                ...form.featuredBlog,
                link: e.target.value,
              },
            })
          }
          placeholder="/blog/react-interview-questions"
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Blog Content
          </label>

          <RichTextEditor
            value={form.featuredBlog.content}
            onChange={(content) =>
              setForm({
                ...form,
                featuredBlog: {
                  ...form.featuredBlog,
                  content,
                },
              })
            }
          />
        </div>
        <h2 className="mt-6 text-xl font-bold">Center Blogs</h2>

        {form.centerBlogs.map((blog, index) => (
          <div key={index} className="rounded-xl border border-zinc-700 p-4">
            <input
              value={blog.title}
              onChange={(e) => {
                const updated = [...form.centerBlogs];
                updated[index].title = e.target.value;

                setForm({
                  ...form,
                  centerBlogs: updated,
                });
              }}
              placeholder="Title"
              className="mb-3 w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <input
              value={blog.image}
              onChange={(e) => {
                const updated = [...form.centerBlogs];
                updated[index].image = e.target.value;

                setForm({
                  ...form,
                  centerBlogs: updated,
                });
              }}
              placeholder="Image"
              className="mb-3 w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <input
              value={blog.category}
              onChange={(e) => {
                const updated = [...form.centerBlogs];
                updated[index].category = e.target.value;

                setForm({
                  ...form,
                  centerBlogs: updated,
                });
              }}
              placeholder="Category"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <input
              value={blog.link}
              onChange={(e) => {
                const updated = [...form.centerBlogs];

                updated[index].link = e.target.value;

                setForm({
                  ...form,
                  centerBlogs: updated,
                });
              }}
              placeholder="/blog/my-blog-url"
              className="mt-3 w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <div className="mt-3">
              <RichTextEditor
                value={blog.content}
                onChange={(content) => {
                  const updated = [...form.centerBlogs];

                  updated[index].content = content;

                  setForm({
                    ...form,
                    centerBlogs: updated,
                  });
                }}
              />
            </div>
          </div>
        ))}

        <h2 className="mt-6 text-xl font-bold">Side Blogs</h2>

        {form.sideBlogs.map((blog, index) => (
          <div key={index} className="rounded-xl border border-zinc-700 p-4">
            <input
              value={blog.title}
              onChange={(e) => {
                const updated = [...form.sideBlogs];
                updated[index].title = e.target.value;

                setForm({
                  ...form,
                  sideBlogs: updated,
                });
              }}
              placeholder="Title"
              className="mb-3 w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <textarea
              rows={3}
              value={blog.excerpt}
              onChange={(e) => {
                const updated = [...form.sideBlogs];
                updated[index].excerpt = e.target.value;

                setForm({
                  ...form,
                  sideBlogs: updated,
                });
              }}
              placeholder="Excerpt"
              className="mb-3 w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <input
              value={blog.date}
              onChange={(e) => {
                const updated = [...form.sideBlogs];
                updated[index].date = e.target.value;

                setForm({
                  ...form,
                  sideBlogs: updated,
                });
              }}
              placeholder="Date"
              className="w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <input
              value={blog.link}
              onChange={(e) => {
                const updated = [...form.sideBlogs];

                updated[index].link = e.target.value;

                setForm({
                  ...form,
                  sideBlogs: updated,
                });
              }}
              placeholder="/blog/my-blog-url"
              className="mt-3 w-full rounded-xl border border-zinc-700 bg-black p-4"
            />

            <div className="mt-3">
              <RichTextEditor
                value={blog.content}
                onChange={(content) => {
                  const updated = [...form.sideBlogs];

                  updated[index].content = content;

                  setForm({
                    ...form,
                    sideBlogs: updated,
                  });
                }}
              />
            </div>
          </div>
        ))}

        <Button onClick={saveBlogs} disabled={loading} className="mt-6">
          {loading ? "Saving..." : "Save Blogs"}
        </Button>
      </div>
    </div>
  );
}
