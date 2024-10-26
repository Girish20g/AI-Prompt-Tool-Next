"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

const MyProfile = () => {
  const [prompts, setPrompts] = useState([]);
  const { data: session } = useSession();

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

  const handleEdit = () => {};

  const handleDelete = () => {};
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
