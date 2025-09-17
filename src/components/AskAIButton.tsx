"use client";

import { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fragment, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIAboutNotesAction } from "@/actions/notes";
import "@/styles/ai-response.css";

type Props = {
  user: User | null;
};

function AskAIButton({ user }: Props) {
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponse] = useState<string[]>([]);

  const router = useRouter();
  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    }
    if (isOpen) {
      setQuestionText("");
      setQuestions([]);
      setResponse([]);
    }
    setOpen(isOpen);
  };

  console.log(user?.email);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    console.log("Submit AI ");
    if (!questionText.trim()) return;
    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIAboutNotesAction(newQuestions, responses);
      setResponse((prev) => [...prev, response]);

      setTimeout(scrollToBottom, 100);
    });
  };
  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handlekeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary">Ask AI</Button>
        </DialogTrigger>
        <DialogContent
          className="custom-scrollbar flex h-[80vh] max-w-5xl flex-col overflow-y-auto"
          ref={contentRef}
        >
          <DialogHeader>
            <DialogTitle>Ask AI About your Notes</DialogTitle>
            <DialogDescription>
              Our AI can answer question about all your notes
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-8">
            {questions.map((question, index) => (
              <Fragment key={index}>
                <p className="ml-auto max-w-[60%] bg-muted text-muted-foreground rounded-md px-2 py-1 text-sm">
                  {question}
                </p>
                {responses[index] && (
                  <p
                    className="bot-response text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: responses[index] }}
                  />
                )}
              </Fragment>
            ))}
            {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
          </div>

          <div
            className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
            onClick={handleClickInput}
          >
            <Textarea
              ref={textareaRef}
              placeholder="Ask me anything about your notes..."
              className="resize-none rounded-none border-none bg-transparent p-0 shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus ring-offset-0 "
              style={{
                minHeight: "40px",
                lineHeight: "normal",
              }}
              rows={2}
              onInput={handleInput}
              onKeyDown={handlekeyDown}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <Button className="ml-auto size-8 rounded-full">
              <ArrowUpIcon className="text-background"></ArrowUpIcon>
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AskAIButton;
