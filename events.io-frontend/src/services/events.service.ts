// src/services/eventService.ts
import axios, { AxiosInstance } from 'axios'
import { IUser, IEvent } from '../interface'

class EventService {
  private api: AxiosInstance

  constructor () {
    this.api = axios.create({
      baseURL: '/api',
      withCredentials: true
    })

    this.api.interceptors.request.use(config => {
      return config
    })
  }

  // Signup
  async signup (userData: Partial<IUser>) {
    const response = await this.api.post<{ user: IUser; token: string }>(
      '/auth/signup',
      userData
    )
    return response.data
  }

  // Signin
  async signin (credentials: { email: string; password: string }) {
    const response = await this.api.post<{
      user: IUser
      token: string
      refreshToken: string
    }>('/auth/signin', credentials)
    return response.data
  }

  // Signin with refresh token
  async signinWithRefreshToken (refreshToken: string) {
    const response = await this.api.post<{
      user: IUser
      token: string
      refreshToken: string
    }>('/auth/refresh', { refreshToken })
    return response.data
  }

  // Create Event
  async createEvent (eventData: Partial<IEvent>) {
    const response = await this.api.post<IEvent>('/events/create', eventData)
    return response.data
  }

  // Update Event
  async updateEvent (eventId: string, eventData: Partial<IEvent>) {
    const response = await this.api.put<IEvent>(`/events/${eventId}`, eventData)
    return response.data
  }

  // Delete Event
  async deleteEvent (eventId: string) {
    const response = await this.api.delete<{ success: boolean }>(
      `/events/${eventId}`
    )
    return response.data
  }

  // Fetch User's Events (organized)
  async getUserEvents (userId: string) {
    const response = await this.api.get<IEvent[]>(`/events/user/${userId}`)
    return response.data
  }

  // Fetch Current User
  async getCurrentUser () {
    const response = await this.api.get<IUser>('/auth/me')
    return response.data
  }

  // Fetch Organizers
  async getOrganizers () {
    const response = await this.api.get<IUser[]>('/users/organizers')
    return response.data
  }

  // Fetch All Events
  async getAllEvents () {
    const response = await this.api.get<IEvent[]>('/events')
    return response.data
  }

  // Verify Email OTP
  async verifyEmailOtp (otp: string) {
    const response = await this.api.post<{ success: boolean }>(
      '/auth/verify-otp',
      { otp }
    )
    return response.data
  }

  // Send Email OTP
  async sendEmailOtp () {
    const response = await this.api.post<{ success: boolean }>('/auth/send-otp')
    return response.data
  }
}

export default new EventService()
