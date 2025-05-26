import React from 'react';
import './reminder.css'; // tambahkan file CSS

interface ReminderCardProps {
  title: string;
  imageSrc: string;
  onClick: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ title, imageSrc, onClick }) => {
  return (
    <div className="reminder-card" onClick={onClick}>
      <img src={imageSrc} alt={title} className="reminder-image" />
      <h2 className="reminder-title">{title}</h2>
    </div>
  );
};

export default ReminderCard;
