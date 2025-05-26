import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
} from "lucide-react";

// Types
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotConfig {
  title: string;
  placeholder: string;
  welcomeMessage: string;
  position: "bottom-right" | "bottom-left" | "embedded";
}

// Mock API service (replace with your actual API)
// 1. Recipe-focused ChatbotService
class ChatbotService {
  static async sendMessage(message: string): Promise<string> {
    // Simulate API call with recipe-focused responses
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    const responses = {
      hello:
        "Hello! I'm your recipe assistant. What would you like to cook today?",
      help: "I can help you with recipes, cooking tips, ingredient substitutions, and meal planning. Try asking about specific dishes or ingredients!",
      pasta:
        "For a quick pasta dish, try aglio e olio: spaghetti with garlic, olive oil, red pepper flakes, and parsley. Cook pasta al dente, sauté minced garlic in olive oil, toss together with pasta water. Simple and delicious!",
      chicken:
        "Chicken is versatile! For juicy baked chicken: season with salt, pepper, garlic powder, and herbs. Bake at 425°F for 20-25 minutes. Internal temp should reach 165°F. Let rest 5 minutes before serving.",
      vegetarian:
        "Great veggie options: Try stuffed bell peppers with quinoa and black beans, or a hearty lentil curry with coconut milk. Both are protein-rich and satisfying!",
      dessert:
        "For a quick dessert, try chocolate mug cake: mix 4 tbsp flour, 4 tbsp sugar, 2 tbsp cocoa powder, 3 tbsp milk, 3 tbsp oil, and a pinch of salt. Microwave for 90 seconds!",
      breakfast:
        "Quick breakfast ideas: overnight oats with berries, avocado toast with everything bagel seasoning, or scrambled eggs with herbs. All ready in minutes!",
      substitution:
        "Common substitutions: 1 egg = 1/4 cup applesauce, 1 cup milk = 1 cup almond milk, 1 cup butter = 3/4 cup olive oil. What ingredient do you need to substitute?",
      time: "For quick meals (under 30 min): stir-fries, pasta dishes, grilled sandwiches, or sheet pan meals. What's your time limit?",
      healthy:
        "Healthy cooking tips: use herbs and spices instead of salt, bake or grill instead of frying, add vegetables to every meal, and choose whole grains over refined ones.",
      default:
        "I'm here to help with all your cooking questions! Ask me about specific recipes, ingredients, cooking techniques, meal planning, or dietary restrictions.",
    };

    const lowerMsg = message.toLowerCase();

    // Check for multiple keywords
    const matchedKey = Object.keys(responses).find((key) => {
      if (key === "default") return false;
      return (
        lowerMsg.includes(key) ||
        (key === "substitution" &&
          (lowerMsg.includes("substitute") || lowerMsg.includes("replace"))) ||
        (key === "time" &&
          (lowerMsg.includes("quick") ||
            lowerMsg.includes("fast") ||
            lowerMsg.includes("minutes"))) ||
        (key === "healthy" &&
          (lowerMsg.includes("diet") || lowerMsg.includes("nutrition")))
      );
    });

    return responses[matchedKey as keyof typeof responses] || responses.default;
  }
}

// Hook for chatbot functionality
const useChatbot = (config: ChatbotConfig) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (config.welcomeMessage && messages.length === 0) {
      setMessages([
        {
          id: "1",
          text: config.welcomeMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [config.welcomeMessage]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await ChatbotService.sendMessage(inputValue);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          error instanceof Error && error.message.includes("API key")
            ? "Configuration error. Please check API settings."
            : "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    isOpen,
    setIsOpen,
    sendMessage,
    handleKeyPress,
  };
};

// Message Component
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div className={`flex items-start gap-2 max-w-xs lg:max-w-md`}>
        {isBot && (
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isBot ? "bg-gray-100 text-gray-800" : "bg-blue-500 text-white"
          }`}
        >
          <p className="text-sm">{message.text}</p>
          <p
            className={`text-xs mt-1 ${
              isBot ? "text-gray-500" : "text-blue-100"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {!isBot && (
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

// Floating Chat Widget Component
const FloatingChatWidget: React.FC<{ config: ChatbotConfig }> = ({
  config,
}) => {
  const chatbot = useChatbot(config);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chatbot.messages]);

  if (!chatbot.isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => chatbot.setIsOpen(true)}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <MessageCircle size={24} className="text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-bg rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-bg text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-semibold">{config.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-blue-600 rounded"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={() => chatbot.setIsOpen(false)}
            className="p-1 hover:bg-blue-600 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {chatbot.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {chatbot.isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatbot.inputValue}
                onChange={(e) => chatbot.setInputValue(e.target.value)}
                onKeyPress={chatbot.handleKeyPress}
                placeholder={config.placeholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={chatbot.isLoading}
              />
              <button
                onClick={chatbot.sendMessage}
                disabled={chatbot.isLoading || !chatbot.inputValue.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Embedded Chat Component
const EmbeddedChat: React.FC<{ config: ChatbotConfig }> = ({ config }) => {
  const chatbot = useChatbot(config);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chatbot.messages]);

  return (
    <div className="w-full h-[600px] bg-bg rounded-lg shadow-lg border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot size={24} />
          <h3 className="text-lg font-semibold">{config.title}</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {chatbot.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {chatbot.isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-bg border-t border-gray-200 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={chatbot.inputValue}
            onChange={(e) => chatbot.setInputValue(e.target.value)}
            onKeyPress={chatbot.handleKeyPress}
            placeholder={config.placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={chatbot.isLoading}
          />
          <button
            onClick={chatbot.sendMessage}
            disabled={chatbot.isLoading || !chatbot.inputValue.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const ChatbotIntegrationDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<"floating" | "embedded">(
    "embedded"
  );

  const floatingConfig: ChatbotConfig = {
    title: "Support Chat",
    placeholder: "Type your message...",
    welcomeMessage: "Hi! I'm here to help. How can I assist you today?",
    position: "bottom-right",
  };

  const embeddedConfig: ChatbotConfig = {
    title: "Customer Support Assistant",
    placeholder: "Ask me anything...",
    welcomeMessage:
      'Welcome! I\'m your AI assistant. Try asking about "help", "pricing", or "support".',
    position: "embedded",
  };

  return (
    <div className="min-h-screen bg-bg p-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Chatbot Integration Demo
          </h1>
          <p className="text-lg text-text mb-6">
            Using a Chatbot with React and TypeScript!
          </p>
          <p className="text-lg text-text mb-6">
            Ask my Chatbot for{" "}
            <span className="font-semibold">Recipe Advice</span> or{" "}
            <span className="font-semibold text-text">Recomendations</span>.
          </p>

          {/* Demo Selector */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveDemo("embedded")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeDemo === "embedded"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Embedded Chat
            </button>
            <button
              onClick={() => setActiveDemo("floating")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeDemo === "floating"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Floating Widget
            </button>
          </div>
        </div>

        {/* Demo Container */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chat Demo */}
          <div>
            {activeDemo === "embedded" ? (
              <EmbeddedChat config={embeddedConfig} />
            ) : (
              <div className="w-full h-[600px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle
                    size={48}
                    className="text-gray-400 mx-auto mb-4"
                  />
                  <p className="text-gray-600 mb-2">Floating widget active</p>
                  <p className="text-sm text-gray-500">
                    Check the bottom-right corner →
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Documentation */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Implementation Guide
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Key Features:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>TypeScript for type safety</li>
                  <li>Custom React hooks for state management</li>
                  <li>Real-time message handling</li>
                  <li>Loading states and error handling</li>
                  <li>Responsive design with Tailwind CSS</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Integration Options:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>
                    <strong>Embedded:</strong> Integrated directly into your
                    page layout
                  </li>
                  <li>
                    <strong>Floating:</strong> Overlay widget that can be
                    toggled
                  </li>
                  <li>
                    <strong>Modal:</strong> Full-screen or centered popup
                    (extendable)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  API Integration:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>
                    Replace <code>ChatbotService</code> with your API
                  </li>
                  <li>Handle authentication and error states</li>
                  <li>Support for streaming responses</li>
                  <li>File uploads and rich media</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Customization:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Theming with Tailwind CSS variables</li>
                  <li>Custom message types and templates</li>
                  <li>Configurable behavior and responses</li>
                  <li>Multi-language support</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-text rounded-lg">
              <h4 className="font-semibold text-card mb-2">Try the Demo:</h4>
              <p className="text-card text-sm">
                Type messages like "hello", "help", "pricing", or "support" to
                see different responses. The chatbot simulates real API calls
                with loading states.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Widget (only shows when floating demo is active) */}
      {activeDemo === "floating" && (
        <FloatingChatWidget config={floatingConfig} />
      )}
    </div>
  );
};

export default ChatbotIntegrationDemo;
