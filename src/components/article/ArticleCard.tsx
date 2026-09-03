import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Flame, 
  Activity, 
  Mic, 
  Swords, 
  MessageSquare, 
  Dumbbell, 
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';
import React from 'react';

export interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    author: string;
    category: string;
    publishedAt: string;
    tags: string[];
  };
  featured?: boolean;
}

const CATEGORY_CONFIG: Record<string, { 
  label: string; 
  badgeVariant: 'primary' | 'accent' | 'success' | 'outline' | 'default';
  bgGradient: string;
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  breaking: { 
    label: 'Tin nóng', 
    badgeVariant: 'primary',
    bgGradient: 'from-red-900/60 via-red-950/40 to-card',
    accentColor: 'text-red-400',
    icon: Flame,
  },
  analysis: { 
    label: 'Phân tích', 
    badgeVariant: 'accent',
    bgGradient: 'from-amber-900/50 via-amber-950/30 to-card',
    accentColor: 'text-amber-400',
    icon: Activity,
  },
  interview: { 
    label: 'Phỏng vấn', 
    badgeVariant: 'success',
    bgGradient: 'from-emerald-900/50 via-emerald-950/30 to-card',
    accentColor: 'text-emerald-400',
    icon: Mic,
  },
  technique: { 
    label: 'Kỹ thuật', 
    badgeVariant: 'outline',
    bgGradient: 'from-cyan-900/50 via-cyan-950/30 to-card',
    accentColor: 'text-cyan-400',
    icon: Swords,
  },
  opinion: { 
    label: 'Ý kiến', 
    badgeVariant: 'default',
    bgGradient: 'from-purple-900/50 via-purple-950/30 to-card',
    accentColor: 'text-purple-400',
    icon: MessageSquare,
  },
  'gym-spotlight': { 
    label: 'Phòng tập', 
    badgeVariant: 'outline',
    bgGradient: 'from-blue-900/50 via-blue-950/30 to-card',
    accentColor: 'text-blue-400',
    icon: Dumbbell,
  }
};

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const date = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  }).format(new Date(article.publishedAt));

  const config = CATEGORY_CONFIG[article.category] || { 
    label: article.category, 
    badgeVariant: 'default',
    bgGradient: 'from-slate-800/60 via-slate-900/40 to-card',
    accentColor: 'text-slate-400',
    icon: Flame,
  };

  const Icon = config.icon;

  if (featured) {
    return (
      <Link href={`/tin-tuc/${article.slug}`} className="block h-full group">
        <Card hover padding="none" className="overflow-hidden h-full flex flex-col border-border/80 hover:border-primary/50 transition-all duration-300">
          {/* Visual Graphic Banner */}
          <div className={`h-48 sm:h-60 bg-gradient-to-br ${config.bgGradient} relative overflow-hidden shrink-0 border-b border-border/60 flex items-center justify-center`}>
            {/* Hexagon / Octagon Cage Background Grid */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-primary/10 blur-2xl" />

            {/* Graphic Watermark Icon */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-card/60 backdrop-blur-md border border-white/10 flex items-center justify-center mb-2 shadow-xl group-hover:scale-110 transition-transform">
                <Icon className={`w-7 h-7 ${config.accentColor}`} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white/70">
                MMAVN Sports Media
              </span>
            </div>

            {/* Category Badge overlay */}
            <div className="absolute top-4 left-4 z-20">
              <Badge variant={config.badgeVariant} className="shadow-md">
                {config.label}
              </Badge>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex flex-col flex-1">
            <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {article.title}
            </h3>
            <p className="text-muted text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex justify-between items-center text-xs text-muted font-medium mt-auto pt-4 border-t border-border/70">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <User className="w-3.5 h-3.5 text-primary" />
                {article.author}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {date}
              </span>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/tin-tuc/${article.slug}`} className="block h-full group">
      <Card hover padding="none" className="overflow-hidden flex flex-col sm:flex-row h-full border-border/80 hover:border-primary/50 transition-all duration-300">
        {/* Visual Graphic Banner */}
        <div className={`h-36 sm:h-auto sm:w-2/5 bg-gradient-to-br ${config.bgGradient} relative overflow-hidden shrink-0 border-b sm:border-b-0 sm:border-r border-border/60 flex items-center justify-center p-4`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px]" />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-xl bg-card/60 backdrop-blur-md border border-white/10 flex items-center justify-center mb-1.5 shadow-lg group-hover:scale-110 transition-transform">
              <Icon className={`w-6 h-6 ${config.accentColor}`} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-white/70">
              {config.label}
            </span>
          </div>
        </div>

        {/* Article Details */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={config.badgeVariant} size="sm">
                {config.label}
              </Badge>
              <span className="text-[11px] text-muted flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
            </div>
            <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="flex justify-between items-center text-xs text-muted font-medium pt-3 mt-2 border-t border-border/50">
            <span className="truncate mr-2 font-medium text-slate-300">
              {article.author}
            </span>
            <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold group-hover:translate-x-1 transition-transform">
              Đọc tiếp
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
