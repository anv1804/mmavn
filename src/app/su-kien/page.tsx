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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Sự kiện</h1>
      <EventsClient upcomingEvents={upcomingEvents} completedEvents={completedEvents} />
    </div>
  );
}
