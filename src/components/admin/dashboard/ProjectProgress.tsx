'use client';

interface ProjectProgressProps {
    percentage: number;
    title: string;
}

const ProjectProgress = ({ percentage, title }: ProjectProgressProps) => {
    const circumference = 2 * Math.PI * 55; // 2 * pi * radius
  
    return (
      <div className="bg-surface p-6 rounded-lg shadow-card flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <defs>
                <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                    <path d="M 0 0 L 0 8 M 4 0 L 4 8" stroke="#a0aec0" strokeWidth="1.5"/>
                </pattern>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="url(#hatch)"
              strokeWidth="10"
            />
            <circle
              className="text-primary"
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (percentage / 100) * circumference}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{percentage}%</span>
            <span className="text-sm text-text-muted">Project Ended</span>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
                <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                <span>Completed</span>
            </div>
            <div className="flex items-center">
                <span className="h-2 w-2 bg-info rounded-full mr-2"></span>
                <span>In Progress</span>
            </div>
            <div className="flex items-center">
                <div className="h-2 w-2 rounded-full mr-2 bg-border" style={{
                    backgroundImage: `repeating-linear-gradient(-45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)`
                }}></div>
                <span>Pending</span>
            </div>
        </div>
      </div>
    );
  };
  
  export default ProjectProgress; 