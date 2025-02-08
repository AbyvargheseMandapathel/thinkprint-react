// src/components/AnnouncementBar.jsx
import React from 'react';

const AnnouncementBar = ({ message }) => {
  return (
    <div className="bg-[var(--announcementbar-background-color)] text-[var(--announcementbar-text-color)] text-center py-3 px-4 shadow-md overflow-hidden">
      <p className="text-sm md:text-base announcement-bar-message">
        {message}
      </p>
    </div>
  );
};

export default AnnouncementBar;