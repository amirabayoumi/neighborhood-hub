"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    // Simple validation
    if (formData.name.trim().length < 2) {
      return setStatus("Please enter a valid name.");
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return setStatus("Please enter a valid email.");
    }
    if (formData.message.trim().length < 10) {
      return setStatus("Message should be at least 10 characters.");
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent!");
        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("Error sending message. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-dark-purple">
          Get in Touch
        </h1>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-light-purple to-purple-950 bg-clip-text text-transparent">
          We&apos;d Love to Hear From You!
        </h2>
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-700">
          {" "}
          Send us a message and we&apos;ll get back to you as soon as possible.
        </h3>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
            rows={5}
            placeholder="Write your message..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow to-light-purple text-dark-purple py-4 px-6 rounded-xl hover:from-yellow hover:to-yellow hover:text-dark-purple focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            "Sending..."
          ) : (
            <>
              <Send size={18} /> Send Message
            </>
          )}
        </button>

        {status && (
          <div
            className={`mt-4 flex items-center gap-3 p-4 rounded-xl text-sm font-medium ${
              status === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {status === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>
              {status === "success" ? "Message sent successfully!" : status}
            </span>
          </div>
        )}
      </form>
    </div>
  );
}
