// src/services/eventService.ts
import api from './auth.service'
import { IUser, IEvent } from '@/interface/interface'

class EventService {
  async signup (userData: Partial<IUser>) {
    const response = await api.post<{
      user: IUser
      token: string
      refreshToken: string
    }>('/auth/signup', userData)
    return response.data
  }

  async signin (credentials: { email: string; password: string }) {
    const response = await api.post<{
      user: IUser
      token: string
      refreshToken: string
    }>('/auth/signin', credentials)
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
