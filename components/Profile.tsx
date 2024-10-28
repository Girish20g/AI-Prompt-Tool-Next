"use client";

import { MainPrompt } from "@utils/typeDefinitions/promptType";

import React from "react";
import PromptCard from "./PromptCard";
import { capitalizeFirstLetter } from "@utils/helpers";

interface ProfileProps {
  name: string;
  desc: string;
  data: MainPrompt[];
  handleEdit?: (prompt: MainPrompt) => void;
  handleDelete?: (prompt: MainPrompt) => void;
}

const Profile = (props: ProfileProps) => {
  const { name, desc, data, handleEdit, handleDelete } = props;
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {capitalizeFirstLetter(name)} Profile
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((prompt: MainPrompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
