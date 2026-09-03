'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { EventCard } from '@/components/event/EventCard';

interface EventData {
  id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  promotionName?: string;
  totalFights?: number;
  mainEventFighters?: string;
}

interface EventsPageData {
  upcomingEvents: EventData[];
  completedEvents: EventData[];
}

export function EventsClient({ upcomingEvents, completedEvents }: EventsPageData) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Sắp diễn ra' },
    { id: 'completed', label: 'Đã kết thúc' },
  ];

  const activeEvents = activeTab === 'upcoming' ? upcomingEvents : completedEvents;

  return (
    <div className="space-y-6">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      {activeEvents.length === 0 ? (
        <EmptyState title="Không có sự kiện nào" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
