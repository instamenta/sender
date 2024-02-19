import React from 'react';
import { I_Message } from '@/lib/types';

const SentMessage = ({ message }: { message: I_Message }) => {
  return (
    <div className="mb-3 self-end" style={{ maxWidth: '70%' }}>
      <div
        data-popover={message.created_at}
        className="rounded-2xl rounded-br-none bg-blue-600 px-4 pb-3 pt-2 font-medium text-white drop-shadow-xl"
      >
        <span className="break-words">{message.content}</span>
        {message.images?.length ? (
          <div
            className={`grid ${message.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
          >
            {message.images.map((img, index) => (
              <img
                src={img}
                key={index}
                alt={'pic send'}
                className="h-auto w-full"
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SentMessage;
