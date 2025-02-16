import { useMutation, useQuery } from '@tanstack/react-query';
import EmployeeService from '@/services/employer/employee.service';
import { EmployeeAuthResponseDTO, EmployeeSignupRequestDTO } from './dtos/req/employee_signup.dto.req';
import { Employee } from '@/contexts/employerContext/authEmployeeContext';
import { TEmployeeProfile } from '@/@types/employer/auth/employer-profile';
import { TEmployerSignUpPayLoad } from '@/@types/employer/auth/auth-employer';

const employeeService = new EmployeeService();


export const useEmployeeSignup = ({ onSuccess, onError }) => {
	return useMutation(
		{
			mutationKey: ['employeeSignup'],
			mutationFn: async (employee: TEmployerSignUpPayLoad) => {
				const { data } = await employeeService.signup(employee);
				return data;
			},
			onSuccess,
			onError
		}
	);
};

export const useEmployeeSignin = ({ onSuccess, onError }) => {
	return useMutation<EmployeeAuthResponseDTO, Error, EmployeeAuthResponseDTO>(
		{
			mutationKey: ['employeeSignin'],
			mutationFn: async (employee: EmployeeAuthResponseDTO) => {
				const { data } = await employeeService.login(employee);
				return data;
			},
			onSuccess,
			onError
		}
	);
};

export const useEmployerVerify2FAOtp = ({ onSuccess, onError }) => {
	return useMutation(
		{
			mutationKey: ['employerVerify2FAOtp'],
			mutationFn: async ({ otp }: { otp: string }) =>
				await employeeService.employerVerify2FA({ otp }),
			onSuccess,
			onError
		}
	);
};

export const useSendEmployeeEmailOtp = () => {
	return useQuery(
		{
			queryKey: ['employeeSendOtp'],
			queryFn: async () => await employeeService.sendEmployeeEmailOtpFn(),
			enabled: false,
			retry: 2
		},
	);
};

export const useVerifyEmployeeEmailOtp = ({ onSuccess, onError }) => {
	const { isPending, mutate } = useMutation(
		{
			mutationKey: ['employeeVerifyOtp'],
			mutationFn: async (otp: number) => await employeeService.verifyEmployeeEmailOtpFn(otp),
			onSuccess,
			onError
		},
	);
	return { isPending, mutate }
};


interface MutationParams {
	employee: Employee;
	employeeId: string;
};
export const useUpdateEmployeeInfo = ({ onSuccess, onError }) => {
	return useMutation(
		{
			mutationKey: ['employeeUpdate'],
			mutationFn: async (data: TEmployeeProfile) => await employeeService.updateEmployeeInfoFn(data),
			onSuccess,
			onError
		}
	);
};

export const useEmployeeSigninWithRefreshToken = () => {
	return useMutation({
		mutationKey: ["loginEmployeeWithRefreshToken"],
		mutationFn: async (refreshToken: string) => {
			const { data } = await employeeService.loginWithRefreshToken(refreshToken);
			return data;
		},
	})
}
