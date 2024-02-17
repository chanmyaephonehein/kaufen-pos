import * as React from "react";
import { useState } from "react";
import { Divider, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface QuestionAnswer {
  question: string;
  answer: string;
}

const questionAnswer: QuestionAnswer[] = [
  {
    question: "Why are you gay?",
    answer: "I am not gay.",
  },
  {
    question: "Mama or nyimalay?",
    answer: "Mama",
  },
  { question: "Do you love GUSTO?", answer: "No, I don't" },
  { question: "Do you love me?", answer: "Why not?" },
  { question: "JavaScript or TypeScript?", answer: "TypeScript" },
];

export const Icon = ({ question, answer }: QuestionAnswer) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <Divider style={{ backgroundColor: "gray" }} />
      <div className="flex justify-between">
        <p className="text-lg">{question}</p>
        <IconButton
          style={{ color: "white" }}
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <p className={open ? "text-gray-300 text-md" : "hidden"}>{answer}</p>
    </div>
  );
};

const Faq = () => {
  return (
    <div className="xl:mx-80 lg:mx-64 sm:mx-24 mx-8  text-white py-20">
      <p className="text-2xl md:text-3xl font-bold mb-10">
        Frequent asked questions
      </p>
      <div className="flex flex-col gap-4">
        {questionAnswer.map((item: QuestionAnswer) => (
          <div key={item.answer}>
            <Icon question={item.question} answer={item.answer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
