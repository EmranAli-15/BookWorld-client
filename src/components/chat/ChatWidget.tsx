"use client";

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react'; // Install lucide-react for icons
const bot_profile = "https://cdn.create.vista.com/api/media/small/176577870/stock-vector-cute-smiling-funny-robot-chat-bot"

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);




    const bottomRef = useRef<any>(null);
    const [messages, setMessages] = useState<any>([]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages,isOpen]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        setMessages((prev: any) => [...prev, { role: "user", text: message }]);

        // const res = await gemini_api({ message, history });

        setMessages((prev: any) => [...prev, { role: "model", text: "I'n book world bot. need any help" }]);
        setMessage("")
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
                    {/* Header */}
                    <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">Book World Agent</h3>
                            <p className="text-xs opacity-80">Powered by RAG</p>
                        </div>
                        <button onClick={toggleChat} className="hover:bg-blue-700 p-1 rounded">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
                        <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-[80%] self-start text-sm">
                            Hello! Looking for a specific book today?
                        </div>


                        {
                            messages?.map((mes: any, idx: any) => {
                                return (
                                    mes.role == "model" ? <div key={idx} className="flex items-start gap-2">
                                        <img
                                            src={bot_profile}
                                            alt="avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-xs">
                                            {mes.text}
                                        </div>
                                    </div> :
                                        <div key={idx} className="flex justify-end">
                                            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs">
                                                {mes.text}
                                            </div>
                                        </div>
                                )
                            })
                        }

                        <div ref={bottomRef} />

                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white flex gap-2">
                        <textarea
                            rows={1}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask about books..."
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Action Button (The Icon) */}
            <button
                onClick={toggleChat}
                className={`${isOpen ? 'rotate-90 bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'
                    } p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer`}
            >
                {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
            </button>
        </div>
    );
};

export default ChatWidget;