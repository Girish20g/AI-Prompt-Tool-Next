"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { useRouter, useSearchParams } from "next/navigation";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const [prompts, setPrompts] = useState([]);
  const searchParams = useSearchParams();
  const username: string = searchParams.get("name") ?? "";
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/prompts`);
      const data = await response.json();
      setPrompts(data);
    };
    if (params.id) {
      fetchPosts();
    }
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={prompts}
    />
  );
};

export default UserProfile;
