import { TMFAResendData } from '@/@types/shared/type'
import HttpService from '../../../../../Vaurse-Frontend/vaurse-fr/vaurse-project/services/base.service'
import axios from '../../../../../Vaurse-Frontend/vaurse-fr/vaurse-project/services/auth.service'

export default class MFAService extends HttpService<any> {
  private prefix: string = `shared`
  constructor () {
    super()
  }

  /**
   * @description this is used to resend MFA
   * @param param
   * @returns
   */
  async resendMFA (mfaToken: string): Promise<TMFAResendData> {
    const response = await axios.get(`${this.prefix}/mfa/resend/${mfaToken}`)
    return response?.data
  }
}
