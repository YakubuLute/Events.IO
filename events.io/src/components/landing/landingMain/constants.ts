export type TPlatformData = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  bgColor: string;
};

export const platformData: TPlatformData[] = [
  {
    title: 'Employer Platform',
    description:
      'Your One-Stop Solution for Diverse Hiring Needs - Connect with Verified Talent that Fits Your Roles Perfectly!',
    imageUrl: '/images/employer-dashboard.png',
    link: '/employer/signin',
    bgColor: '#0C27BE',
  },
  {
    title: 'University Platform',
    description:
      'Empower Your Students to Achieve Their Career Goals with Vaurse',
    imageUrl: '/images/university-dashboard.png',
    link: '/university/signin',
    bgColor: '#7357FF',
  },
  {
    title: 'Candidate Platform',
    description: 'Let employers find you instead of you looking for them and connect with other professionals.',
    imageUrl: '/images/Candidate_Image.png',
    link: '/candidate/signin',
    bgColor: '#F03D3D',
  },
];