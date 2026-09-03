import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventWithDetails, formatEventDate } from '@/lib/services/event-service';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FightMatchup } from '@/components/fight/FightMatchup';
import { FightPredictionWidget } from '@/components/fight/FightPredictionWidget';
import Link from 'next/link';
import { Flame, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = getEventWithDetails(id);
  
  return {
    title: event ? `${event.name} | MMAVN Hub` : 'Sự kiện | MMAVN Hub',
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEventWithDetails(id);

  if (!event) {
    notFound();
  }

  const mainEvent = event.fights?.find((f: any) => f.isMainEvent);
  const mainCardFights = event.fights?.filter((f: any) => f.order <= 5 && !f.isMainEvent) || [];
  const prelimsFights = event.fights?.filter((f: any) => f.order > 5) || [];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'upcoming': return 'default';
      case 'live': return 'primary';
      case 'completed': return 'default';
      case 'cancelled': return 'outline';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Sắp diễn ra';
      case 'live': return 'Đang diễn ra';
      case 'completed': return 'Đã kết thúc';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Event Header */}
      <div className="mb-10 text-center space-y-4">
        {event.promotion && (
          <Badge variant="outline" className="mb-2 text-red-500 border-red-500">{event.promotion.name}</Badge>
        )}
        <h1 className="text-3xl font-bold text-white">{event.name}</h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-zinc-400">
          <span>{formatEventDate(event.date)}</span>
          <span>&bull;</span>
          <span>{event.venue}, {event.city}</span>
        </div>
        
        <div className="flex justify-center gap-4 mt-4">
          <Badge variant={getStatusBadgeVariant(event.status)}>
            {getStatusText(event.status)}
          </Badge>
          {event.fights && event.fights.length > 0 && (
            <Badge variant="outline">{event.fights.length} trận đấu</Badge>
          )}
        </div>
      </div>

      {/* Main Event */}
      {mainEvent && mainEvent.fighter1 && mainEvent.fighter2 && (
        <div className="mb-12">
          <SectionHeader title="Main Event" className="mb-6 text-center" />
          <div className="max-w-4xl mx-auto transform sm:scale-105 transition-transform">
            <FightMatchup
              fighter1={mainEvent.fighter1}
              fighter2={mainEvent.fighter2}
              division={mainEvent.division}
              isTitleFight={mainEvent.isTitleFight}
              numberOfRounds={mainEvent.numberOfRounds}
              result={mainEvent.result}
              isMainEvent={true}
            />
          </div>

          {/* Interactive Prediction Widget for Upcoming Main Event */}
          {event.status === 'upcoming' && (
            <div className="max-w-4xl mx-auto mt-8">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  <span className="font-bold text-foreground text-sm uppercase tracking-wider">
                    Dự Đoán Kết Quả Main Event
                  </span>
                </div>
                <Link
                  href="/du-doan"
                  className="text-xs text-primary hover:text-red-400 font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Xem tất cả kèo &amp; Bảng xếp hạng</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <FightPredictionWidget
                fightId={mainEvent.id}
                fighter1={mainEvent.fighter1}
                fighter2={mainEvent.fighter2}
                divisionName={mainEvent.division?.nameVi || mainEvent.division?.name}
                numberOfRounds={mainEvent.numberOfRounds}
                isTitleFight={mainEvent.isTitleFight}
                isMainEvent={true}
              />
            </div>
          )}
        </div>
      )}

      {/* Main Card */}
      {mainCardFights.length > 0 && (
        <div className="mb-10 max-w-4xl mx-auto">
          <SectionHeader title="Main Card" className="mb-6" />
          <div className="space-y-4">
            {mainCardFights.map((fight: any) => (
              fight.fighter1 && fight.fighter2 && (
                <FightMatchup
                  key={fight.id}
                  fighter1={fight.fighter1}
                  fighter2={fight.fighter2}
                  division={fight.division}
                  isTitleFight={fight.isTitleFight}
                  numberOfRounds={fight.numberOfRounds}
                  result={fight.result}
                />
              )
            ))}
          </div>
        </div>
      )}

      {/* Prelims */}
      {prelimsFights.length > 0 && (
        <div className="mb-10 max-w-4xl mx-auto">
          <SectionHeader title="Prelims" className="mb-6" />
          <div className="space-y-4">
            {prelimsFights.map((fight: any) => (
              fight.fighter1 && fight.fighter2 && (
                <FightMatchup
                  key={fight.id}
                  fighter1={fight.fighter1}
                  fighter2={fight.fighter2}
                  division={fight.division}
                  isTitleFight={fight.isTitleFight}
                  numberOfRounds={fight.numberOfRounds}
                  result={fight.result}
                />
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
