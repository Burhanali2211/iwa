'use client';

import { Pause, Play, Square } from "lucide-react";
import { useEffect, useState } from "react";

const TimeTracker = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="bg-cover bg-center p-6 rounded-lg shadow-card flex flex-col items-center justify-center text-white" style={{backgroundImage: "url('/library.jpg')"}}>
        <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Current Time</h3>
            <p className="font-mono text-5xl font-bold tracking-widest">
                {time.toLocaleTimeString()}
            </p>
            <div className="flex justify-center items-center mt-6 space-x-4">
                <button className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors">
                    <Pause className="h-6 w-6" />
                </button>
                <button className="bg-destructive hover:bg-destructive/90 p-4 rounded-full transition-colors">
                    <Square className="h-6 w-6" />
                </button>
            </div>
      </div>
    </div>
  );
};

export default TimeTracker; 