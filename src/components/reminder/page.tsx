// ReminderPage.tsx
import React, { useEffect } from 'react';
import ReminderCard from './card';
import { useNavigate } from 'react-router-dom';
import './reminder.css';

const ReminderPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleClick = (type: string) => {
    navigate(`/reminder/${type.toLowerCase()}`);
  };

  return (
    <div className="reminder-page">
      <h1 className="reminder-title-main">Choose your Reminder</h1>
      <div className="reminder-card-container">
        <ReminderCard title="Sleep" imageSrc="/images/tidur.jpg" onClick={() => handleClick('Sleep')} />
        <ReminderCard title="Eat" imageSrc="/images/makan.jpeg" onClick={() => handleClick('Eat')} />
        <ReminderCard title="Drink" imageSrc="/images/minum.jpg" onClick={() => handleClick('Drink')} />
      </div>
    </div>
  );
};

export default ReminderPage;
