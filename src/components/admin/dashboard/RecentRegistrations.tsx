import { Plus } from 'lucide-react';

interface Member {
  name: string;
  message: string;
  user: string;
  type: 'user_registered' | 'donation_received';
}

interface RecentRegistrationsProps {
  teamMembers: Member[];
}

const getStatusClasses = (type: Member['type']) => {
  switch (type) {
    case 'user_registered':
      return 'bg-info/20 text-info';
    case 'donation_received':
      return 'bg-success/20 text-success';
  }
};

const RecentRegistrations = ({ teamMembers }: RecentRegistrationsProps) => {
  return (
    <div className="bg-surface p-6 rounded-lg shadow-card col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="flex items-center gap-2 text-sm text-text-secondary border border-border hover:bg-background px-3 py-1.5 rounded-md">
          <Plus className="h-4 w-4" />
          View All
        </button>
      </div>
      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
                <img src={`https://ui-avatars.com/api/?name=${member.user.replace(' ', '+')}&background=random`} alt={member.user} className="h-10 w-10 rounded-full" />
                <div className="ml-4">
                    <p className="font-semibold text-foreground">{member.user}</p>
                    <p className="text-sm text-text-muted">{member.message}</p>
                </div>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClasses(member.type)}`}>
              {member.type === 'user_registered' ? 'New User' : 'Donation'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentRegistrations; 