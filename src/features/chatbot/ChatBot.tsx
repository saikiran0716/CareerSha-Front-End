import React, { useState, useRef, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import { chatWithCounselor, ChatResponse, ChatHistoryItem } from '../../services/aiService';
import { StudentProfile } from '../../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; uri: string }[];
}

interface Props {
  profile: StudentProfile;
  initialMessage?: string | null;
  onMessageProcessed?: () => void;
}

const ChatBot: React.FC<Props> = ({ profile, initialMessage, onMessageProcessed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am CareerSha's Lead AI Counselor. I have access to real-time admission and exam data. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const conversationSummaryRef = useRef<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (customMessage?: string) => {
    const userMsg = customMessage || input;
    if (!userMsg.trim() || isLoading) return;

    if (!customMessage) setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    setIsOpen(true);

    try {
      // Keep only the last 4 messages as live history to save tokens
      const HISTORY_WINDOW = 4;
      const liveMessages = messages.slice(-HISTORY_WINDOW);
      const historyForAI: ChatHistoryItem[] = liveMessages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content,
      }));

      // Build compressed summary from messages older than the window (skip initial greeting at index 0)
      const olderMessages = messages.slice(1, messages.length - HISTORY_WINDOW + 1);
      if (olderMessages.length >= 2) {
        const summaryLines: string[] = [];
        for (let i = 0; i < olderMessages.length - 1; i += 2) {
          const u = olderMessages[i];
          const a = olderMessages[i + 1];
          if (u && a) {
            summaryLines.push(
              `Q: ${u.content.substring(0, 100).replace(/\n/g, ' ')} | A: ${a.content
                .replace(/[#*`_]/g, '')
                .substring(0, 150)
                .replace(/\n/g, ' ')}`,
            );
          }
        }
        conversationSummaryRef.current = summaryLines.join('\n');
      }

      const chatResponse: ChatResponse = await chatWithCounselor(
        historyForAI,
        userMsg,
        profile,
        conversationSummaryRef.current,
      );

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: chatResponse.text,
          sources: chatResponse.sources,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error connecting to AI. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Keep the latest callbacks without re-running the effect when they change
  const handleSendRef = useRef(handleSend);
  handleSendRef.current = handleSend;
  const onMessageProcessedRef = useRef(onMessageProcessed);
  onMessageProcessedRef.current = onMessageProcessed;

  // Open the chat and send a message when another part of the app asks the AI something
  useEffect(() => {
    if (initialMessage) {
      setIsOpen(true);
      const timeout = setTimeout(() => {
        handleSendRef.current(initialMessage);
        onMessageProcessedRef.current?.();
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [initialMessage]);

  const renderMarkdown = (content: string) => {
    const html = marked.parse(content);
    return { __html: html };
  };

  const normalizeSourceUri = (uri: string) => {
    if (!uri) return '#';
    if (uri.startsWith('http://') || uri.startsWith('https://')) return uri;
    return `${window.location.origin}${uri.startsWith('/') ? uri : `/${uri}`}`;
  };

  return (
    <>
      <style>{`
        .chat-scroll-container::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
        }
        .chat-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }
        /* Hide scrollbar buttons (arrows) */
        .chat-scroll-container::-webkit-scrollbar-button {
          display: none;
        }
      `}</style>

      <div
        className={`fixed z-[9999] transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1) ${
          isOpen
            ? 'bottom-2 right-2 sm:bottom-10 sm:right-10 w-[260px] sm:w-[340px] max-w-[calc(100%-1rem)] h-[340px] sm:h-[450px] max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-8rem)]'
            : 'bottom-4 right-4 sm:bottom-10 sm:right-10 w-auto h-auto'
        }`}
      >
        {isOpen ? (
          <div className="flex flex-col h-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-[1.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 dark:border-neutral-700 ring-1 ring-black/5 dark:ring-white/5 animate-scaleIn origin-bottom-right transition-all duration-500">
            {/* Header */}
            <div className="px-5 py-3.5 bg-white/50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary-50 dark:bg-secondary-900/30 rounded-full flex items-center justify-center border border-secondary-100 dark:border-secondary-800">
                  <svg
                    className="w-4 h-4 text-secondary-600 dark:text-secondary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <span className="font-bold block text-sm text-neutral-900 dark:text-white leading-tight">
                    CareerSha
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="block w-1.5 h-1.5 rounded-full bg-success-500"></span>
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Assistant</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Close Button only */}

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  aria-label="Close chat"
                  className="w-8 h-8 flex items-center justify-center hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded-full transition-colors text-neutral-500 hover:text-danger-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-5 bg-neutral-50/30 dark:bg-neutral-950/30 scroll-smooth chat-scroll-container"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-neutral-800 border border-secondary-100 dark:border-secondary-900 flex-shrink-0 mr-2 mt-1 flex items-center justify-center text-secondary-600 dark:text-secondary-400 text-xs font-bold shadow-sm">
                      C
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] p-3 shadow-sm relative text-sm ${
                      msg.role === 'user'
                        ? 'bg-secondary-600 text-white rounded-2xl rounded-br-sm'
                        : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded-2xl rounded-bl-sm border border-neutral-100 dark:border-neutral-800'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <>
                        <div
                          className="prose prose-sm dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-[13px] leading-5"
                          dangerouslySetInnerHTML={renderMarkdown(msg.content)}
                        />
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-2 animate-fade">
                            {msg.sources.map((src, idx) => (
                              <a
                                key={idx}
                                href={normalizeSourceUri(src.uri)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-bold text-secondary-600 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-900/20 px-2 py-1 rounded-md hover:bg-secondary-600 hover:text-white transition-all flex items-center gap-1"
                              >
                                <span className="truncate max-w-[120px]">{src.title || `Source ${idx + 1}`}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start items-center gap-2 animate-fade pl-8">
                  <div className="bg-white dark:bg-neutral-900 px-3 py-2 rounded-2xl rounded-bl-sm border border-neutral-100 dark:border-neutral-800 flex gap-1 items-center shadow-sm">
                    <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-t border-neutral-100 dark:border-neutral-800 shrink-0">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  placeholder="Ask CareerSha..."
                  className="flex-1 text-sm bg-neutral-50 dark:bg-neutral-950/50 border-neutral-200 dark:border-neutral-800 border rounded-[1rem] px-3 py-2.5 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 text-neutral-900 dark:text-white placeholder:text-neutral-400 resize-none max-h-[80px] min-h-[40px] transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-secondary-600 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 text-white rounded-full hover:bg-secondary-700 transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
                >
                  <svg
                    className="w-4 h-4 transform -rotate-45 translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI career assistant chat"
            className="group relative bg-secondary-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg shadow-secondary-500/30 hover:bg-secondary-700 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center z-[9999]"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-success-500 border-2 border-white dark:border-neutral-900 rounded-full animate-pulse"></div>
          </button>
        )}
      </div>
    </>
  );
};

export default ChatBot;
