import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  parseISO, // Still needed to parse date strings from prop
} from 'date-fns';
// Removed: import eventsData from '../events.json';
import './Calendar.css';

// Calendar component now accepts 'events' as a prop
const Calendar = ({ events: rawEventsFromApp }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // This state will hold events after parsing their dates
  const [processedEvents, setProcessedEvents] = useState([]);

  // Effect to process events whenever the rawEventsFromApp prop changes
  useEffect(() => {
    if (rawEventsFromApp && Array.isArray(rawEventsFromApp)) {
      const newProcessedEvents = rawEventsFromApp.map(event => ({
        ...event,
        date: event.date ? parseISO(event.date) : null, // Ensure date is parsed, handle missing date
      }));
      setProcessedEvents(newProcessedEvents);
    } else {
      setProcessedEvents([]); // Clear events if prop is invalid
    }
  }, [rawEventsFromApp]);


  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getEventsForDate = (date) => {
    // Use processedEvents which has Date objects
    return processedEvents
      .filter(event => event.date && isSameDay(event.date, date))
      .sort((a, b) => a.startTimeMinutes - b.startTimeMinutes);
  };

  const formatEventTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const checkConflict = (eventA, eventB) => {
    // Assumes startTimeMinutes and endTimeMinutes are already calculated and passed in props
    return eventA.startTimeMinutes < eventB.endTimeMinutes && eventA.endTimeMinutes > eventB.startTimeMinutes;
  };

  const getEventsWithConflictInfo = (dayEvents) => {
    return dayEvents.map((event, index) => {
      let hasConflict = false;
      for (let i = 0; i < dayEvents.length; i++) {
        if (i !== index && checkConflict(event, dayEvents[i])) {
          hasConflict = true;
          break;
        }
      }
      return { ...event, hasConflict };
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
          <div key={dayName} className="calendar-day-name">
            {dayName}
          </div>
        ))}
        {days.map((day, index) => {
          const dayEventsRaw = getEventsForDate(day);
          const dayEventsWithConflict = getEventsWithConflictInfo(dayEventsRaw);

          return (
            <div
              key={index}
              className={`calendar-day ${
                !isSameMonth(day, monthStart) ? 'disabled' : ''
              } ${isSameDay(day, new Date()) ? 'today' : ''}`}
            >
              <span className="day-number">{format(day, 'd')}</span>
              <div className="events-on-day">
                {dayEventsWithConflict.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`event-item ${event.hasConflict ? 'conflicting' : ''}`}
                    style={{ backgroundColor: event.color }}
                    title={`${event.title} (${formatEventTime(event.startTime)} - ${formatEventTime(event.endTime)})${event.durationFormatted ? ' Duration: ' + event.durationFormatted : ''}${event.hasConflict ? ' - CONFLICT' : ''}`}
                  >
                    <span className="event-time">{formatEventTime(event.startTime)}</span> {event.title}
                    {event.durationFormatted && (
                      <span className="event-duration"> ({event.durationFormatted})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;