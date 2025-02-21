import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import styles from './tagInput.module.scss';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  error?: boolean;
  placeholder?: string;
  onEnteringEmailChange: (enteringEmail: string) => void;
}
const TagInput = ({
  tags,
  onTagsChange,
  error,
  placeholder,
  onEnteringEmailChange,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onEnteringEmailChange(event.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      // check if the in
      onTagsChange([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter' || event.key === ',') {
      console.log('event.key', event.key);
      event.preventDefault();
      // check if the tag is selected and update its value
      if (selectedTag) {
        const newTags = tags.map((tag) =>
          tag === selectedTag ? inputValue.trim() : tag
        );
        onTagsChange(newTags);
        setSelectedTag(null);
        setInputValue('');
      } else {
        handleAddTag();
      }
    } else if (
      event.key === 'Backspace' &&
      inputValue === '' &&
      tags.length > 0
    ) {
      // Allow deleting the last tag with Backspace when the input is empty
      const lastTag = tags[tags.length - 1];
      handleDeleteTag(lastTag);
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    onTagsChange(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      className={styles.tag_input_wrapper}
    >
      {tags.map((tag, index) => (
        <div className={styles.chipWrapper} key={index}>
          <Chip
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            style={{
              margin: '0px 4px',
              backgroundColor: selectedTag === tag ? '#e6e9f9' : '',
            }}
            onClick={() => {
              setInputValue(tag);
              setSelectedTag(tag);
            }}
          />
        </div>
      ))}
      <input
        // label={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.tag_input}
        placeholder={placeholder}
        style={tags.length > 0 ? {} : { width: '100%' }}
      />
      <span>{error}</span>
    </Box>
  );
};

export default TagInput;
