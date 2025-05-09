import React, { useState, useEffect, useCallback } from 'react';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar'; // Import Sidebar
import defaultEventsData from './events.json';
import './App.css';

const PREDEFINED_COLORS = [
  '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
  '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab',
  '#86bcb6', '#f1a340', '#bcbd22', '#17becf', '#aec7e8',
  '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5', '#c49c94'
];

let colorIndex = 0;

const getNextEventColor = () => {
  const color = PREDEFINED_COLORS[colorIndex % PREDEFINED_COLORS.length];
  colorIndex++;
  return color;
};

const processEvents = (rawEvents) => {
  colorIndex = 0; // Reset for each new batch

  const parseTimeToMinutes = (timeString) => {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatDuration = (durationMinutes) => {
    if (durationMinutes <= 0) return '';
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    let durationString = '';
    if (hours > 0) durationString += `${hours}h`;
    if (minutes > 0) durationString += `${hours > 0 ? ' ' : ''}${minutes}m`;
    return durationString;
  };

  return rawEvents.map((event) => {
    const startTimeMinutes = parseTimeToMinutes(event.startTime);
    const endTimeMinutes = parseTimeToMinutes(event.endTime);
    const durationMinutes = endTimeMinutes > startTimeMinutes ? endTimeMinutes - startTimeMinutes : 0;
    const color = event.color || getNextEventColor();
    return {
      ...event,
      color,
      startTimeMinutes,
      endTimeMinutes,
      durationMinutes,
      durationFormatted: formatDuration(durationMinutes),
    };
  });
};

function App() {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    setCalendarEvents(processEvents(defaultEventsData));
  }, []);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedEvents = JSON.parse(e.target.result);
          if (Array.isArray(uploadedEvents)) {
            setCalendarEvents(processEvents(uploadedEvents));
          } else {
            alert("Invalid JSON file format. Expected an array of events.");
          }
        } catch (error) {
          console.error("Error parsing uploaded JSON file:", error);
          alert("Failed to load events from file. Please ensure it's a valid JSON.");
        }
      };
      reader.readAsText(file);
      event.target.value = null;
    }
  }, []);

  return (
    <div className="App">
      <Sidebar /> {/* Add Sidebar component */}
      <div className="main-content-area"> {/* New wrapper for header and calendar */}
        <header className="App-header">
          <h1>My Calendar</h1>
          <div className="file-upload-container">
            <label htmlFor="event-file-upload" className="file-upload-label">
              Load Events from JSON
            </label>
            <input
              type="file"
              id="event-file-upload"
              accept=".json"
              onChange={handleFileUpload}
              className="file-upload-input"
            />
          </div>
        </header>
        <main className="calendar-main-section"> {/* Specific class for main calendar area */}
          <Calendar events={calendarEvents} />
        </main>
      </div>
    </div>
  );
}

export default App;
