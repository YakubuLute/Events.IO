import React, { FormEvent, KeyboardEvent, MutableRefObject } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';

import FilePreview from '@/components/shared/file-preview/FilePreview';
import AttachFile from '@/components/shared/messages/icons/attachFile';
import SendIcon from '@/components/shared/messages/icons/SendIcon';
import SmileyFace from '@/components/shared/messages/icons/smileyFace';
import { Attachment, TConversation } from '@/@types/shared/chat';
import styles from '../index.module.scss';

type Props = {
  chatData: TConversation;
  handleSendMessage: (e: FormEvent<HTMLFormElement>) => void;
  inputFile: MutableRefObject<HTMLInputElement | null>;
  onFileChange: (e: any) => void;
  selectedFile: File | null;
  setSelectedFile: (value: File | null) => void;
  setUploadUrl: (value: Attachment | null) => void;
  isUploading: boolean;
  setShowEmojiMenu: (value: boolean) => void;
  inputRef: MutableRefObject<HTMLTextAreaElement | null>;
  onSetKeyUp: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSetKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onAttachFile: () => void;
  loading: boolean;
  networkConnected: boolean;
  emojiMenuRef: MutableRefObject<HTMLInputElement | null>;
  showEmojiMenu: boolean;
};

const ChatBoxInput = ({
  chatData,
  emojiMenuRef,
  handleSendMessage,
  inputFile,
  inputRef,
  isUploading,
  loading,
  networkConnected,
  onAttachFile,
  onFileChange,
  onSetKeyDown,
  onSetKeyUp,
  selectedFile,
  setSelectedFile,
  setShowEmojiMenu,
  setUploadUrl,
  showEmojiMenu,
}: Props) => {
  const disableCondition = () => {
    return (
      loading ||
      !networkConnected ||
      isUploading ||
      chatData?.isConnected === false ||
      chatData?.isDeletedUser
    );
  };

  return (
    <form onSubmit={handleSendMessage}>
      <Box
        // className={styles.mainChatContainer}
        display={'flex'}
        borderTop={1}
        borderColor={'#ECECED'}
        p={2}
        gap={1}
        alignItems={'center'}
        position="relative"
      >
        <Box flex={1}>
          <input
            type="file"
            ref={inputFile}
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          <Box
            style={{
              paddingInline: '16px',
            }}
            sx={{
              backgroundColor: '#F2F4FF',
              borderRadius: '32px',
              paddingY: 2,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: selectedFile ? '260px' : '100%',
              justifyContent: selectedFile ? 'center' : 'flex-start',
              alignItems: 'start',
            }}
          >
            {selectedFile && (
              <div className="lg:ml-16 w-[150px] h-[150px]">
                <FilePreview
                  fileType={selectedFile?.type}
                  fileUrl={URL.createObjectURL(selectedFile)}
                  showCloseButton={true}
                  onClose={() => {
                    setSelectedFile(null);
                    setUploadUrl(null);
                  }}
                />
              </div>
            )}
            {isUploading && <span>Uploading</span>}

            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
              height={'100%'}
            >
              <Stack direction="row" alignItems="center">
                <IconButton
                  onClick={() => setShowEmojiMenu(true)}
                  className={styles.chatBtn}
                >
                  <SmileyFace />
                </IconButton>

                <textarea
                  placeholder="Type your message"
                  ref={inputRef}
                  onKeyUp={onSetKeyUp}
                  onKeyDown={onSetKeyDown}
                  rows={1}
                  className={styles.textarea}
                  disabled={disableCondition()}
                />
              </Stack>
              <IconButton
                onClick={onAttachFile}
                className={styles.chatBtn}
                disabled={disableCondition()}
              >
                <AttachFile />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <IconButton
          className={styles.sendBtn}
          disabled={disableCondition()}
          type="submit"
        >
          <SendIcon />
        </IconButton>
        <div
          ref={emojiMenuRef}
          className={[styles.emojiMenu, showEmojiMenu ? styles.show : ''].join(
            ' '
          )}
        >
          <EmojiPicker
            width={350}
            height={400}
            previewConfig={{
              showPreview: false,
            }}
            onEmojiClick={(emojiData) => {
              const messageInput = inputRef.current;
              if (messageInput) {
                messageInput.value = messageInput.value + emojiData.emoji;
                messageInput?.focus();
              }
              setShowEmojiMenu(false);
            }}
          />
        </div>
      </Box>
    </form>
  );
};

export default ChatBoxInput;
