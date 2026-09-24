import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface EventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    venue: string;
    city: string;
    status: 'upcoming' | 'live' | 'completed' | 'cancelled';
    promotionName?: string;
    totalFights?: number;
    mainEventFighters?: string;
  };
  compact?: boolean;
}

const statusMap = {
  upcoming: { variant: 'primary' as const, label: 'Sắp tới' },
  live: { variant: 'live' as const, label: 'Đang diễn ra' },
  completed: { variant: 'default' as const, label: 'Đã kết thúc' },
  cancelled: { variant: 'outline' as const, label: 'Đã hủy' }
};

export function EventCard({ event, compact = false }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(eventDate);

  const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const showCountdown = event.status === 'upcoming' && daysUntil > 0 && daysUntil <= 30;

  return (
    <Link href={`/su-kien/${event.id}`}>
      <Card hover className={cn("flex flex-col h-full bg-white border-slate-200 hover:border-sky-300", compact ? "p-4" : "p-6")}>
        <div className="flex justify-between items-start mb-3">
          <Badge variant={statusMap[event.status].variant}>
            {statusMap[event.status].label}
          </Badge>
          {event.promotionName && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
              {event.promotionName}
            </span>
          )}
        </div>

        <h3 className={cn("font-bold text-slate-900 mb-2 line-clamp-2 hover:text-primary transition-colors", compact ? "text-base" : "text-lg")}>
          {event.name}
        </h3>

        <div className="space-y-2 mt-auto">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>📅</span> {formattedDate}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-2 truncate">
            <span>📍</span> {event.venue}, {event.city}
          </div>
          
          {!compact && event.mainEventFighters && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">Main Event</div>
              <div className="text-xs font-semibold text-slate-800 truncate">{event.mainEventFighters}</div>
            </div>
          )}

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
            {event.totalFights !== undefined && (
              <span className="text-xs text-slate-400 font-medium">{event.totalFights} trận đấu</span>
            )}
            {showCountdown && (
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Còn {daysUntil} ngày</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
