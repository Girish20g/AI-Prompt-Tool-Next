import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest } from "next/server";

interface Params {
  id: string;
}

//GET (read)
export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    await connectToDb();

    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

//PATCH (update)
export const PATCH = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDb();

    let existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//DELETE (delete)

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    await connectToDb();

    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};