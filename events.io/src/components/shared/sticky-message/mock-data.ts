import { TChatData } from './messageInbox/chat-box';
import { TChatUserData } from './messageInbox/ChatListItem';
import { TRequestItemData } from './messageInbox/RequestItem';

export const userData = {
  image: '/assets/images/avatar.png',
  unReadCount: 2,
  name: 'Sam George',
  statu: 'active',
};

export const chatList: TChatUserData[] = [
  {
    image: '/assets/images/avatar.png',
    name: 'Jonathan',
    status: 'active',
    lastTime: '5min',
    amount: 2,
    lastMessage:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
  },
  
  {
    image: '/assets/images/avatar.png',
    name: 'Jonathan',
    status: 'active',
    lastTime: '5min',
    amount: 2,
    lastMessage:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
  },
  {
    image: '/assets/images/avatar.png',
    name: 'Jonathan',
    status: 'active',
    lastTime: '5min',
    amount: 2,
    lastMessage:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
  },
  {
    image: '/assets/images/avatar.png',
    name: 'Jonathan',
    status: 'active',
    lastTime: '5min',
    amount: 2,
    lastMessage:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
  },
  {
    image: '/assets/images/avatar.png',
    name: 'Jonathan',
    status: 'active',
    lastTime: '5min',
    amount: 2,
    lastMessage:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
  },
  {
    image: '/assets/images/avatar.png',
    name: 'Jonathan',
    status: 'active',
    lastTime: '5min',
    amount: 2,
    lastMessage:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
  },
];

export const requestsData: TRequestItemData[] = [
  {
    logo: '/assets/images/company.png',
    name: 'Notion',
    location: 'Accra-Ghana',
    status: 'Accepted',
    time: '27 may 21, 10:00',
    description:
      'A well-timed app can complement your workflow and help your team...',
  },
  {
    logo: '/assets/images/company.png',
    name: 'Notion',
    location: 'Accra-Ghana',
    status: 'Pending',
    time: '27 may 21, 10:00',
    description:
      'A well-timed app can complement your workflow and help your team...',
  },
  {
    logo: '/assets/images/company.png',
    name: 'Notion',
    location: 'Accra-Ghana',
    status: 'Accepted',
    time: '27 may 21, 10:00',
    description:
      'A well-timed app can complement your workflow and help your team...',
  },
];

export const chatHistoryData: TChatData[] = [
  {
    name: 'Vikers Junior',
    message:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
    time: '5min',
    image: '/assets/images/avarta.png',
  },
  {
    name: 'Jonathan',
    message:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
    time: '4min',
    image: '/assets/images/p1.png',
  },
  {
    name: 'Vikers Junior',
    message:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
    time: '5min',
    image: '/assets/images/avarta.png',
  },
  {
    name: 'Jonathan',
    message:
      'Hello! I have a business proposal i will love for us to discuss. Let me know...',
    time: '4min',
    image: '/assets/images/p1.png',
  },
];

export const requestData: TRequestItemData = {
  logo: '/assets/images/company.png',
  name: 'Notion',
  location: 'Accra-Ghana',
  status: 'Accepted',
  time: '27 may 21, 10:00',
  description:
    'A well-timed app can complement your workflow and help your team...',
};
