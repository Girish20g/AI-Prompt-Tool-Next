"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { MainPrompt } from "@utils/typeDefinitions/promptType";

const PromptCardList = (props: {
  data: any[];
  handleTagClick: (tag: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
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
  const [searchTimeOut, setSearchTimeOut] = useState<any>(null);
  const [searchedPrompts, setSearchedPrompts] = useState<MainPrompt[]>([]);
  const [prompts, setPrompts] = useState<MainPrompt[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    };
    fetchPosts();
  }, []);

  const filterPrompts = (text: string) => {
    const regex = new RegExp(text, "i");

    return prompts.filter(
      (prompt) =>
        regex.test(prompt.creator.username) ||
        regex.test(prompt.tag) ||
        regex.test(prompt.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const filteredPrompts: MainPrompt[] = filterPrompts(e.target.value);
        setSearchedPrompts(filteredPrompts);
      }, 500)
    );
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);

    const filteredPrompts: MainPrompt[] = filterPrompts(tag);
    setSearchedPrompts(filteredPrompts);
  };

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
      <PromptCardList
        data={searchText ? searchedPrompts : prompts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
