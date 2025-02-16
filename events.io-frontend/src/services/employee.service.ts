import { TEmployeePasswordUpdatedSchema } from '@/components/employer/accountSettings/passwordCard';
import {
  BookmarkProfileToGroupRequestDTO,
  ShortlistCandidateProfileRequestDTO,
} from '@/hooks/employer/dtos';
import { EmployeeSignRequestDTO } from '@/hooks/employer/dtos/req/employee_signin.dto.req';
import { TEmployerSignUpPayLoad } from '@/@types/employer/auth/auth-employer';
import { TEmployeeProfile } from '@/@types/employer/auth/employer-profile';
import {
  AddNewTeamMateToPositionRequest,
  deleteTeamMateToPositionRequest,
  JobFilterSchema,
  TEmployerInterviewFeedbackPayload,
  TEmployerInterviewResponsePayload,
  TEmployerProfile,
  TEmployerProfileDetails,
  TEmployerSendOfferPayload,
  TEmployerSharePosition,
  TEmployerVerificationRequest,
  TGetInterviewFeedbackPayload,
  TInterviewDiscussionPayload,
} from '@/@types/employer/employer';
import {
  // TResponseOptionsData,
  queryParamsInterviewedCandidates,
  queryParamsOptions,
  queryParamsType,
  TEmployerGroup,
  TPhotoUpload,
  TProfile,
  TResetPasswordData,
  TResponseOptionsData,
  UserTypes,
} from '@/@types/shared/type';
import HttpService, {
  axiosInstanceFn,
  axiosInstancePublic,
  formDataConfig,
} from '../base.service';

// here we need to remove this any type and provide a specific type.
class EmployeeService extends HttpService<any> {
  private prefix: string = `employee`;
  constructor() {
    super();
  }
  async signup(data: TEmployerSignUpPayLoad) {
    return await this.post(`${this.prefix}/signup`, data);
  }

  async login(data: EmployeeSignRequestDTO) {
    return await this.post(`${this.prefix}/login`, data);
  }

  async employerVerify2FA({ otp }) {
    const response = await this.get(`${this.prefix}/login/2fa?otp=${otp}`);
    return response.data;
  }

  async loginWithRefreshToken(refreshToken: string) {
    return await this.post(`${this.prefix}/login/refreshtoken`, {
      refreshToken,
    });
  }

  async updateEmployeeInfoFn(data: TEmployeeProfile) {
    const response = await this.patch(`employee/profile`, data);
    return response.data;
  }

  async getEmployeeInfo() {
    return await this.get(`${this.prefix}/profile`);
  }

  async sendEmployeeEmailOtpFn() {
    const response = await this.get(
      `${this.prefix}/kyc/email-verification-otp`
    );
    return response.data;
  }

  async verifyEmployeeEmailOtpFn(otp: number) {
    const response = await this.get(
      `${this.prefix}/kyc/email-verification?otp=${otp}`
    );
    return response.data;
  }

  async addEmployerProfileDetailsFn(data: TEmployerProfileDetails) {
    const response = await this.patch(`employer`, data);
    return response.data;
  }

  async updatedSingleStaffMemberEmployer(data: any) {
    const response = await this.put(`${this.prefix}/staff/${data._id}`, data);
    return response.data;
  }

  async updateEmployerInfoFn(data: TEmployerProfileDetails) {
    const response = await this.patch(`employer`, data);
    return response.data;
  }
  async updateEmployerBenefits(data: TEmployerProfileDetails) {
    const response = await this.patch(`employer`, data);
    console.log(response.data);
    return response.data;
  }

  async uploadEmployerCoverPhotoFn(data: TPhotoUpload) {
    const response = await this.put(
      `employer/cover-photo`,
      data,
      formDataConfig
    );
    return response.data;
  }

  async uploadEmployerLogoPictureFn(data: FormData) {
    const response = await this.put(`employer/logo`, data, formDataConfig);
    return response.data;
  }

  async uploadEmployeeProfilePictureFn(data: FormData) {
    const response = await this.put(
      `employee/profile-photo`,
      data,
      formDataConfig
    );
    return response.data;
  }

  async sendEmployerForgotPassword(data: { email: string }) {
    const response = await axiosInstancePublic.post(
      'auth/password/reset/email/otp',
      {
        email: data.email,
        userType: UserTypes.EMPLOYEE,
      }
    );
    return response.data;
  }

  async verifyEmployerOtpForgotPasswordFn(data: {
    otp: number;
    recipient: string;
  }) {
    const response = await axiosInstancePublic.post(
      `shared/otp/emails/verification?otp=${data.otp}&recipient=${data.recipient}`,
      null
    );
    return response.data;
  }

  async resetEmployerNewPasswordFn(data: TResetPasswordData) {
    const response = await axiosInstancePublic.post(
      `auth/password/reset?otp=${data.otp}&recipient=${data.recipient}`,
      {
        password: data.password,
        userType: UserTypes.EMPLOYEE,
      }
    );
    return response.data;
  }

  // ----------------------------- Employer Positions Service -------------------
  async getEmployerPositionsWithoutParam() {
    const response = await this.get('employer/positions');
    return response.data;
  }

  async getEmployerPositions(params: JobFilterSchema) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key]);
    }
    const queryString = searchParams.toString();
    const response = await this.get(`employer/positions?${queryString}`);
    return response?.data;
  }

  async getEmployerPosition(id: string) {
    const response = await this.get(`employer/positions/${id}`);
    return response?.data;
  }

  // -------------------- Employer Position ID Candidates Resultt -------------------

  // TODO: move it into the employer position service
  async getRecommendatedCandidates(id: string) {
    return await this.get(
      `employer/positions/${id}/candidates/recommendations`
    );
  }

  async getInterestedCandidates(id: string) {
    return await this.get(`employer/positions/${id}/candidates/interested`);
  }

  async getShortlistCandidates(id: string) {
    return await this.get(`employer/positions/${id}/candidates/shortlist`);
  }

  async getInvitedForInterviewCandidates(id: string) {
    return await this.get(
      `employer/positions/${id}/candidates/invited-for-interview`
    );
  }

  async getHiredCandidates(id: string) {
    return await this.get(`employer/positions/${id}/candidates/hired`);
  }

  // async getEmployerPositionsOptions( // TODO: remove this function and fix the bug
  //   {
  //     itemsPerPage, page, q
  //   }: queryParamsOptions): Promise<TResponseOptionsData> {
  //   const response = await this.get(
  //     `employer/options/positions?itemsPerPage=${itemsPerPage}&page=${page}&q=${q}`
  //   )
  //   return response.data;
  // }

  async getEmployerPositionsOptions(params: queryParamsOptions) {
    const queryString = this.createQueryStrings(params || {});
    const response = await this.get(
      `employer/options/positions?${queryString}`
    );
    return response.data;
  }

  async getInterviewedCandidatesOptions(
    params: queryParamsInterviewedCandidates
  ) {
    const queryString = this.createQueryStrings(
      {
        ...params,
        ...(params.positionId && { positionId: params.positionId }),
      } || {}
    );

    const response = await this.get(
      `employer/options/positions/interviewed-candidates?${queryString}`
    );
    return response.data;
  }

  async addNewTeamMateToPosition(data: AddNewTeamMateToPositionRequest) {
    const response = await this.patch(
      `employer/positions/${data?.params?.id}/team-mates/new/${data?.params?.employeeId}`,
      data.payload
    );
    return response.data;
  }

  async deleteTeamMateToPosition(data: deleteTeamMateToPositionRequest) {
    const response = await this.patch(
      `employer/positions/${data?.params?.id}/team-mates/remove/${data?.params?.employeeId}`,
      {}
    );
    return response.data;
  }

  // ----------------------------- Employer GROUPS Services -------------------
  async getEmployerGroupsOptions(params: queryParamsOptions) {
    const queryString = this.createQueryStrings(params || {});
    const response = await this.get(`employer/options/groups?${queryString}`);
    return response.data;
  }

  async getEmployerGroups(params: queryParamsType) {
    const queryString = this.createQueryStrings(params);
    return await this.get(`employer/groups?${queryString}`);
  }

  async createEmployerGroup(data: TEmployerGroup) {
    return await this.post('employer/groups', data);
  }

  async sharePosition(data: TEmployerSharePosition) {
    return await this.post('employer/positions/share', data);
  }

  // ------------------- BOOKMARKS Candidate Profile To Group Service -----------------
  async bookmarkCandidateProfileToGroup(
    data: BookmarkProfileToGroupRequestDTO
  ) {
    const response = await this.post(
      `employer/groups/${data?.groupId}/bookmarks`,
      data.payload
    );
    return response?.data;
  }

  // ------------------ Add to SHORTLIST Candidate Profile Service --------------
  async addCandidateProfileToShortlist(
    params: ShortlistCandidateProfileRequestDTO
  ) {
    const response = await this.post(
      `employer/positions/${params.positionId}/candidates/shortlist/${params.candidateId}`,
      ''
    );
    return response?.data;
  }

  // ------------------- Get Candidate Extra Details Service --------------------
  async getCandidateExtraDetails(params: {
    positionId: string;
    candidateId: string;
  }) {
    return await this.get(
      `employer/positions/${params.positionId}/candidates/${params.candidateId}/details`
    );
  }

  async getEmployerVerificationRequest(params: queryParamsType) {
    const queryString = this.createQueryStrings(params);
    // console.log('Get query string ', queryString);
    return await this.get(`employer/verifications?${queryString}`);
  }

  async UpdateEmployerVerificationRequest(data: {
    verificationRequestId: string;
    payload: TEmployerVerificationRequest;
  }) {
    const { verificationRequestId, payload } = data;
    return await this.put(
      `employer/verifications/${verificationRequestId}`,
      payload
    );
  }

  async getEmployerVerificationStatistics() {
    return await this.get(`employer/verifications/statistics`);
  }

  // verification settings
  async getVerificationSettings() {
    return await this.get(`employer/settings`);
  }

  async updateVerificationSettings(data: {
    verificationCharge: number;
    currency: string;
  }) {
    return await this.put(`employer/settings`, data);
  }

  async addTeamMemberToVerificationSettings(employeeId: string) {
    return await this.put(
      `employer/settings/verification/team-mates/new/${employeeId}`
    );
  }

  async removeTeamMemberFromVerificationSettings(employeeId: string) {
    return await this.put(
      `employer/settings/verification/team-mates/remove/${employeeId}`
    );
  }

  async getEmployeesForVerification(queryParams: queryParamsType) {
    const queryString = this.createQueryStrings(queryParams);
    return await this.get(`employer/options/employees?${queryString}`);
  }

  // create recommendation to employer
  async employerCreateRecommendation(data: {
    candidateId: string;
    recommendation: string;
  }) {
    return await this.post(`employer/candidates/recommendations`, data);
  }

  // approve or decline a verification request
  async employerApproveOrDeclineVerificationRequest(data: {
    payload: { status: string; declinedReason?: string };
    verificationRequestId: string;
  }) {
    const { verificationRequestId, payload } = data;
    return await this.post(
      `employer/verifications/${verificationRequestId}/response`,
      payload
    );
  }

  async addSingleTeamMemberEmployer(data: TProfile) {
    const response = await this.post('employer/employees', data);
    return response?.data;
  }

  // fetch all employer employees
  async getAllEmployersEmployees(
    employerId?: string,
    queryParams: Record<string, string> = {}
  ): Promise<any> {
    const params = new URLSearchParams({
      ...(employerId && { employerId: employerId.toString() }),
    });

    Object.entries(queryParams).map(([key, value]) => {
      params.append(key, value);
    });

    const response = await this.get(
      `employer/candidates-you-know?${params.toString()}`
    );
    return response?.data;
  }

  // --------------------- employer EMPLOYEES Service ---------------
  async getAllEmployeEmployeesFn({
    searchQuery,
    filterStatus,
    itemsPerPage,
    page,
  }: {
    searchQuery: string;
    filterStatus: string;
    itemsPerPage: string;
    page: string;
  }): Promise<any> {
    const response = await this.get(
      `employer/employees?search=${searchQuery}&visibility=${filterStatus}&itemsPerPage=${itemsPerPage}&page=${page}`
    );
    return response.data?.data;
  }

  async updatedASingleEmployeeEmployerInfo(data: TProfile) {
    const response = await axiosInstanceFn.put(
      `employer/employees/${data._id}`,
      data
    );
    return response.data;
  }
  async updatedSingleEmployeeEmployer(data: TEmployerProfile) {
    const response = await this.put(
      `employer/employees/${data._id}`,
      data,
      formDataConfig
    );
    return response.data;
  }

  async deleteSingleEmployeeMemberById(employeeId: string) {
    const response = await this.delete(`employer/employees/${employeeId}`);
    return response.data;
  }

  async importEmployeeCsvDataFn(data) {
    const response = await this.post(
      `employer/employees/import`,
      data,
      formDataConfig
    );
    return response.data;
  }

  async sendEmployerEmployeeInvitationFn() {
    const response = await this.get(`employer/employees/invite/remind`);
    return response.data;
  }

  async addEmployerEmployeeAndInvitationFn(data: {
    emails: string[];
    role: string;
  }) {
    const response = await this.post(`employer/employees/invite`, data);
    return response.data;
  }

  async sendEmployerEmployeeInvitationByIdFn(EmployeeId: string) {
    const response = await this.get(
      `employer/employees/${EmployeeId}/resend-onboard-request`
    );
    return response.data;
  }

  async sendEmployeeInvitationByIdFn(employeeId: string) {
    const response = await this.get(
      `employer/employees/${employeeId}/resend-onboard-request`
    );
    return response.data;
  }

  async updatedEmployeeStaffProfilePictureFn(data: TPhotoUpload) {
    const response = await this.put(
      `${this.prefix}/profile-photo`,
      data,
      formDataConfig
    );
    return response.data;
  }

  async getGroupById(groupId: string) {
    const response = await this.get(`employer/groups/${groupId}`);
    return response.data;
  }

  async updateGroupById(data: { groupId: string; payload: TEmployerGroup }) {
    const { groupId, payload } = data;
    const response = await this.put(`employer/groups/${groupId}`, payload);
    return response.data;
  }

  async addTeamMemberToGroup(data: { groupId: string; staffId: string }) {
    const { groupId, staffId } = data;
    const response = await this.put(
      `employer/groups/${groupId}/team-mates/new/${staffId}`
    );
    return response.data;
  }

  async removeTeamMemberFromGroup(data: { groupId: string; staffId: string }) {
    const { groupId, staffId } = data;
    const response = await this.put(
      `employer/groups/${groupId}/team-mates/remove/${staffId}`
    );
    return response.data;
  }
  // remove bookmarks
  async removeGroupBookmarks(data: { groupId: string; bookmarkId: string }) {
    const { groupId, bookmarkId } = data;
    const response = await this.delete(
      `employer/groups/${groupId}/bookmarks/${bookmarkId}`
    );
    return response.data;
  }

  async updateEmployerGroupById(data: {
    groupId: string;
    name: string;
    description: string;
  }) {
    const { groupId, name, description } = data;
    const response = await this.put(`employer/groups/${groupId}`, {
      name,
      description,
    });
    return response.data;
  }

  // Employer Bookmark

  async getGroupBookmarks(params: queryParamsType, groupId: string) {
    const queryString = this.createQueryStrings(params);
    return await this.get(
      `employer/groups/${groupId}/bookmarks?${queryString}`
    );
  }

  //  ---- employee password --
  async updatedEmployeePasswordFn(data: TEmployeePasswordUpdatedSchema) {
    const response = await this.put(`${this.prefix}/profile/password`, data);
    return response.data;
  }

  async sendEmployeePhoneVerification(data: { phoneNumber: string }) {
    const response = await this.post(`${this.prefix}/auth/2FA`, data);
    return response.data;
  }

  async verifyEmployeeOPTCodeFn(data: { recipient: string; otp: string }) {
    const response = await this.get(
      `${this.prefix}/auth/2fa/complete-setup?recipient=${data.recipient}&otp=${data.otp}`
    );
    return response.data;
  }

  async getEmployerPositionsJobTitlesOptions(params: queryParamsOptions) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key]);
    }
    const queryString = searchParams.toString();
    const response = await this.get(
      `employer/positions/filters/job-titles?${queryString}`
    );
    return response.data;
  }

  async getEmployerPositionsLocationsOptions(params: queryParamsOptions) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key]);
    }
    const queryString = searchParams.toString();
    const response = await this.get(
      `employer/positions/filters/locations?${queryString}`
    );
    return response.data;
  }

  async getEmployerPositionsSkillsOptions(params: queryParamsOptions) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key]);
    }
    const queryString = searchParams.toString();
    const response = await this.get(
      `employer/positions/filters/skills?${queryString}`
    );
    return response.data;
  }

  async getEmployerPositionsJobTypesOptions(params: queryParamsOptions) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key]);
    }
    const queryString = searchParams.toString();
    const response = await this.get(
      `employer/positions/filters/job-types?${queryString}`
    );
    return response.data;
  }

  async getEmployerPositionsWorkplaceTypesOptions(params: queryParamsOptions) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key]);
    }
    const queryString = searchParams.toString();

    const response = await this.get(
      `employer/positions/filters/workplace-types?${queryString}`
    );
    return response.data;
  }

  async employerInterviewResponse(payload: TEmployerInterviewResponsePayload) {
    const response = await this.patch(
      `employer/positions/interviews/${payload?.interviewId}/stages/${payload?.stageId}/response`,
      payload
    );
    return response.data;
  }

  async getInterviewFeedbacks(params: TGetInterviewFeedbackPayload) {
    const response = await this.get(
      `employer/positions/interviews/${params?.interviewId}/stages/${params?.stageId}/feedbacks?page=${params?.page}&itemsPerPage=${params?.itemsPerPage}`
    );
    return response.data;
  }

  async addInterviewFeedback(payload: TEmployerInterviewFeedbackPayload) {
    const response = await this.post(
      `employer/positions/interviews/${payload?.interviewId}/stages/${payload?.stageId}/feedbacks`,
      payload
    );
    return response.data;
  }

  async employerInterviewSendOffer(payload: TEmployerSendOfferPayload) {
    const response = await this.post(
      `employer/positions/interviews/${payload?.interviewId}/job-offer`,
      payload
    );
    return response.data;
  }

  async getInterviewDiscussions(params: TGetInterviewFeedbackPayload) {
    const response = await this.get(
      `employer/positions/interviews/${params?.interviewId}/discussion?page=${params?.page}&itemsPerPage=${params?.itemsPerPage}`
    );
    return response.data;
  }

  async employerInterviewPostDiscussion(payload: TInterviewDiscussionPayload) {
    const response = await this.post(
      `employer/positions/interviews/${payload?.interviewId}/discussion`,
      payload
    );
    return response.data;
  }
}

export default EmployeeService;
