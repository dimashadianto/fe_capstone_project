import React from 'react';

interface ReminderCardProps {
  title: string;
  imageSrc: string;
  onClick: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ title, imageSrc, onClick }) => {
  return (
    <div
      className="bg-blue-100 rounded-2xl p-4 cursor-pointer w-[250px] text-center hover:shadow-lg transition"
      onClick={onClick}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[170px] object-cover rounded-xl mb-4"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
};

export default ReminderCard;
