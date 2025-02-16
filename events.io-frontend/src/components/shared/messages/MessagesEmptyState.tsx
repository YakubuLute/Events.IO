/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';

function ChatsEmptyState() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 mx-auto max-w-lg px-4 py-6 h-full">
      <Image
        width={100}
        height={100}
        src={'/assets/images/chat-empty-state.png'}
        alt="empty"
      />
      <p className="text-2xl text-center font-bold">No Messages yet</p>
      <p className="text-center text-sm text-gray-400 font-bold">
        Your message center where you can interact, ask questions, and receive
        updates. Feel free to reach out and let's get the conversation rolling!
      </p>
    </div>
  );
}

export default ChatsEmptyState;
