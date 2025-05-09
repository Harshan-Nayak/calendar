import React from 'react';
import './Sidebar.css'; // We'll create this CSS file next

// Placeholder icons (in a real app, you'd use an icon library like react-icons)
const HomeIcon = () => <span className="icon">🏠</span>;
const CalendarIcon = () => <span className="icon">📅</span>;
const MembersIcon = () => <span className="icon">👥</span>;
const SettingsIcon = () => <span className="icon">⚙️</span>;
const LogoutIcon = () => <span className="icon">🚪</span>;
const NotificationsIcon = () => <span className="icon">🔔</span>;
const SearchIcon = () => <span className="icon">🔍</span>;


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          {/* Replace with an actual logo if available */}
          <span className="logo-icon">KS</span>
          <span className="logo-text">ProCalendar</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <a href="#events">
              <CalendarIcon /> Events
            </a>
          </li>
          <li className="nav-item">
            <a href="#home">
              <HomeIcon /> Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#programs">
              <span className="icon">🏆</span> Programs
            </a>
          </li>
          <li className="nav-item">
            <a href="#memberships">
              <span className="icon">💳</span> Memberships
            </a>
          </li>
          <li className="nav-item">
            <a href="#documents">
              <span className="icon">📄</span> Documents
            </a>
          </li>
        </ul>
      </nav>
      <div className="sidebar-section-title">Members</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <a href="#payments">
              <span className="icon">💲</span> Payments
            </a>
          </li>
        </ul>
      </nav>
      <div className="sidebar-section-title">Engage</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <a href="#people">
              <MembersIcon /> People
            </a>
          </li>
          <li className="nav-item">
            <a href="#communication">
              <span className="icon">💬</span> Communication
            </a>
          </li>
        </ul>
      </nav>
      <div className="sidebar-section-title">More</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <a href="#notifications">
              <NotificationsIcon /> Notifications <span className="badge">2</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#search">
              <SearchIcon /> Search
            </a>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <img src="https://wallpaperaccess.com/full/2562964.jpg" alt="User" className="user-avatar" />
          <div className="user-info">
            <span className="user-name">Pawan Kalyan</span>
            <span className="user-email">pawan@google.com</span>
          </div>
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;