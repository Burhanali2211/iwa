'use client';

import { useState, useEffect } from 'react';

interface ClockProps {
  className?: string;
}

const Clock = ({ className = '' }: ClockProps) => {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return <span className={className}>--:--:--</span>;
  }

  return <span className={className}>{time}</span>;
};

export default Clock;
