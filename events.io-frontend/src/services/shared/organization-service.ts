import {
  DeleteSchoolEventCommentRequestDTO,
  DislikeSchoolEventCommentRequestDTO,
  EditSchoolEventCommentRequestDTO,
  EditSchoolEventRequestDTO,
  EventQueryParams,
  LikeSchoolEventCommentRequestDTO,
  NewSchoolEventCommentReplyRequestDTO,
  NewSchoolEventCommentRequestDTO,
  NewSchoolEventRequestDTO,
  queryParamsType,
  RemoveSchoolEvenPhotoRequestDTO
} from '@/hooks/university'
import HttpService, {
  formDataConfig
} from '../../../../../Vaurse-Frontend/vaurse-fr/vaurse-project/services/base.service'

class OrganizationService extends HttpService<any> {
  private prefix: string = `shared`
  private eventsPrefix: string = `shared/events`

  constructor () {
    super()
  }

  async getOrganizationProfileFn (organizationId: string) {
    const response = await this.get(
      `${this.prefix}/organizations/${organizationId}/profile`
    )
    return response.data
  }

  // ----------- University & Employer EVENTS services -----------------------------------------

  async getSchoolEvents (params: EventQueryParams) {
    const queryParams = new URLSearchParams({
      ...(params.page && { page: params.page.toString() }),
      ...(params.search && { search: params.search.toString() }),
      ...(params.itemsPerPage && {
        itemsPerPage: params.itemsPerPage.toString()
      }),
      ...(params.filterBy && { filterBy: params.filterBy.toString() }),
      ...(params.schoolId && { schoolId: params.schoolId.toString() }),
      ...(params.date && { date: params.date.toString() })
    })

    return await this.get(`${this.eventsPrefix}?${queryParams.toString()}`)
  }

  async getSchoolEvent (eventId: string) {
    return await this.get(`${this.eventsPrefix}/${eventId}`)
  }

  async createSchoolEvent (data: NewSchoolEventRequestDTO) {
    return await this.post(`${this.eventsPrefix}`, data, formDataConfig)
  }

  async updateSchoolEvent (data: EditSchoolEventRequestDTO) {
    return await this.put(
      `${this.eventsPrefix}/${data.params.id}`,
      data.payload,
      formDataConfig
    )
  }

  async removeSchoolEventPhoto (data: RemoveSchoolEvenPhotoRequestDTO) {
    return await this.put(
      `${this.eventsPrefix}/${data.params.eventId}/remove-photos`,
      data.payload
    )
  }

  async deleteSchoolEvent (id: string) {
    return await this.delete(`${this.eventsPrefix}/${id}`)
  }

  // -------------------------- Event ATTENDEES services -------------------------------

  async getSchoolEventAttendees (eventId: string) {
    return await this.get(`${this.eventsPrefix}/${eventId}/attendees`)
  }

  async attendSchoolEvent (eventId: string) {
    return await this.get(`${this.eventsPrefix}/${eventId}/register`)
  }

  // -------------------------- Event BOOKMARK services ---------------------------------

  async bookmarkSchoolEvent (eventId: string) {
    return await this.post(`${this.eventsPrefix}/${eventId}/bookmark`, '')
  }

  // -------------------------- Event COMMENTS services ---------------------------------

  async getSchoolEventComments (eventId: string) {
    return await this.get(`${this.eventsPrefix}/${eventId}/comments`)
  }

  async getEventComments (params: queryParamsType) {
    const response = await this.get(
      `${this.eventsPrefix}/${params.eventId}/comments?itemsPerPage=${params.itemsPerPage}&page=${params.page}`
    )
    return response.data
  }

  async getSchoolEventComment (eventId: string, commentId: string) {
    return await this.get(
      `${this.eventsPrefix}/${eventId}/comments/${commentId}`
    )
  }

  async createSchoolEventComment (data: NewSchoolEventCommentRequestDTO) {
    return await this.post(
      `${this.eventsPrefix}/${data.params.eventId}/comments`,
      data.payload
    )
  }

  async updateSchoolEventComment (data: EditSchoolEventCommentRequestDTO) {
    return await this.patch(
      `${this.eventsPrefix}/${data.params.eventId}/comments/${data.params.commentId}`,
      data.payload
    )
  }

  async deleteSchoolEventComment (data: DeleteSchoolEventCommentRequestDTO) {
    return await this.delete(
      `${this.eventsPrefix}/${data.eventId}/comments/${data.commentId}`
    )
  }

  // -------------------------- Event comment LIKES services -------------------------

  async likeSchoolEventComment (data: LikeSchoolEventCommentRequestDTO) {
    return await this.post(
      `${this.eventsPrefix}/${data?.eventId}/comments/${data?.commentId}/like`,
      ''
    )
  }

  async dislikeSchoolEventComment (data: DislikeSchoolEventCommentRequestDTO) {
    return await this.post(
      `${this.eventsPrefix}/${data?.eventId}/comments/${data?.commentId}/dislike`,
      ''
    )
  }

  // -------------------------- Event comment REPLIES services -------------------------

  async getSchoolEventCommentReplies (eventId: string, commentId: string) {
    return await this.get(
      `${this.eventsPrefix}/${eventId}/comments/${commentId}/replies`
    )
  }

  async createSchoolEventCommentReply (
    data: NewSchoolEventCommentReplyRequestDTO
  ) {
    return await this.post(
      `${this.eventsPrefix}/${data.params.eventId}/comments/${data.params.commentId}/replies`,
      data.payload
    )
  }
}

export default OrganizationService
