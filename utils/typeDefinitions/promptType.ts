export interface PromtType {
  prompt: string;
  tag: string;
}

export interface Creator {
  email: string;
  username: string;
  image: string;
  _id: string;
}

export interface MainPrompt {
  creator: Creator;
  prompt: string;
  tag: string;
  _id: string;
}
