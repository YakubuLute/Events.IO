import HttpService from '../../../../../Vaurse-Frontend/vaurse-fr/vaurse-project/services/base.service'

class FileUploadService extends HttpService<any> {
  constructor () {
    super()
  }

  async uploadFileToServerFn ({ formData }) {
    const response = await this.post(`files`, formData)
    return response.data
  }
}

export default FileUploadService
