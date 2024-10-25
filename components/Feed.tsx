"use client";

import { useState, useEffect, ChangeEvent } from "react";
import PromptCard from "./PromptCard";
import { MainPrompt } from "@utils/typeDefinitions/promptType";

const PromptCardList = (props: { data: any[]; handleTagClick: () => void }) => {
  return (
    <div className="mt-16">
      {props.data.map((prompt: MainPrompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={props.handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [prompts, setPrompts] = useState([]);

  const handleSearchChange = (e: ChangeEvent) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
