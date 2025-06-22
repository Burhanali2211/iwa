import { Bell } from 'lucide-react';

const Reminders = () => {
  return (
    <div className="bg-surface p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-foreground mb-4">Reminders</h3>
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold text-green-800">Meeting with Arc Company</p>
          <p className="text-sm text-green-700">Time: 02:00 pm - 04:00 pm</p>
          <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Start Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reminders; 