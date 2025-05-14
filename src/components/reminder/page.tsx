import React from 'react';
import ReminderCard from './card';
import { useNavigate } from 'react-router-dom';

const ReminderPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (type: string) => {
    navigate(`/reminder/${type.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-100 to-blue-300 px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Choose your Reminder</h1>
      <div className="flex justify-center gap-8">
        <ReminderCard title="tidur" imageSrc="/images/tidur.jpg" onClick={() => handleClick('Sleep')} />
        <ReminderCard title="makan" imageSrc="/images/makan.jpeg" onClick={() => handleClick('Eat')} />
        <ReminderCard title="minum" imageSrc="/images/minum.jpg" onClick={() => handleClick('Drink')} />
      </div>
    </div>
  );
};

export default ReminderPage;
