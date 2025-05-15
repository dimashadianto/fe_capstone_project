import React, { useState } from 'react';
import './reminder.css';

interface Reminder {
  time: string;
  message: string;
}

const ReminderDetailPage: React.FC<{ type: string }> = ({ type }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const openPopupForAdd = () => {
    setTime('');
    setMessage('');
    setEditIndex(null);
    setShowPopup(true);
  };

  const openPopupForEdit = (index: number) => {
    setTime(reminders[index].time);
    setMessage(reminders[index].message);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleSave = () => {
    if (time && message) {
      const newReminder = { time, message };

      if (editIndex !== null) {
        // Update
        const updated = [...reminders];
        updated[editIndex] = newReminder;
        setReminders(updated);
      } else {
        // Add new
        setReminders([...reminders, newReminder]);
      }

      setShowPopup(false);
      setTime('');
      setMessage('');
      setEditIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    const updated = [...reminders];
    updated.splice(index, 1);
    setReminders(updated);
  };

  return (
    <div className="reminder-detail-page">
      <h2 className="title">{type} Reminder</h2>

      <div className="reminder-list">
        {reminders.map((reminder, index) => (
          <div key={index} className="reminder-item">
            <span className="reminder-time">{reminder.time}</span>
            <span className="reminder-message">{reminder.message}</span>
            <button className="edit-btn" onClick={() => openPopupForEdit(index)}>✏️</button>
            <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️</button>
          </div>
        ))}
      </div>

      <button className="add-btn" onClick={openPopupForAdd}>＋</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="popup-input-time"
            />

            <label>Message</label>
            <input
              type="text"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="popup-input-msg"
            />

            <button className="save-popup-btn" onClick={handleSave}>✔️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderDetailPage;
