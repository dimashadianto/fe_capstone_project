import React, { useState, useEffect } from 'react';
import './reminder.css';
import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
} from '../../services/user_service';

interface Reminder {
  reminder_id: number;
  user_id: number;
  time: string;
  message: string;
}

const ReminderDetailPage: React.FC<{ type: string }> = ({ type }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showStopPopup, setShowStopPopup] = useState(false);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const user_id = user?.id;

  useEffect(() => {
    fetchData();
  }, [user_id]);

  const fetchData = async () => {
    try {
      const data = await getReminders();
      const userReminders = data.filter((r: Reminder) => r.user_id === user_id);
      setReminders(userReminders);
    } catch (err) {
      console.error('Gagal mengambil data reminder:', err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().split(' ')[0]; // "HH:MM:SS"

      reminders.forEach((reminder) => {
        const reminderTime =
          reminder.time.length === 5 ? `${reminder.time}:00` : reminder.time;

        if (reminderTime === currentTime) {
          if (Notification.permission === 'granted') {
            new Notification('Pengingat!', {
              body: reminder.message,
            });
          }

          const audio = document.getElementById('reminder-sound') as HTMLAudioElement;
          if (audio) {
            audio.play().catch((e) => console.warn('Gagal memutar suara:', e));
            setShowStopPopup(true);
          }
        }
      });
    }, 1000); // dicek tiap detik agar bisa tangkap waktu tepat "HH:MM:SS"

    return () => clearInterval(interval);
  }, [reminders]);

  const stopSound = () => {
    const audio = document.getElementById('reminder-sound') as HTMLAudioElement;
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    setShowStopPopup(false);
  };

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

  const handleSave = async () => {
    if (time.trim() && message.trim()) {
      const newReminder = { user_id, time, message };
      try {
        if (editIndex !== null && reminders[editIndex].reminder_id) {
          await updateReminder(reminders[editIndex].reminder_id!, { time, message });

          const updated = [...reminders];
          updated[editIndex] = {
            ...newReminder,
            reminder_id: reminders[editIndex].reminder_id,
          };
          setReminders(updated);
        } else {
          const created = await createReminder(newReminder);
          setReminders([
            ...reminders,
            { ...newReminder, reminder_id: created.reminder_id },
          ]);
        }

        setShowPopup(false);
        setTime('');
        setMessage('');
        setEditIndex(null);
      } catch (err) {
        console.error('Gagal menyimpan reminder:', err);
      }
    } else {
      alert('Isi waktu dan pesan terlebih dahulu');
    }
  };

  const handleDelete = async (index: number) => {
    const reminder = reminders[index];
    if (!reminder || !reminder.reminder_id) {
      console.warn('Reminder ID tidak ditemukan');
      return;
    }

    try {
      await deleteReminder(reminder.reminder_id);
      const updated = [...reminders];
      updated.splice(index, 1);
      setReminders(updated);
    } catch (err) {
      console.error('Gagal menghapus reminder:', err);
    }
  };

  return (
    <div className="reminder-detail-page">
      <h2 className="title">{type} Reminder</h2>

      <div className="reminder-list">
        {reminders.map((reminder, index) => (
          <div key={reminder.reminder_id ?? index} className="reminder-item">
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

      {showStopPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Pengingat sudah berbunyi. Waktunya mengerjakan pesan Anda!</p>
            <button onClick={stopSound} className='cursor-pointer text-blue-600 hover:text-blue-400'>Tekan untuk matikan suara</button>
          </div>
        </div>
      )}

      <audio id="reminder-sound" src="/public/sounds/reminder.mp3" preload="auto" />
    </div>
  );
};

export default ReminderDetailPage;
