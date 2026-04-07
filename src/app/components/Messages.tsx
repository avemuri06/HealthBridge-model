import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Heart, ArrowLeft, Send, Paperclip, Search, Phone, Video, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "provider";
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  providerName: string;
  providerType: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    providerName: "Dr. Sarah Johnson",
    providerType: "Primary Care Physician",
    lastMessage: "Your lab results look good. Let's discuss them in your next appointment.",
    timestamp: "2026-03-29T10:30:00",
    unread: 1,
    messages: [
      {
        id: "1",
        text: "Hi Dr. Johnson, I wanted to ask about my recent lab results.",
        sender: "user",
        timestamp: "2026-03-29T09:00:00",
        read: true
      },
      {
        id: "2",
        text: "Hello! I've reviewed your results. Everything looks within normal range.",
        sender: "provider",
        timestamp: "2026-03-29T10:15:00",
        read: true
      },
      {
        id: "3",
        text: "Your cholesterol is good, and your blood glucose is slightly elevated but nothing concerning.",
        sender: "provider",
        timestamp: "2026-03-29T10:16:00",
        read: true
      },
      {
        id: "4",
        text: "Your lab results look good. Let's discuss them in your next appointment.",
        sender: "provider",
        timestamp: "2026-03-29T10:30:00",
        read: false
      }
    ]
  },
  {
    id: "2",
    providerName: "Maria Rodriguez",
    providerType: "Registered Dietitian",
    lastMessage: "Great! I'll send you the meal plan by tomorrow.",
    timestamp: "2026-03-28T14:45:00",
    unread: 0,
    messages: [
      {
        id: "1",
        text: "Hi Maria! I'd like to get a personalized meal plan for managing my blood sugar.",
        sender: "user",
        timestamp: "2026-03-28T14:00:00",
        read: true
      },
      {
        id: "2",
        text: "Absolutely! I'll work on a plan focused on complex carbs and balanced proteins.",
        sender: "provider",
        timestamp: "2026-03-28T14:30:00",
        read: true
      },
      {
        id: "3",
        text: "That sounds perfect. Thank you!",
        sender: "user",
        timestamp: "2026-03-28T14:40:00",
        read: true
      },
      {
        id: "4",
        text: "Great! I'll send you the meal plan by tomorrow.",
        sender: "provider",
        timestamp: "2026-03-28T14:45:00",
        read: true
      }
    ]
  },
  {
    id: "3",
    providerName: "Dr. Michael Chen",
    providerType: "Cardiologist",
    lastMessage: "See you on April 10th!",
    timestamp: "2026-03-27T16:20:00",
    unread: 0,
    messages: [
      {
        id: "1",
        text: "Dr. Chen, I'd like to schedule a follow-up for my blood pressure.",
        sender: "user",
        timestamp: "2026-03-27T16:00:00",
        read: true
      },
      {
        id: "2",
        text: "Of course! I have availability on April 10th at 11:15 AM. Does that work?",
        sender: "provider",
        timestamp: "2026-03-27T16:15:00",
        read: true
      },
      {
        id: "3",
        text: "Perfect! I'll be there.",
        sender: "user",
        timestamp: "2026-03-27T16:18:00",
        read: true
      },
      {
        id: "4",
        text: "See you on April 10th!",
        sender: "provider",
        timestamp: "2026-03-27T16:20:00",
        read: true
      }
    ]
  },
];

export function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0]
  );
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.providerType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toISOString(),
      read: true
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
          timestamp: newMessage.timestamp
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: messageText,
      timestamp: newMessage.timestamp
    });
    setMessageText("");
  };

  const markAsRead = (conversationId: string) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unread: 0,
          messages: conv.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return conv;
    });
    setConversations(updatedConversations);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              <p className="text-xs text-gray-600">Connect with your healthcare team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversation(conversation);
                    markAsRead(conversation.id);
                  }}
                  className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                    selectedConversation?.id === conversation.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12 bg-blue-600 flex-shrink-0">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {getInitials(conversation.providerName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {conversation.providerName}
                        </h3>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{conversation.providerType}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 truncate flex-1">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="bg-blue-600 text-white ml-2 flex-shrink-0">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 bg-blue-600">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {getInitials(selectedConversation.providerName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedConversation.providerName}
                      </h3>
                      <p className="text-xs text-gray-600">{selectedConversation.providerType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2 max-w-[70%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className={`w-8 h-8 flex-shrink-0 ${message.sender === "user" ? "bg-green-600" : "bg-blue-600"}`}>
                          <AvatarFallback className={message.sender === "user" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                            {message.sender === "user" ? "ME" : getInitials(selectedConversation.providerName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.sender === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-900 border border-gray-200"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${message.sender === "user" ? "text-right" : ""}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Textarea
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 min-h-[44px] max-h-[120px] resize-none"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                      disabled={!messageText.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Messages are typically responded to within 24-48 hours. For urgent matters, please call your provider directly or visit the emergency room.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}