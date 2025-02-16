'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { COOKIES_KEY } from '@/utils/setCookies';
import { useEmployeeSigninWithRefreshToken } from '@/hooks/employer/useEmployee';
import { useGetEmployer } from '@/hooks/employer/useEmployer';

export interface Employee {
  employerID?: string;
  email?: string;
  password?: string;
  fullName?: string;
  employerName?: string;
  profilePhoto?: string;
  employerLogo?: string;
  emailVerified?: boolean;
  jobTitle?: string;
  role?: 'superAdmin' | 'admin' | 'recruiter' | 'regular';
  candidateType?: string;
  country?: string;
  acceptedTerms: boolean;
  dateCreated?: string;
  dateUpdated?: string;
  _id?: string;
}

export interface Employer {
  _id: string;
  employerName: string;
  bannerImage?: string | null;
  hasOnboard: boolean;
  verificationCharge?: number | null;
  currency?: string | null;
  logoImage?: string | null;
  description?: string | null;
  followers?: number | null;
  industry?: string | null;
  location?: string;
  EmployerIdentificationNumber?: string | null;
  publicEmail?: string | null;
  size?: string | null;
  publicPhone?: string | null;
  website?: string | null;
}

// Define the context type
type TCreateContext = {
  employee: Employee | null;
  employer: Employer | null;
  setEmployer: (data: Employer | null) => void;
  setEmployee: (data: Employee | null) => void;
};

const AuthEmployeeContext = createContext<TCreateContext>(null!);

export const useEmployeeAuthContext = () => {
  const context = useContext(AuthEmployeeContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a Provider');
  }
  return context;
};

const { Provider } = AuthEmployeeContext;

const AuthContextProvider: NextPage<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employer, setEmployer] = useState<Employer | null>(null);
  const route = useRouter();
  const employeeSignin = useEmployeeSigninWithRefreshToken();
  const getEmployer = useGetEmployer();

  useEffect(() => {
    // Function to authenticate the user using the refresh token
    if (window.location.pathname.startsWith('/employer')) {
      const authenticateUserWithRefreshToken = async () => {
        const refreshToken = Cookies.get(COOKIES_KEY.REFRESH_TOKEN); // Read the refresh token from the cookie

        if (refreshToken) {
          try {
            // Make a request to authenticate the user using the refresh token
            // console.log('refreshToken ', refreshToken);
            const loggedInEmployee = await employeeSignin.mutateAsync(
              refreshToken
            );
            if (loggedInEmployee.data) {
              setEmployee(loggedInEmployee.data);
              const employer = await getEmployer.mutateAsync(
                loggedInEmployee.data.employerID
              );
              setEmployer(employer.data);
              // get employer
              route.replace('/employer/dashboard');
            }
          } catch (error) {
            console.error('Error authenticating user:', error);
          }
        }
      };

      // Call the authentication function on component mount
      authenticateUserWithRefreshToken();
    }
  }, []);

  const contextData: TCreateContext = {
    employee,
    employer,
    setEmployer,
    setEmployee,
  };

  return <Provider value={contextData}>{children}</Provider>;
};

export default AuthContextProvider;
