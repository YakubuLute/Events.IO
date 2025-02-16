'use client';

import React, { createContext, ReactNode, useState } from 'react';
import { NextPage } from 'next';

// import { socket } from '@/services/socket.service';
import { IMessage, TConversation, TStep } from '@/@types/shared/chat';
import { TConnectionRequest } from '@/@types/shared/connection-request';

export type Message = {
  sender: string;
  receiver: string;
  message: string;
  datetime: string;
};
export type Person = {
  id: number;
  status: string;
  profilePic: string;
  name: string;
  lastText: string;
  numUnreadMsgs: number;
};

export type SenderProfile = {
  name: string;
  position: string;
  experience: string;
  minSalary: string;
  minRate: string;
  desc: string;
  work: Array<string>;
  loc: Array<string>;
  time: Array<string>;
};

type messageContextProps = {
  infoTabOpen: boolean;
  setInfoTabOpen: (infoTabOpen: boolean) => void;
  isExtendTab: boolean;
  setIsExtendTab: (isExtendTab: boolean) => void;
  selectedChat: TConversation | null;
  setSelectedChat: (data: TConversation | null) => void;
  searchTerm: string;
  setSearchTerm: (data: string) => void;
  chats: TConversation[];
  setChats: (chats: TConversation[]) => void;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  selectedRequest: TConnectionRequest | null;
  setSelectedRequest: (data: TConnectionRequest | null) => void;
  setRecipientId: (value: string | null) => void;
  recipientId: string | null;
  showAttentionModal: boolean;
  setShowAttentionModal: (value: boolean) => void;
  setStep: (value: TStep) => void;
  step: TStep;
  showSuccessModal: boolean;
  setShowSuccessModal: (value: boolean) => void;
  loadingMgs: boolean;
  setLoadingMgs: (value: boolean) => void;
  messageTotalPages: number;
  setMessageTotalPages: (value: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
};

export const MessageContext = createContext<messageContextProps>(null!);

const MessageProvider: NextPage<{ children: ReactNode }> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<TConversation | null>(null);
  const [selectedRequest, setSelectedRequest] =
    useState<TConnectionRequest | null>(null);

  const [infoTabOpen, setInfoTabOpen] = useState(false);
  const [isExtendTab, setIsExtendTab] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState<TConversation[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingMgs, setLoadingMgs] = useState(true);
  const [messageTotalPages, setMessageTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [step, setStep] = useState<TStep>('start');

  return (
    <MessageContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        infoTabOpen,
        setInfoTabOpen,
        isExtendTab,
        setIsExtendTab,
        searchTerm,
        setSearchTerm,
        chats,
        setChats,
        messages,
        setMessages,
        selectedRequest,
        setSelectedRequest,
        recipientId,
        setRecipientId,
        setShowAttentionModal,
        showAttentionModal,
        setStep,
        step,
        setShowSuccessModal,
        showSuccessModal,
        loadingMgs,
        setLoadingMgs,
        messageTotalPages,
        setMessageTotalPages,
        itemsPerPage,
        setItemsPerPage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
