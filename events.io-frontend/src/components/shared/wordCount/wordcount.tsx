import React from 'react';

interface TruncatedTextProps {
  text: string;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text }) => {
  const appendEllipsisAfterNthWord = (input: string): string => {
    const words = input.split(/\s+/);
    const wordCount = words.length;

    if (wordCount <= 20) {
      return input;
    } else {
      const first20Words = words.slice(0, 20).join(' ');
      return `${first20Words} ....`;
    }
  };

  const truncatedText = appendEllipsisAfterNthWord(text);

  return <p>{truncatedText}</p>;
};

export default TruncatedText;
