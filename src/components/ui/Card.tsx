import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'bordered' | 'modern' | 'glass' | 'elevated' | 'pattern';
  hover?: 'lift' | 'glow' | 'scale' | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = 'lift',
  padding = 'md',
  onClick
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white shadow-lg',
    gradient: 'card-gradient',
    bordered: 'card-bordered',
    modern: 'card-modern',
    glass: 'card-glass',
    elevated: 'card-elevated',
    pattern: 'card-pattern shadow-lg'
  };

  const hoverClasses = {
    lift: 'hover-lift',
    glow: 'hover-glow',
    scale: 'hover-scale',
    none: ''
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses[hover],
        paddingClasses[padding],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

// Specialized Card Components
export const FeatureCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href?: string;
  variant?: CardProps['variant'];
  iconColor?: string;
  iconBgColor?: string;
}> = ({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  variant = 'default',
  iconColor = 'text-green-600',
  iconBgColor = 'bg-green-100'
}) => {
  const CardWrapper = href ? 'a' : 'div';
  const cardProps = href ? { href } : {};

  return (
    <CardWrapper {...cardProps}>
      <Card variant={variant} hover="lift" className="h-full">
        <div className="text-center">
          <div className={cn('inline-flex p-3 rounded-full mb-4', iconBgColor)}>
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </Card>
    </CardWrapper>
  );
};

export const StatCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  suffix?: string;
  prefix?: string;
  color?: string;
  bgColor?: string;
  variant?: CardProps['variant'];
}> = ({ 
  icon: Icon, 
  label, 
  value, 
  suffix = '', 
  prefix = '',
  color = 'text-green-600',
  bgColor = 'bg-green-100',
  variant = 'elevated'
}) => {
  return (
    <Card variant={variant} hover="scale" className="text-center">
      <div className={cn('inline-flex p-3 rounded-full mb-4', bgColor)}>
        <Icon className={cn('h-6 w-6', color)} />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {prefix}{value}{suffix}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-medium">
        {label}
      </div>
    </Card>
  );
};

export const EventCard: React.FC<{
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees?: number;
  featured?: boolean;
  image?: string;
  variant?: CardProps['variant'];
}> = ({ 
  title, 
  description, 
  date, 
  time, 
  location, 
  category, 
  attendees,
  featured = false,
  image,
  variant = 'modern'
}) => {
  const getCategoryColor = (cat: string) => {
    const colors = {
      Religious: 'bg-green-100 text-green-800',
      Educational: 'bg-blue-100 text-blue-800',
      Competition: 'bg-purple-100 text-purple-800',
      Service: 'bg-orange-100 text-orange-800',
      Cultural: 'bg-pink-100 text-pink-800'
    };
    return colors[cat as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card 
      variant={featured ? 'elevated' : variant} 
      hover="lift" 
      className={cn('h-full', featured && 'ring-2 ring-green-500 ring-opacity-50')}
    >
      {image && (
        <div className="mb-4 -mx-6 -mt-6">
          <Image
            src={image}
            alt={title}
            width={400}
            height={192}
            className="w-full h-48 object-cover rounded-t-xl"
          />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
          {title}
        </h4>
        <span className={cn('px-2 py-1 rounded-full text-xs font-semibold', getCategoryColor(category))}>
          {category}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center">
          <span className="font-medium mr-2">📅</span>
          {new Date(date).toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">🕐</span>
          {time}
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">📍</span>
          {location}
        </div>
        {attendees && (
          <div className="flex items-center">
            <span className="font-medium mr-2">👥</span>
            {attendees} attendees
          </div>
        )}
      </div>
    </Card>
  );
};

export const ServiceCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  color: string;
  variant?: CardProps['variant'];
}> = ({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  color,
  variant = 'gradient'
}) => {
  return (
    <a href={href}>
      <Card variant={variant} hover="glow" className="h-full group">
        <div className={cn('p-6 text-white rounded-t-xl -mx-6 -mt-6 mb-6', color)}>
          <Icon className="h-8 w-8 mb-3" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
          {description}
        </p>
      </Card>
    </a>
  );
};
