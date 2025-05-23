// src/services/eventService.ts
import api from './auth.service'
import { IUser, IEvent } from '@/interface/interface'

class EventService {
  async signup (userData: Partial<IUser>) {
    const response = await api.post<{
      user: IUser
      token: string
      refreshToken: string
    }>('/auth/register', userData)
    return response.data
  }
  async signin (credentials: {
    email?: string
    phoneNumber?: string
    countryCode?: string
    password: string
  }) {
    const response = await api.post<{
      user: IUser
      token: string
      refreshToken: string
    }>('/auth/login', credentials)
    return response.data
  }

  async signinWithRefreshToken (refreshToken: string) {
    const response = await api.post<{
      user: IUser
      token: string
      refreshToken: string
    }>('/auth/refresh', { refreshToken })
    return response.data
  }

  async refreshToken () {
    // No need to pass refreshToken in the body; it’s sent via cookies with withCredentials: true
    const response = await api.post<{
      token: string
      refreshToken: string
    }>('/auth/refresh', {}) // Empty body, relies on cookie
    return response.data
  }

  async logout () {
    const response = await api.post<{ message: string }>('/auth/logout')
    return response.data
  }

  async forgotPassword (email: string) {
    const response = await api.post<{ success: boolean; message: string; _dev_only_otp?: number; _dev_only_token?: string }>('/auth/forgot-password', { email })
    return response.data
  }

  async resetPassword (resetData: { email: string; otp?: number; token?: string; newPassword: string }) {
    const response = await api.post<{ success: boolean; message: string }>('/auth/reset-password', resetData)
    return response.data
  }
  async createEvent (eventData: Partial<IEvent>) {
    const response = await api.post<IEvent>('/events/create', eventData)
    return response.data
  }

  async updateEvent (eventId: string, eventData: Partial<IEvent>) {
    const response = await api.put<IEvent>(`/events/${eventId}`, eventData)
    return response.data
  }

  async deleteEvent (eventId: string) {
    const response = await api.delete<{ success: boolean }>(
      `/events/${eventId}`
    )
    return response.data
  }

  async getUserEvents (userId: string) {
    const response = await api.get<IEvent[]>(`/events/user/${userId}`)
    return response.data
  }

  async getCurrentUser () {
    const response = await api.get<IUser>('/auth/me')
    return response.data
  }

  async getOrganizers () {
    const response = await api.get<IUser[]>('/users/organizers')
    return response.data
  }

  async getAllEvents () {
    const response = await api.get<IEvent[]>('/events')
    return response.data
  }

  async verifyEmailOtp (otp: string) {
    const response = await api.post<{ success: boolean }>('/auth/verify-otp', {
      otp
    })
    return response.data
  }

  async sendEmailOtp () {
    const response = await api.post<{ success: boolean }>('/auth/send-otp')
    return response.data
  }
}

export default EventService
