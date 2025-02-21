
import { useMutation, useQuery } from '@tanstack/react-query'
import eventService from '../services/eventService'
import { IUser, IEvent } from '../interface'

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
      await eventService.signup(userData),
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
    mutationFn: async (credentials: { email: string; password: string }) =>
      await eventService.signin(credentials),
    onSuccess,
    onError
  })
}

// Signin with Refresh Token Hook
export const useUserSigninWithRefreshToken = () => {
  return useMutation({
    mutationKey: ['userSigninWithRefreshToken'],
    mutationFn: async (refreshToken: string) =>
      await eventService.signinWithRefreshToken(refreshToken)
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
      await eventService.createEvent(eventData),
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
    }) => await eventService.updateEvent(eventId, eventData),
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
    mutationFn: async (eventId: string) =>
      await eventService.deleteEvent(eventId),
    onSuccess,
    onError
  })
}

// Fetch User's Events Hook
export const useUserEvents = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ['userEvents', userId],
    queryFn: async () => await eventService.getUserEvents(userId),
    enabled: !!userId && enabled,
    retry: 2
  })
}

// Fetch Current User Hook
export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => await eventService.getCurrentUser(),
    enabled,
    retry: 2
  })
}

// Fetch Organizers Hook
export const useOrganizers = (enabled = true) => {
  return useQuery({
    queryKey: ['organizers'],
    queryFn: async () => await eventService.getOrganizers(),
    enabled,
    retry: 2
  })
}

// Fetch All Events Hook
export const useAllEvents = (enabled = true) => {
  return useQuery({
    queryKey: ['allEvents'],
    queryFn: async () => await eventService.getAllEvents(),
    enabled,
    retry: 2
  })
}

// Send Email OTP Hook
export const useSendEmailOtp = () => {
  return useQuery({
    queryKey: ['sendEmailOtp'],
    queryFn: async () => await eventService.sendEmailOtp(),
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
    mutationFn: async (otp: string) => await eventService.verifyEmailOtp(otp),
    onSuccess,
    onError
  })
  return { isPending, mutate }
}
