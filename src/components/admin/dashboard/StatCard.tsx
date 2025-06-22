import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isHighlighted?: boolean;
}

const StatCard = ({ title, value, change, isHighlighted = false }: StatCardProps) => {
  const cardClasses = isHighlighted
    ? 'bg-primary text-white'
    : 'bg-surface text-foreground';

  const textClasses = isHighlighted ? 'text-green-200' : 'text-text-muted';
  
  const iconClasses = isHighlighted ? 'bg-white/20 text-white' : 'bg-background text-text-secondary';

  return (
    <div className={`${cardClasses} p-5 rounded-lg shadow-card`}>
      <div className="flex justify-between items-start">
        <p className={`text-sm font-medium ${textClasses}`}>{title}</p>
        <div className={`p-1.5 rounded-full ${iconClasses}`}>
            <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <p className="text-4xl font-bold mt-2">{value}</p>
      <div className="flex items-center text-sm mt-4">
        <div className={`p-1 rounded-full mr-2 ${isHighlighted ? 'bg-white/20' : 'bg-green-100'}`}>
          <TrendingUp className={`h-4 w-4 ${isHighlighted ? 'text-white' : 'text-green-600'}`} />
        </div>
        <span className={`${textClasses}`}>{change}</span>
      </div>
    </div>
  );
};

export default StatCard; 