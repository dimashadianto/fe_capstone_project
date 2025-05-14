import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ReminderPopupProps {
  type: string;
  visible: boolean;
  onClose: () => void;
  onSave: (time: string, message: string) => void;
}

const ReminderPopup: React.FC<ReminderPopupProps> = ({ visible, onClose, onSave }) => {
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  if (!visible) return null;

  const handleSave = () => {
    if (time) {
      onSave(time, message);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl px-8 py-6 min-w-[400px] text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-md mb-2 font-medium">Time</h2>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-blue-100 text-3xl text-center font-bold p-2 rounded-xl w-full mb-4"
        />
        <h2 className="text-md mb-2 font-medium">Message</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Drink 500 ml of water"
          className="bg-blue-100 p-2 rounded-xl w-full mb-4"
        />
        <button
          onClick={handleSave}
          className="absolute bottom-4 right-4 bg-blue-300 p-2 rounded-full text-white"
        >
          <Check size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReminderPopup;
