'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { NextPage } from 'next';

import {
  TCandidateProfile,
  TResponseCandidateEducation,
  TResponseCandidateWorkExperience,
} from '@/@types/candidate/auth/candidate-auth';
import {
  PaymentObject,
  VerificationPaymentMethod,
  VerificationProcessType,
  VerificationStage,
  VerificationStatus,
} from '@/@types/shared/type';

type ContextProps = {
  verificationStage: VerificationStage;
  setVerificationStage: (value: VerificationStage) => void;
  verificationStatus: VerificationStatus;
  setVerificationStatus: (value: VerificationStatus) => void;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  isSuccess: boolean;
  setSuccess: (value: boolean) => void;
  isError: boolean;
  setError: (value: boolean) => void;
  candidateData: TCandidateProfile | null;
  setCandidateData: (value: TCandidateProfile) => void;
  errorMsg: string;
  setErrorMsg: (value: string) => void;
  selectedExperience: TResponseCandidateWorkExperience | null;
  setSelectedExperience: (
    value: TResponseCandidateWorkExperience | null
  ) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  paymentMethod: VerificationPaymentMethod;
  setPaymentMethod: (value: VerificationPaymentMethod) => void;
  verificationProcessType: VerificationProcessType;
  setVerificationProcessType: (value: VerificationProcessType) => void;
  paymentInfo: PaymentObject | null;
  setPaymentInfo: (value: PaymentObject) => void;
  selectedEducation: TResponseCandidateEducation | null;
  setSelectedEducation: (value: TResponseCandidateEducation | null) => void;
  aboutType: 'education' | 'experience' | null;
  setAboutType: (value: 'education' | 'experience' | null) => void;
};

export const VerificationContext = createContext<ContextProps>(null!);

const VerificationProvider: NextPage<{ children: ReactNode }> = ({
  children,
}) => {
  const [verificationStage, setVerificationStage] =
    useState<VerificationStage>('');
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>({
      identityVerificationStatus: 'not_started',
      faceVerificationStatus: 'not_started',
      addressVerificationStatus: 'not_started',
      identityVerificationRemark: '',
    });
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [candidateData, setCandidateData] = useState<TCandidateProfile | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedExperience, setSelectedExperience] =
    useState<TResponseCandidateWorkExperience | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<VerificationPaymentMethod>('');
  const [verificationProcessType, setVerificationProcessType] =
    useState<VerificationProcessType>('');
  const [paymentInfo, setPaymentInfo] = useState<PaymentObject | null>(null);
  const [selectedEducation, setSelectedEducation] =
    useState<TResponseCandidateEducation | null>(null);
  const [aboutType, setAboutType] = useState<'education' | 'experience' | null>(
    null
  );

  useEffect(() => {
    if (verificationStatus.identityVerificationStatus === 'not_started') {
      setVerificationStage('ID');
    } else if (
      verificationStatus.identityVerificationStatus === 'completed' &&
      verificationStatus.faceVerificationStatus !== 'completed'
    ) {
      setVerificationStage('SELFIE');
    } else if (
      verificationStatus.identityVerificationStatus === 'completed' &&
      verificationStatus.faceVerificationStatus === 'completed' &&
      verificationStatus.addressVerificationStatus !== 'completed'
    ) {
      setVerificationStage('ADDRESS');
    } else {
      setVerificationStage('DONE');
    }
  }, [verificationStatus]);

  return (
    <VerificationContext.Provider
      value={{
        verificationStage,
        setVerificationStage,
        verificationStatus,
        setVerificationStatus,
        currentStep,
        isError,
        isSuccess,
        setCurrentStep,
        setError,
        setSuccess,
        candidateData,
        setCandidateData,
        errorMsg,
        setErrorMsg,
        selectedExperience,
        setSelectedExperience,
        openModal,
        setOpenModal,
        paymentMethod,
        setPaymentMethod,
        verificationProcessType,
        setVerificationProcessType,
        paymentInfo,
        setPaymentInfo,
        selectedEducation,
        setSelectedEducation,
        aboutType,
        setAboutType,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export default VerificationProvider;
