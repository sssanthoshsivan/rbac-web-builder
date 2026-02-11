"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [role, setRole] = useState("editor");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdPage, setCreatedPage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    try {
      setLoading(true);

      const res = await fetch("/api/pages", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          role,
          userId: "user-1",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setCreatedPage(data);
      toast.success("Draft saved successfully");
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if (!createdPage) {
      toast.error("No draft available");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/pages/${createdPage.id}/publish`,
        {
          method: "POST",
          body: JSON.stringify({ role }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setCreatedPage(data);
      toast.success("Page published successfully");
    } catch (err: any) {
      toast.error(err.message || "Publish failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          RBAC Page Builder
        </h1>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Current Role
          </label>
          <select
            className="w-full border rounded-lg p-2 text-gray-800"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">viewer</option>
            <option value="editor">editor</option>
            <option value="admin">admin</option>
            <option value="super-admin">super-admin</option>
          </select>
        </div>

        <div>
          <input
            className="w-full border rounded-lg p-2 text-gray-800"
            placeholder="Page Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <textarea
            className="w-full border rounded-lg p-2 h-40 resize-none text-gray-800"
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            disabled={loading}
            onClick={handleCreate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>

          <button
            disabled={loading}
            onClick={handlePublish}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : "Publish"}
          </button>
        </div>

        {createdPage && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="font-semibold text-lg">
              {createdPage.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Status: {createdPage.status}
            </p>
            <p className="text-gray-700">
              {createdPage.content}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
