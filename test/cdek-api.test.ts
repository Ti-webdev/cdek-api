import CdekApi from '../src/cdek-api'

declare var process: {
  env: {
    CDEK_ACCOUNT: string
    CDEK_SECURE_PASSWORD: string
  }
}

const { CDEK_ACCOUNT, CDEK_SECURE_PASSWORD } = process.env

/**
 * Dummy test
 */
describe('CDEK API test', () => {
  const cdek = new CdekApi(CDEK_ACCOUNT, CDEK_SECURE_PASSWORD)

  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('CdekApi is instantiable', () => {
    expect(cdek).toBeInstanceOf(CdekApi)
  })

  it(
    'getPPList',
    async () => {
      const response = await cdek.getPPList()
      expect(response.Pvz).toBeInstanceOf(Array)
    },
    30000
  )

  it(
    'statusReport',
    async () => {
      const response = await cdek.statusReport({
        _DispatchNumber: '1094801704'
      })
      expect(response.Order._DispatchNumber).toBe('1094801704')
    },
    30000
  )

  it(
    'statusReportForWrongNumber',
    async () => {
      await expect(
        cdek.statusReport({
          _DispatchNumber: '1094801700'
        })
      ).rejects.toThrow()
    },
    30000
  )
})
