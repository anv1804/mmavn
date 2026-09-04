import { Metadata } from 'next';
import { getUpcomingEventsWithDetails, getCompletedEventsWithDetails } from '@/lib/services/event-service';
import { EventsClient } from './EventsClient';

export const metadata: Metadata = {
  title: 'Sự kiện | MMAVN Hub',
  description: 'Các sự kiện MMA tại Việt Nam',
};

function mapEvent(event: any) {
  const mainEvent = event.fights?.find((f: any) => f.isMainEvent);
  let mainEventFighters = undefined;
  
  if (mainEvent && mainEvent.fighter1 && mainEvent.fighter2) {
    mainEventFighters = `${mainEvent.fighter1.name} vs ${mainEvent.fighter2.name}`;
  }
  
  return {
    id: event.id,
    name: event.name,
    date: event.date,
    venue: event.venue,
    city: event.city,
    status: event.status,
    promotionName: event.promotion?.name,
    totalFights: event.fights?.length,
    mainEventFighters,
  };
}

export default function EventsPage() {
  const upcomingEvents = getUpcomingEventsWithDetails().map(mapEvent);
  const completedEvents = getCompletedEventsWithDetails().map(mapEvent);

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8 space-y-6 sm:space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">Lịch Sự Kiện</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Lịch thi đấu, kết quả và thông tin chi tiết các sự kiện MMA Việt Nam</p>
      </div>
      <EventsClient upcomingEvents={upcomingEvents} completedEvents={completedEvents} />
    </div>
  );
}
