import React, { useState } from 'react';
import ReminderPopup from './popup';
import { Plus } from 'lucide-react';

interface ReminderDetailPageProps {
  type: 'Sleep' | 'Eat' | 'Drink';
}

const ReminderDetailPage: React.FC<ReminderDetailPageProps> = ({ type }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [reminders, setReminders] = useState<{ time: string; message: string }[]>([]);

  const handleSave = (time: string, message: string) => {
    setReminders([...reminders, { time, message }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-100 to-blue-300 px-8 py-10 relative">
      <div className="flex justify-center gap-4 mb-8">
        {['Sleep', 'Eat', 'Drink'].map((tab) => (
          <div
            key={tab}
            className={`px-6 py-2 rounded-xl font-medium ${
              type === tab ? 'bg-blue-300 text-white' : 'bg-blue-100'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="text-center text-6xl font-bold mb-10">
        {reminders.length > 0 ? reminders[reminders.length - 1].time : '12:00'}
      </div>

      {reminders.map((reminder, index) => (
        <div key={index} className="text-center text-lg text-gray-700 mb-2">
          {reminder.message}
        </div>
      ))}

      <button
        className="absolute bottom-6 right-6 bg-blue-300 text-white p-3 rounded-full"
        onClick={() => setPopupVisible(true)}
      >
        <Plus />
      </button>

      <ReminderPopup
        type={type}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default ReminderDetailPage;
