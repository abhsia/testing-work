import { SUCCESS_CODE } from '@/constants'
import { MockMethod } from 'vite-plugin-mock'

const timeout = 1000

export default [
  // 分析页统计接口
  {
    url: '/mock/analysis/total',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          users: 102400,
          messages: 81212,
          moneys: 9280,
          shoppings: 13600
        }
      }
    }
  },
  // 用户来源
  {
    url: '/mock/analysis/userAccessSource',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: [
          { value: 1000, name: 'analysis.directAccess' },
          { value: 310, name: 'analysis.mailMarketing' },
          { value: 234, name: 'analysis.allianceAdvertising' },
          { value: 135, name: 'analysis.videoAdvertising' },
          { value: 1548, name: 'analysis.searchEngines' }
        ]
      }
    }
  },
  // 每周用户活跃量
  {
    url: '/mock/analysis/weeklyUserActivity',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: [
          { value: 13253, name: 'analysis.monday' },
          { value: 34235, name: 'analysis.tuesday' },
          { value: 26321, name: 'analysis.wednesday' },
          { value: 12340, name: 'analysis.thursday' },
          { value: 24643, name: 'analysis.friday' },
          { value: 1322, name: 'analysis.saturday' },
          { value: 1324, name: 'analysis.sunday' }
        ]
      }
    }
  },

  // 每月销售额
  {
    url: '/mock/analysis/monthlySales',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: [
          { estimate: 100, name: 'analysis.january' },
          { estimate: 120, name: 'analysis.february' },
          { estimate: 161, name: 'analysis.march' },
          { estimate: 134, name: 'analysis.april' },
          { estimate: 105, name: 'analysis.may' },
          { estimate: 160, name: 'analysis.june' },
          { estimate: 165, name: 'analysis.july' },
          { estimate: 114, name: 'analysis.august' },
          { estimate: 163, name: 'analysis.september' },
          { estimate: 185, name: 'analysis.october' },
          { estimate: 118, name: 'analysis.november' },
          { estimate: 123, name: 'analysis.december' }
        ]
      }
    }
  }
] as MockMethod[]
