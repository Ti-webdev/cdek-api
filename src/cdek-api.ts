import Axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as qs from 'querystring'
import * as X2JS from 'x2js'
import { Md5 } from 'ts-md5/dist/md5'
import * as assert from 'assert'

const x2js = new X2JS()

// class CdekApiError extends Error {
//   constructor(public message: string, public code: string) {
//     super(message)
//     this.code = code
//   };
// }

export default class CdekApi {
  public baseURL = 'https://integration.cdek.ru'

  public options = {
    timeout: 30000
  }

  constructor(public account: string, public securePassword: string) {}

  private _instance: undefined | AxiosInstance

  get instance(): AxiosInstance {
    if (!this._instance) {
      const { baseURL, options } = this
      this._instance = Axios.create({
        baseURL,
        ...options
      })
    }
    return this._instance
  }

  private parseXmlResponse(response: AxiosResponse) {
    const { status } = response
    assert.strictEqual(status, 200)

    const jsonObj = x2js.xml2js(response.data) as any
    const [key] = Object.keys(jsonObj)
    const result = jsonObj[key]
    if (result._ErrorCode) {
      // throw new CdekApiError(result._Msg, result._ErrorCode);
      throw new Error(result._Msg)
    }
    return result
  }

  private async post(url: string, data: any) {
    const xmlString = x2js.js2xml(data)
    const formData = qs.stringify({ xml_request: xmlString })
    return this.parseXmlResponse(
      await this.instance.post(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    )
  }

  private getSecure(dateString: string) {
    return Md5.hashStr(`${dateString}&${this.securePassword}`)
  }

  statusReport(Order: any) {
    const date = new Date().toISOString()
    return this.post('/status_report_h.php', {
      StatusReport: {
        _Account: this.account,
        _Secure: this.getSecure(date),
        _Date: date,
        _ShowHistory: '1',
        Order
      }
    })
  }

  async getPPList() {
    return this.parseXmlResponse(await this.instance.get('/pvzlist/v1/xml'))
  }
}
