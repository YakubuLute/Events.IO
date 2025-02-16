import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { EventDetail } from '@/@types/shared/type';
import { EventSteps } from '@/enums/shared';

interface EmployerEventContextType {
  activeStep: EventSteps | null | undefined;
  setActiveStep: (step: EventSteps | null | undefined) => void;
  eventDetails: EventDetail | null;
  setEventDetails: (data: EventDetail | null) => void;
  isEdittingCoupon: boolean;
  setIsEdittingCoupon: (isEdittingCoupon: boolean) => void;
  isEdittingPackage: boolean;
  setIsEdittingPackage: (isEdittingPackage: boolean) => void;
  isEdittingOfficials: boolean;
  setIsEdittingOfficials: (isEdittingOfficials: boolean) => void;
  resetEventDetails: () => void;
}

const EmployerEventContext = createContext<
  EmployerEventContextType | undefined
>(undefined);

export const EmployerEventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeStep, setActiveStep] = useState<EventSteps | null | undefined>(
    EventSteps.EVENT_DETAILS_CREATION
  );

  const [eventDetails, setEventDetails] = useState<EventDetail | null>(null);
  const [isEdittingOfficials, setIsEdittingOfficials] =
    useState<boolean>(false);
  const [isEdittingPackage, setIsEdittingPackage] = useState<boolean>(false);
  const [isEdittingCoupon, setIsEdittingCoupon] = useState<boolean>(false);
 
  const resetEventDetails = () => {
    setEventDetails(null);
    // setActiveStep(null);
    setIsEdittingOfficials(false);
    setIsEdittingPackage(false);
    setIsEdittingCoupon(false);
  };

  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
      eventDetails,
      setEventDetails,
      isEdittingCoupon,
      isEdittingOfficials,
      setIsEdittingCoupon,
      isEdittingPackage,
      setIsEdittingOfficials,
      setIsEdittingPackage,
      resetEventDetails,
    }),
    [
      activeStep,
      eventDetails,
      isEdittingOfficials,
      isEdittingCoupon,
      isEdittingPackage,
    ]
  );

  return (
    <EmployerEventContext.Provider value={value}>
      {children}
    </EmployerEventContext.Provider>
  );
};

export const empEventContext = (): EmployerEventContextType => {
  const context = useContext(EmployerEventContext);
  if (!context) {
    throw new Error(
      'empEventContext must be used within a EmployerEventProvider'
    );
  }
  return context;
};
