import { TPayloadQueryWalletTransaction } from '@/@types/shared/wallet'
import HttpService from '../../../../../Vaurse-Frontend/vaurse-fr/vaurse-project/services/base.service'
import { BuyCreditRequest } from '@/@types/shared/credit-card'

class WalletService extends HttpService<any> {
  private prefix: string = 'shared'
  private walletPrefix: string = 'wallets'

  constructor () {
    super()
  }

  async getDigitalWalletsFn () {
    const response = await this.get(`${this.prefix}/${this.walletPrefix}`)
    return response.data
  }

  async getDigitalTransactionSummaryFn () {
    const response = await this.get(
      `${this.prefix}/${this.walletPrefix}/transactions/summary`
    )
    return response.data
  }

  async getAllDigitalWalletTransactionFn ({
    page,
    itemsPerPage,
    filter
  }: {
    page: number
    itemsPerPage: number
    filter: TPayloadQueryWalletTransaction
  }) {
    const params = new URLSearchParams({
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
      ...filter
    })
    const response = await this.get(
      `${this.prefix}/${this.walletPrefix}/transactions?${params.toString()}`
    )
    return response.data
  }

  async getDigitalTransactionByIdFn (transactionId: string) {
    const response = await this.get(
      `${this.prefix}/${this.walletPrefix}/transactions/${transactionId}`
    )
    return response.data
  }

  async buyWalletCreditBalanceFn (data: BuyCreditRequest) {
    const response = await this.post(
      `${this.prefix}/${this.walletPrefix}/buy-credit`,
      data
    )
    return response.data
  }
}

export default WalletService
