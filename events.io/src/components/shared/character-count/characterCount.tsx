import React from 'react';

interface TruncatedParagraphProps {
  content: string;
}

const TruncatedParagraph: React.FC<TruncatedParagraphProps> = ({ content }) => {
  const truncatedContent =
    content.length > 100 ? `${content.slice(0, 100)}...` : content;

  return <p>{truncatedContent}</p>;
};

export default TruncatedParagraph;
