'use client';

const ProjectAnalytics = () => {
  const analyticsData = [
    { day: 'S', value: 45, isHatched: true },
    { day: 'M', value: 60, isHatched: false },
    { day: 'T', value: 74, isHatched: false, isCurrent: true },
    { day: 'W', value: 85, isHatched: false },
    { day: 'T', value: 55, isHatched: true },
    { day: 'F', value: 70, isHatched: true },
    { day: 'S', value: 40, isHatched: true },
  ];

  const HatchedBar = () => (
    <div className="w-full h-full bg-green-200" style={{
      backgroundImage: `repeating-linear-gradient(
        -45deg,
        rgba(0,0,0,0.1),
        rgba(0,0,0,0.1) 5px,
        transparent 5px,
        transparent 10px
      ) `
    }}></div>
  );

  return (
    <div className="bg-surface p-6 rounded-lg shadow-card col-span-2">
      <h3 className="text-lg font-semibold text-foreground mb-4">Project Analytics</h3>
      <div className="flex justify-between items-end h-40">
        {analyticsData.map((data, index) => (
          <div key={index} className="flex flex-col items-center w-1/7">
            <div className="relative w-8 h-full flex items-end">
              <div
                className={`w-full rounded-t-lg transition-all duration-500 ${data.isCurrent ? 'bg-green-400' : data.isHatched ? 'bg-transparent' : 'bg-primary'}`}
                style={{ height: `${data.value}%` }}
              >
                {data.isHatched && <HatchedBar />}
                {data.isCurrent && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-0.5 rounded-md">
                        {data.value}%
                    </div>
                )}
              </div>
            </div>
            <span className="text-sm text-text-muted mt-2">{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAnalytics; 