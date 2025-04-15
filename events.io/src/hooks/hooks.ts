import { useMutation, useQuery } from '@tanstack/react-query'
import eventService from '@/services/events.service'
import { IUser, IEvent } from '@/interface/interface'

const service = new eventService()
// Signup Hook
export const useUserSignup = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: { user: IUser; token: string }) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationKey: ['userSignup'],
    mutationFn: async (userData: Partial<IUser>) =>
      await service.signup(userData),
    onSuccess,
    onError
  })
}

// Signin Hook
export const useUserSignin = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: {
    user: IUser
    token: string
    refreshToken: string
  }) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationKey: ['userSignin'],
    mutationFn: async (credentials: {
      email?: string
      phoneNumber?: string
      countryCode?: string
      password: string
    }) => {
      const data = await service.signin(credentials)
      return data
    },
    onSuccess,
    onError
  })
}

// Signin with Refresh Token Hook
export const useUserSigninWithRefreshToken = () => {
  return useMutation({
    mutationKey: ['userSigninWithRefreshToken'],
    mutationFn: async (refreshToken: string) =>
      await service.signinWithRefreshToken(refreshToken)
  })
}

// Refresh Token Hook
export const useRefreshToken = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: { token: string; refreshToken: string }) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async () => await service.refreshToken(),
    onSuccess,
    onError
  })
}

// Logout Hook
export const useLogout = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: { message: string }) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => await service.logout(),
    onSuccess,
    onError
  })
}

// Create Event Hook
export const useCreateEvent = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IEvent) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationKey: ['createEvent'],
    mutationFn: async (eventData: Partial<IEvent>) =>
      await service.createEvent(eventData),
    onSuccess,
    onError
  })
}

// Update Event Hook
export const useUpdateEvent = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: IEvent) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationKey: ['updateEvent'],
    mutationFn: async ({
      eventId,
      eventData
    }: {
      eventId: string
      eventData: Partial<IEvent>
    }) => await service.updateEvent(eventId, eventData),
    onSuccess,
    onError
  })
}

// Delete Event Hook
export const useDeleteEvent = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: { success: boolean }) => void
  onError?: (error: Error) => void
}) => {
  return useMutation({
    mutationKey: ['deleteEvent'],
    mutationFn: async (eventId: string) => await service.deleteEvent(eventId),
    onSuccess,
    onError
  })
}

// Fetch User's Events Hook
export const useUserEvents = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ['userEvents', userId],
    queryFn: async () => await service.getUserEvents(userId),
    enabled: !!userId && enabled,
    retry: 2
  })
}

// Fetch Current User Hook
export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => await service.getCurrentUser(),
    enabled,
    retry: 2
  })
}

// Fetch Organizers Hook
export const useOrganizers = (enabled = true) => {
  return useQuery({
    queryKey: ['organizers'],
    queryFn: async () => await service.getOrganizers(),
    enabled,
    retry: 2
  })
}

// Fetch All Events Hook
export const useAllEvents = (enabled = true) => {
  return useQuery({
    queryKey: ['allEvents'],
    queryFn: async () => await service.getAllEvents(),
    enabled,
    retry: 2
  })
}

// Send Email OTP Hook
export const useSendEmailOtp = () => {
  return useQuery({
    queryKey: ['sendEmailOtp'],
    queryFn: async () => await service.sendEmailOtp(),
    enabled: false,
    retry: 2
  })
}

// Verify Email OTP Hook
export const useVerifyEmailOtp = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: { success: boolean }) => void
  onError?: (error: Error) => void
}) => {
  const { isPending, mutate } = useMutation({
    mutationKey: ['verifyEmailOtp'],
    mutationFn: async (otp: string) => await service.verifyEmailOtp(otp),
    onSuccess,
    onError
  })
  return { isPending, mutate }
}

// Forgot Password Hook
export const useForgotPassword = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: { success: boolean; message: string; _dev_only_otp?: number; _dev_only_token?: string }) => void
  onError?: (error: Error) => void
}) => {
  const { isPending, mutate } = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: async (email: string) => await service.forgotPassword(email),
    onSuccess,
    onError
  })
  return { isPending, mutate }
}

// Reset Password Hook
export const useResetPassword = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: { success: boolean; message: string }) => void
  onError?: (error: Error) => void
}) => {
  const { isPending, mutate } = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (resetData: { email: string; otp?: number; token?: string; newPassword: string }) =>
      await service.resetPassword(resetData),
    onSuccess,
    onError
  })
  return { isPending, mutate }
}
