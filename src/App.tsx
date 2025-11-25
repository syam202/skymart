import React, { useEffect, useMemo, useState } from 'react';
import { formatMinutes } from './utils/format';

const outbound = [
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '12:00',
  '12:30',
  '15:00',
  '17:00',
  '17:30',
  '18:00',
  '18:30'
];

const inbound = [
  '08:15',
  '08:45',
  '09:15',
  '09:45',
  '12:15',
  '12:45',
  '15:15',
  '17:15',
  '17:45',
  '18:15',
  '18:45',
  '19:15',
  '19:45'
];

const daysActive = [1, 2, 3, 4, 5]; // 0 = Sun ... 6 = Sat

const routes = {
  outbound: {
    id: 'outbound',
    title: 'Altris → LRT Sri Rampai',
    subtitle: 'Outbound to Sri Rampai LRT',
    schedule: outbound,
    color: 'var(--accent)'
  },
  inbound: {
    id: 'inbound',
    title: 'LRT Sri Rampai → Altris',
    subtitle: 'Return to Altris Residence',
    schedule: inbound,
    color: 'var(--brand)'
  }
} as const;

type RouteKey = keyof typeof routes;

type NextTrip = {
  label: string;
  date: Date;
  isTomorrow: boolean;
};

function parseToday(timeHHMM: string, base: Date) {
  const [hh, mm] = timeHHMM.split(':').map(Number);
  const d = new Date(base);
  d.setHours(hh, mm, 0, 0);
  return d;
}

function minutesDiff(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 60000);
}

function nextTrip(schedule: string[], now: Date): NextTrip {
  for (const t of schedule) {
    const date = parseToday(t, now);
    if (date > now) {
      return { label: t, date, isTomorrow: false };
    }
  }

  const tomorrow = parseToday(schedule[0], now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return { label: `${schedule[0]} (tomorrow)`, date: tomorrow, isTomorrow: true };
}

function remainingTrips(schedule: string[], now: Date) {
  return schedule.filter((t) => parseToday(t, now) > now);
}

function ScheduleCard({
  title,
  schedule,
  now,
  accent
}: {
  title: string;
  schedule: string[];
  now: Date;
  accent: string;
}) {
  const next = useMemo(() => nextTrip(schedule, now), [schedule, now]);
  const remaining = useMemo(() => remainingTrips(schedule, now), [schedule, now]);
  const minutesUntil = Math.max(0, minutesDiff(now, next.date));
  const badgeText = minutesUntil === 0 ? 'Now' : `${formatMinutes(minutesUntil)} away`;

  return (
    <section className="card">
      <div className="card__eyebrow" style={{ color: accent }}>
        Next departure
      </div>
      <div className="card__title">{title}</div>
      <div className="card__time-row">
        <span className="card__time">{next.label}</span>
        <span className="badge">{badgeText}</span>
      </div>
      <div className="list-heading">Today's remaining trips</div>
      <ul className="time-list" aria-label="Remaining trips for today">
        {remaining.length === 0 && <li className="muted">No more trips today</li>}
        {remaining.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<RouteKey>('outbound');
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const selectedRoute = routes[activeTab];
  const isActiveDay = daysActive.includes(now.getDay());
  const heroNext = useMemo(
    () => nextTrip(selectedRoute.schedule, now),
    [selectedRoute.schedule, now]
  );
  const heroMinutes = Math.max(0, minutesDiff(now, heroNext.date));
  const heroBadge = heroMinutes === 0 ? 'Departing now' : `${formatMinutes(heroMinutes)} away`;

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__eyebrow">Altris Residence Shuttle</div>
        <h1>Stay on time with real-time shuttle updates</h1>
        <p className="hero__lede">
          Toggle between outbound and inbound routes to see the next departure, countdown, and the
          rest of today's trips.
        </p>
        <div className="hero__next">
          <div className="hero__label">Next for {selectedRoute.title}</div>
          <div className="hero__time">{heroNext.label}</div>
          <div className="hero__badge">{heroBadge}</div>
        </div>
        {!isActiveDay && (
          <div className="notice" role="status">
            The shuttle runs Monday–Friday only. Enjoy your weekend!
          </div>
        )}
      </header>

      <div className="tabs" role="tablist" aria-label="Select shuttle direction">
        {(
          [routes.outbound, routes.inbound] as const
        ).map(({ id, subtitle, color }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            className={`tab ${activeTab === id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(id)}
            style={{ '--tab-accent': color } as React.CSSProperties}
          >
            <span className="tab__title">{id === 'outbound' ? 'Outbound' : 'Inbound'}</span>
            <span className="tab__subtitle">{subtitle}</span>
          </button>
        ))}
      </div>

      <main className="grid">
        <ScheduleCard
          title={selectedRoute.title}
          schedule={selectedRoute.schedule}
          now={now}
          accent={selectedRoute.color}
        />

        <section className="card secondary">
          <div className="card__eyebrow">Full day overview</div>
          <div className="list-heading">All trips (chronological)</div>
          <div className="pill-row" role="list">
            {selectedRoute.schedule.map((slot) => (
              <span className="pill" role="listitem" key={slot}>
                {slot}
              </span>
            ))}
          </div>
          <div className="card__footer">
            Service operates Monday–Friday. Times update every minute automatically.
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Powered by</span>
        <a href="https://www.skymart.com.my" target="_blank" rel="noopener noreferrer">
          SkyMart
        </a>
      </footer>
    </div>
  );
}
