import React from 'react';

const AnnouncementBar = ({ message }) => {
  return (
    <div className="bg-[var(--announcementbar-background-color)] text-[var(--announcementbar-text-color)] text-center py-3 px-4 shadow-md overflow-hidden">
      <div className="announcement-bar-container">
        <p className="text-sm md:text-base announcement-bar-message">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
