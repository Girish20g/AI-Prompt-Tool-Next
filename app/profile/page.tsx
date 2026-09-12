"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MainPrompt } from "@utils/typeDefinitions/promptType";

const MyProfile = () => {
  const [prompts, setPrompts] = useState<MainPrompt[]>([]);
  const [promptToDelete, setPromptToDelete] = useState<MainPrompt | null>(null);
  const [deletingPromptId, setDeletingPromptId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const userId = (session?.user as any)?.id;
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/users/${userId}/prompts`,
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Failed to fetch profile prompts");

        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [session, status]);

  const handleEdit = (prompt: MainPrompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: MainPrompt) => {
    setDeleteError("");
    setPromptToDelete(prompt);
  };

  const confirmDelete = async () => {
    if (!promptToDelete) return;

    setDeletingPromptId(promptToDelete._id);
    setDeleteError("");
    try {
      const response = await fetch(`/api/prompt/${promptToDelete._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete prompt");
      }

      setPrompts((currentPrompts) =>
        currentPrompts.filter((prompt) => prompt._id !== promptToDelete._id)
      );
      setPromptToDelete(null);
    } catch (error) {
      console.error(error);
      setDeleteError("We could not delete this prompt. Please try again.");
    } finally {
      setDeletingPromptId(null);
    }
  };
  return (
    <>
      <Profile
        name="My"
        desc="Welcome to my Personilized Profile."
        data={prompts}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {promptToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deletingPromptId) {
              setPromptToDelete(null);
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-prompt-title"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600">
              <span className="text-xl font-bold">!</span>
            </div>
            <h2 id="delete-prompt-title" className="text-xl font-semibold text-gray-900">
              Delete this prompt?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              This will permanently remove the prompt from your profile. This action cannot be undone.
            </p>
            {deleteError && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {deleteError}
              </p>
            )}
            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                className="outline_btn"
                disabled={Boolean(deletingPromptId)}
                onClick={() => setPromptToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full border border-red-600 bg-red-600 px-5 py-1.5 text-sm text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={Boolean(deletingPromptId)}
                onClick={confirmDelete}
              >
                {deletingPromptId ? "Deleting..." : "Delete prompt"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
