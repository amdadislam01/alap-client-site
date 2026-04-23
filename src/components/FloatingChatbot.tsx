"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
};

const predefinedQA: Record<string, string> = {
  "What is ALAP?": "ALAP (Assignment & Learning Analytics Platform) is a platform that bridges the gap between instruction and evaluation, providing AI-driven insights for educators and students.",
  "How do I submit an assignment?": "To submit an assignment, log in to your student dashboard, navigate to your pending assignments, and click the 'Submit' button to upload your work or paste your code.",
  "How does AI evaluation work?": "ALAP integrates Google Gemini AI to analyze assignment submissions, providing instructors with automated feedback, grading suggestions, and plagiarism detection to speed up the review process.",
  "Can I check my grades?": "Yes! Once an instructor evaluates and publishes the results, you can view your grades and detailed feedback from your student dashboard.",
  "Who is this platform for?": "ALAP is designed for educational institutions, helping both instructors manage and evaluate coursework efficiently, and students to track their academic progress.",
};

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I am the ALAP AI Assistant. How can I help you today? You can ask me anything about the platform.",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate AI thinking and reply
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have an exact answer for that. Please try asking one of the suggested questions or contact support.";
      
      // Check for exact matches in predefined Q&A
      if (predefinedQA[text]) {
        botResponse = predefinedQA[text];
      } else {
        // Simple keyword matching for fallback
        const lowerText = text.toLowerCase();
        if (lowerText.includes("submit") || lowerText.includes("upload")) {
          botResponse = predefinedQA["How do I submit an assignment?"];
        } else if (lowerText.includes("ai") || lowerText.includes("evaluate") || lowerText.includes("grading")) {
          botResponse = predefinedQA["How does AI evaluation work?"];
        } else if (lowerText.includes("grade") || lowerText.includes("result") || lowerText.includes("marks")) {
          botResponse = predefinedQA["Can I check my grades?"];
        } else if (lowerText.includes("what is") || lowerText.includes("about")) {
          botResponse = predefinedQA["What is ALAP?"];
        } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
          botResponse = "Hello there! How can I assist you with the ALAP platform today?";
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botResponse, sender: "bot" },
      ]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 bg-white/95 backdrop-blur-md dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "500px", maxHeight: "80vh" }}
          >
            {/* Header */}
            <div className="gradient-bg p-4 flex justify-between items-center text-white shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-inner">
                  <Bot size={24} className="text-white drop-shadow-sm" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">ALAP Assistant</h3>
                  <p className="text-xs text-[#EBF4F6] flex items-center gap-1.5 opacity-90">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50 custom-scrollbar flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      msg.sender === "user"
                        ? "gradient-bg text-white"
                        : "bg-white border border-[#09637E]/20 text-[#09637E] dark:bg-slate-800 dark:border-slate-700 dark:text-[#7AB2B2]"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "gradient-bg text-white rounded-tr-none"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Suggested Questions - Always visible at the bottom of the chat */}
              <div className="mt-2 mb-2 flex flex-col gap-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium px-1">
                  Suggested Questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(predefinedQA).map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-left px-3 py-2 bg-white dark:bg-slate-800 border border-[#09637E]/20 dark:border-slate-700 text-[#09637E] dark:text-[#7AB2B2] text-xs rounded-xl hover:bg-[#09637E]/5 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow active:scale-95 flex-grow sm:flex-grow-0"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              
              <div ref={messagesEndRef} />
            </div>



            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 z-10">
              <div className="flex gap-2 items-center bg-slate-50 dark:bg-slate-800/50 rounded-full p-1 pl-4 border border-slate-200 dark:border-slate-700 focus-within:border-[#09637E]/50 focus-within:ring-2 focus-within:ring-[#09637E]/10 transition-all shadow-inner">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 rounded-full gradient-bg text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:scale-105 transition-all active:scale-95 shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 gradient-bg flex items-center justify-center rounded-full shadow-[0_10px_25px_-5px_rgba(9,99,126,0.5)] hover:shadow-[0_20px_25px_-5px_rgba(9,99,126,0.4)] relative group"
            aria-label="Open AI Assistant"
          >
            <Bot size={36} className="text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AB2B2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#088395] border-2 border-white dark:border-slate-900"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
