"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MainPrompt } from "@utils/typeDefinitions/promptType";

const MyProfile = () => {
  const [prompts, setPrompts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${(session?.user as any).id}/prompts`
      );
      const data = await response.json();
      setPrompts(data);
    };
    if ((session?.user as any).id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (prompt: MainPrompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: MainPrompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this Prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });

        const fileteredPrompts = prompts.filter(
          (p: MainPrompt) => p._id !== prompt._id
        );
        setPrompts(fileteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to my Personilized Profile."
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
