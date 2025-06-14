import React, { useState } from 'react';
import './reminder.css';

interface ReminderPopupProps {
  type: 'Sleep' | 'Eat' | 'Drink';
  onClose: () => void;
}

const ReminderPopup: React.FC<ReminderPopupProps> = ({ type, onClose }) => {
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    console.log(`Reminder for ${type}:`, { time, message });
    onClose(); // Close popup after save
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{type} Reminder</h2>

        <div className="input-group">
          <label>Reminder Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Reminder Message</label>
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="popup-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ReminderPopup;
