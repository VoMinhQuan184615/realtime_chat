import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">shadcn/ui Demo</h1>
          <p className="text-slate-400">Real-time Chat Frontend</p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-8 space-y-6">
          {/* Button Demo */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              Button Component
            </h2>
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={() => setCount(count + 1)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Count: {count}
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-200"
              >
                Secondary
              </Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700"></div>

          {/* Input Demo */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              Input Component
            </h2>
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
            <p className="text-sm text-slate-400">
              Message: {message || "(empty)"}
            </p>
          </div>

          {/* Stats */}
          <div className="border-t border-slate-700 pt-6">
            <h2 className="text-lg font-semibold text-white mb-3">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700 rounded p-4">
                <p className="text-slate-400 text-sm">Button Clicks</p>
                <p className="text-2xl font-bold text-white">{count}</p>
              </div>
              <div className="bg-slate-700 rounded p-4">
                <p className="text-slate-400 text-sm">Message Length</p>
                <p className="text-2xl font-bold text-white">
                  {message.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>shadcn/ui is ready for your real-time chat app! 🚀</p>
        </div>
      </div>
    </div>
  );
}

export default App;
