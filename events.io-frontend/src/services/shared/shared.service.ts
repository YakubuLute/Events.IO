import Cookies from 'js-cookie'

import { encodeQuery } from '@/utils/params'
import { COOKIES_KEY } from '@/utils/setCookies'
import {
  ContactSupportRequestDTO,
  EventImageUpload,
  OrderBusinessCardRequestDTO,
  QrcodesQueryParams,
  ShippingFeesParamsDTO,
  VerifyCouponCodeRequestDTO
  // OrderedCardResponseDTO,
} from '@/hooks/shared/dtos'
import { AnalyticsFilterPayload } from '@/@types/candidate/candidate'
import { TGalleryPayload } from '@/@types/employer/employer'
import {
  EmpEventDetails,
  EventAttendeeData,
  EventDetail,
  EventRegistrationPayload,
  EventsFilterSchema,
  EventsResponse,
  EventTicket,
  NotifyAttendeesPayload,
  queryParamsOptions,
  ScanParams,
  ScanPayload,
  ScanUrlPayload,
  TEventPublish,
  ToggleActivateScanUrls,
  ToggleScanUrlAccess,
  TOptionPops,
  TQueryOptionPops,
  TResponseOptionsData,
  TResponseOptionsWithLogoData
} from '@/@types/shared/type'
import axios, {
  authApi
} from '../../../../../Vaurse-Frontend/vaurse-fr/vaurse-project/services/auth.service'
import HttpService, {
  formDataConfig
} from '../../../../../Vaurse-Frontend/vaurse-fr/vaurse-project/services/base.service'

class OptionsService extends HttpService<any> {
  private prefix: string = `shared`
  constructor () {
    super()
  }

  async getJobTitlesOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `candidates/options/job-titles?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getSkillsOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `candidates/options/skills?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getYearsOfExperienceOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `candidates/options/years-of-experiences?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getJobTypesOptions ({
    itemsPerPage,
    page,
    searchQuery = ''
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `/candidates/options/job-types?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getCurrencyOptions ({
    itemsPerPage,
    page = 1,
    searchQuery = ''
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `/candidates/options/currencies?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getAgeGroupOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `/candidates/options/age-groups?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getLanguagesOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `/candidates/options/languages?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getInterestsOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `/candidates/options/hobbies?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getEmploymentStatusOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `/candidates/options/employment-status?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getJobLocationTypeOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `/candidates/options/job-location-types?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getEducationCredentialOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `candidates/options/education-credentials?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getInstitutionsOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsWithLogoData> {
    const response = await axios.get(
      `candidates/options/institutions?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getAcademicDisciplineOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsWithLogoData> {
    const response = await axios.get(
      `candidates/options/academic-disciplines?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getSocialNetworkOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/social-networks?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getSupportPaymentOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/supported-payment-option?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getListCountriesOptions (
    params?: TOptionPops
  ): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/countries?itemsPerPage=${params?.itemsPerPage}&page=${params?.page}&q=${params?.searchQuery}`
    )
    return response.data
  }

  async getCountriesList (
    params?: queryParamsOptions
  ): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/countries?itemsPerPage=${params?.itemsPerPage}`
    )
    return response.data
  }

  async getPickupLocationOptions ({
    itemsPerPage,
    page,
    country,
    searchQuery
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await authApi.get(
      `shared/business-cards/pickup-locations/${country}?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getStatesList (
    params?: queryParamsOptions
  ): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/states/${params?.country}?itemsPerPage=${params?.itemsPerPage}`
    )
    return response.data
  }

  async getCitiesList (
    params?: queryParamsOptions
  ): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/countries/${params?.country}/states/${params?.state}/cities?itemsPerPage=${params?.itemsPerPage}`
    )
    return response.data
  }

  async getCitiesListWithoutState (
    params?: queryParamsOptions
  ): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/countries/${params?.country}/cities?itemsPerPage=${params?.itemsPerPage}`
    )
    return response.data
  }

  async getStateOptions ({
    itemsPerPage,
    page,
    country,
    searchQuery
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/states/${country}?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getCityOptions ({
    itemsPerPage,
    page,
    body,
    searchQuery
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/countries/${body?.country}/states/${body?.state}/cities?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getTimeZoneOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `candidates/options/timezones?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getEmployersOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TOptionPops): Promise<TResponseOptionsWithLogoData> {
    const response = await axios.get(
      `/employer/options?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getUniversityNotifications ({
    itemsPerPage,
    page
  }: {
    itemsPerPage: number
    page: number
  }) {
    return await this.get(
      `${this.prefix}/notifications?itemsPerPage=${itemsPerPage}&page=${page}`
    )
  }

  async getUniversityNotificationById (notificationId: string) {
    return await this.get(`${this.prefix}/notifications/${notificationId}`)
  }

  async getShortTimezomesOptions ({
    itemsPerPage,
    page,
    searchQuery
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `shared/options/short-timezones?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async getAllInstitutions ({
    itemsPerPage,
    page,
    searchQuery
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await axios.get(
      `/candidates/options/institutions?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response.data
  }

  async saveNewCreditCardFn () {
    const response = await this.post(`${this.prefix}/cards`, {})
    return response.data
  }

  async getAllCreditCardFn () {
    const response = await this.get(`${this.prefix}/cards`)
    return response.data
  }

  async deleteCreditCardByIdFn (cardId: string) {
    const response = await this.delete(`${this.prefix}/cards/${cardId}`)
    return response.data
  }

  async updateBillingDetailByCardIdFn ({
    cardId,
    data
  }: {
    cardId: string
    data: unknown
  }) {
    const response = await this.put(
      `${this.prefix}/cards/${cardId}/billing-details`,
      data
    )
    return response.data
  }

  async unacceptedEmailProvidersFn () {
    const response = await this.get(`${this.prefix}/unaccepted-email-providers`)
    return response.data
  }

  // --------------- Recognized DEVISE Services -------------

  async getRecognizedDevicesFn ({
    itemsPerPage = 10,
    page = 1
  }: TOptionPops): Promise<any> {
    const response = await this.get(
      `${this.prefix}/devices?itemsPerPage=${itemsPerPage}&page=${page}`
    )
    return response.data
  }

  async removeDeviceByIdFn (id: string): Promise<any> {
    const response = await this.delete(`${this.prefix}/devices/${id}`)
    return response.data
  }

  async getCountriesTelephoneCodes (params?: queryParamsOptions) {
    const response = await this.get(
      `${this.prefix}/options/countries/phone-codes?itemsPerPage=${params?.itemsPerPage}`
    )
    return response
  }

  async getCurrencies (params?: queryParamsOptions) {
    const response = await axios.get(
      `/candidates/options/currencies?itemsPerPage=${params?.itemsPerPage}`
    )
    return response
  }

  async getJobTypes (params?: queryParamsOptions) {
    const response = await axios.get(
      `/candidates/options/job-types?itemsPerPage=${params?.itemsPerPage}&page=${params?.page}&q=${params?.q}`
    )
    return response
  }

  async getExperienceLevels (params?: queryParamsOptions) {
    const response = await axios.get(
      `${this.prefix}/options/experience-levels?itemsPerPage=${params?.itemsPerPage}&page=${params?.page}&q=${params?.q}`
    )
    return response
  }

  // --------------- User Basic Info Services -------------
  async getCurrentUserBasicInfo () {
    const response = await this.get(`${this.prefix}/user/basic-info`)
    return response?.data
  }

  // --------------- Contact Support Ticket Services -------------
  async createSupportTicketFn (data: ContactSupportRequestDTO | Blob) {
    const response = await this.post(
      `${this.prefix}/support-tickets`,
      data,
      formDataConfig
    )
    return response?.data
  }

  async getSupportTicketSubjectsOptions (params: queryParamsOptions) {
    const response = await this.get(
      encodeQuery(`${this.prefix}/support-tickets/subjects`, {
        ...(params?.page && { page: params?.page }),
        ...(params?.itemsPerPage && { itemsPerPage: params?.itemsPerPage })
        // ...(params?.q && { q: params?.q }),
      })
    )
    return response?.data
  }

  async getEmployerGalleryImages (params: TGalleryPayload) {
    const response = await this.get(
      `${this.prefix}/organizations/${params.organizationId}/gallery?page=${params.page}&itemsPerPage=${params.itemsPerPage}`
    )
    return response?.data
  }

  async getEventCategories ({
    itemsPerPage,
    page,
    searchQuery
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await authApi.get(
      `/shared/events/filters/categories?itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response?.data
  }

  async getEventCountries ({
    itemsPerPage
  }: queryParamsOptions): Promise<TResponseOptionsData> {
    const response = await authApi.get(
      `/shared/events/filters/countries?itemsPerPage=${itemsPerPage}`
    )
    return response?.data
  }

  async getSharedEvents (
    params: EventsFilterSchema,
    isPublic?: boolean
  ): Promise<EventsResponse> {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    if (isPublic) {
      const response = await axios.get(`/shared/events?${queryString}`)
      return response?.data?.data
    }
    const response = await authApi.get(`/shared/events?${queryString}`)
    return response?.data?.data
  }

  async getSingleSharedEvent (
    eventId: string,
    isPublic?: boolean
  ): Promise<EventDetail> {
    if (isPublic) {
      const response = await axios.get(`/shared/events/${eventId}`)
      return response?.data?.data
    }
    const response = await authApi.get(`/shared/events/${eventId}`)
    return response?.data?.data
  }

  async getSharedEventAttendees (
    params: EventsFilterSchema,
    isPublic?: boolean
  ): Promise<EventAttendeeData> {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    if (isPublic) {
      const response = await axios.get(
        `/shared/events/attendees?${queryString}`
      )
      return response?.data?.data
    }
    const response = await authApi.get(
      `/shared/events/attendees?${queryString}`
    )
    return response?.data?.data
  }

  async getEventUsers ({
    itemsPerPage,
    page,
    searchQuery
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await authApi.get(
      `/shared/options/candidates?purpose=event&itemsPerPage=${itemsPerPage}&page=${page}&q=${searchQuery}`
    )
    return response?.data
  }

  async getEventUsersWithSearch ({
    itemsPerPage,
    page,
    searchQuery,
    q
  }: TQueryOptionPops): Promise<TResponseOptionsData> {
    const response = await authApi.get(
      `/shared/options/candidates?purpose=event&itemsPerPage=${itemsPerPage}&page=${page}&q=${q}&searchBy=${searchQuery}`
    )
    return response?.data
  }

  async registerEvent (payload: EventRegistrationPayload) {
    const response = await authApi.post(
      `/shared/events/${payload?.eventId}/register`,
      payload
    )
    return response.data
  }

  // -------------- Business Card Services -----------
  async getBusinessCardsFn () {
    const response = await this.get(`${this.prefix}/business-cards/specs`)
    return response.data
  }

  async getQRCodePreviewFn (params: QrcodesQueryParams) {
    const response = await this.get(
      `qrcodes/preview?value=${params?.value}&scale=${params?.scale}&bgColorHex=${params?.bgColorHex}&dotsColorHex=${params?.dotsColorHex}`
    )
    return response.data
  }

  async orderBusinessCardsFc (
    data: OrderBusinessCardRequestDTO | Blob | MediaSource,
    paymentOtp?: string
  ) {
    const headers = paymentOtp ? { 'x-payment-otp': paymentOtp } : undefined
    return await this.post(`${this.prefix}/business-cards/order`, data, {
      headers
    })
  }

  async getOrderedBusinessCardsFn (params: {
    page?: number
    itemsPerPage?: number
  }) {
    const response = await this.get(
      encodeQuery(`${this.prefix}/business-cards/orders`, {
        ...(params?.page && { page: params?.page }),
        ...(params?.itemsPerPage && { itemsPerPage: params?.itemsPerPage })
      })
    )
    return response.data
  }

  async verifyCouponCodeFn ({ type, couponCode }: VerifyCouponCodeRequestDTO) {
    const response = await this.get(
      `${this.prefix}/business-cards/${type}/coupons/${couponCode}/verify`
    )
    return response.data
  }

  async getShippingFeesFn (data: ShippingFeesParamsDTO) {
    const response = await this.get(
      `${this.prefix}/shipping-fees/${data.item}?country=${data.query.country}&state=${data.query.state}`
    )
    return response.data
  }

  async createNewEvent (payload: EmpEventDetails) {
    const response = await authApi.post(`/shared/events`, payload)
    return response.data
  }

  async updateEvent (payload: EmpEventDetails) {
    const response = await authApi.put(
      `/shared/events/${payload?._id}`,
      payload
    )
    return response.data
  }

  async creatEventTickets (payload: EventTicket) {
    const response = await authApi.put(
      `/shared/events/${payload._id}/tickets`,
      payload
    )
    return response.data
  }

  async publishEvent (payload: TEventPublish) {
    const response = await authApi.post(
      `/shared/events/${payload._id}/publish`,
      payload
    )
    return response.data
  }

  async uploadEventImage (payload: EventImageUpload) {
    try {
      const response = await authApi.post('/files', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading event image:', error)
      throw error
    }
  }

  async deleteEventImage (imagePath: any) {
    try {
      const response = await authApi.delete(imagePath)
      return response.data
    } catch (error) {
      console.error('Error deleting event image:', error)
      throw error
    }
  }

  async getEventsStatistics () {
    const response = await authApi.get(`/shared/events/statistics`)
    return response?.data
  }

  async getSingleEventStatistics (eventId: string) {
    const response = await authApi.get(`/shared/events/${eventId}/statistics`)
    return response?.data
  }

  async getAttendeesAnalyticsGraph (params: AnalyticsFilterPayload) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.get(
      `/shared/events/${params?.eventId}/attendees/graph?${queryString}`
    )
    return response.data
  }

  async getAttendeesAnalyticsEmployersOptions ({
    itemsPerPage,
    page,
    q,
    dateRange,
    eventId
  }: queryParamsOptions): Promise<TResponseOptionsData> {
    const response = await authApi.get(
      `/shared/events/${eventId}/attendees/graph/filters/employers?itemsPerPage=${itemsPerPage}&page=${page}&q=${q}&dateRange=${dateRange}`
    )
    return response?.data
  }

  async getAttendeesAnalyticsIndustriesOptions ({
    itemsPerPage,
    page,
    q,
    dateRange,
    eventId
  }: queryParamsOptions): Promise<TResponseOptionsData> {
    const response = await authApi.get(
      `/shared/events/${eventId}/attendees/graph/filters/industries?itemsPerPage=${itemsPerPage}&page=${page}&q=${q}&dateRange=${dateRange}`
    )
    return response?.data
  }

  async getAttendeesAnalyticsLocationsOptions ({
    itemsPerPage,
    page,
    q,
    dateRange,
    eventId
  }: queryParamsOptions): Promise<TResponseOptionsData> {
    const response = await authApi.get(
      `/shared/events/${eventId}/attendees/graph/filters/locations?itemsPerPage=${itemsPerPage}&page=${page}&q=${q}&dateRange=${dateRange}`
    )
    return response?.data
  }

  async getEventScanners (params: EventsFilterSchema) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.get(
      `/shared/events/${params?.eventId}/scanners?${queryString}`
    )
    return response.data
  }

  async deleteSingleEvent (eventId: string) {
    const response = await authApi.delete(`/shared/events/${eventId}`)
    return response?.data
  }

  async generateScanUrl (payload: ScanUrlPayload) {
    const response = await authApi.post(
      `/shared/events/${payload?.eventId}/scanners`,
      payload
    )
    return response?.data
  }

  async notifyAttendees (payload: NotifyAttendeesPayload) {
    const searchParams = new URLSearchParams()
    for (const key in payload) {
      searchParams.append(key, payload[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.post(
      `/shared/events/${payload?.eventId}/attendees/notify?${queryString}`,
      payload
    )
    return response?.data
  }

  async toggleActivateScanUrls (payload: ToggleActivateScanUrls) {
    const response = await authApi.patch(
      `/shared/events/${payload?.eventId}/scanners/activation/toggle`,
      payload
    )
    return response?.data
  }

  async toggleAccessScanUrls (payload: ToggleScanUrlAccess) {
    const response = await authApi.patch(
      `/shared/events/${payload?.eventId}/scanners/${payload?.scannerId}/status/toggle`,
      payload
    )
    return response?.data
  }

  async resetScanPassCode (payload: ToggleScanUrlAccess) {
    const response = await authApi.patch(
      `/shared/events/${payload?.eventId}/scanners/${payload?.scannerId}/pass-code/reset`,
      payload
    )
    return response?.data
  }

  async authenticateScan (payload: ScanParams) {
    const response = await axios.post(
      `/shared/events/${payload.eventId}/scanners/${payload.scannerId}/authenticate`,
      payload,
      {
        headers: {
          'x-organization-id': payload.employerId
        }
      }
    )
    return response?.data
  }

  async getBasicEvent (eventId: string) {
    const response = await axios.get(`/shared/events/${eventId}/basic`)
    return response.data
  }

  async scanQRCode (payload: ScanPayload) {
    const response = await axios.post(
      `/shared/events/attendees/scan`,
      payload,
      {
        headers: {
          'x-organization-id': payload.employerId,
          Authorization: `Bearer ${Cookies.get(COOKIES_KEY.SCAN_AUTH_TOKEN)}`
        }
      }
    )
    return response?.data
  }

  async getStatsWeeklyReport (params: EventsFilterSchema) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.get(
      `/shared/events/${params?.eventId}/report/stat/weekly?${queryString}`
    )
    return response.data
  }

  async getEventReportGraph (params: EventsFilterSchema) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.get(
      `/shared/events/${params?.eventId}/report/graph?${queryString}`
    )
    return response.data
  }

  async getEventRevenuePieChart (params: EventsFilterSchema) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.get(
      `/shared/events/${params?.eventId}/report/summary?${queryString}`
    )
    return response.data
  }

  async getEventRevenueBarChart (params: EventsFilterSchema) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.get(
      `/shared/events/${params?.eventId}/report/chart/revenue?${queryString}`
    )
    return response.data
  }

  async getEventAgeGroupBarChart (params: EventsFilterSchema) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.get(
      `/shared/events/${params?.eventId}/report/chart/age-groups?${queryString}`
    )
    return response.data
  }

  async getEventFiltersForChart (params: EventsFilterSchema) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    const queryString = searchParams.toString()
    const response = await authApi.get(
      `/shared/events/${params?.eventId}/attendees/graph/filters/${params?.category}?${queryString}`
    )
    return response.data
  }

  async markEventAttendence (eventId: string) {
    const response = await authApi.get(
      `/shared/events/${eventId}/attendees/mark-attendance`
    )
    return response.data
  }

  async getMomoPaymentStatusValidation (reference: string) {
    const response = await axios.get(
      `/shared/payments/momo/validate/${reference}`
    )
    return response.data
  }
}

export default OptionsService
