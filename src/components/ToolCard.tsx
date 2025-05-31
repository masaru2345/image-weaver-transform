
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
  compact?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  href,
  gradient,
  compact = false
}) => {
  return (
    <Link to={href} className="group block">
      <Card className="h-full border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
              {icon}
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
            {description}
          </p>
          <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            Get Started
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
