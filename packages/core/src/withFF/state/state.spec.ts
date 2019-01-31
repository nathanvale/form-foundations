import {initialState, name, updaterName} from '../../../src/withFF/state/state'

describe('state', () => {
  describe('name', () => {
    it('should be configured correctly', () => {
      expect(name).toEqual('state')
    })
  })

  describe('updaterName', () => {
    it('should be configured correctly', () => {
      expect(updaterName).toEqual('setState')
    })
  })

  describe('initialState', () => {
    it('should be configured correctly', () => {
      expect(initialState()).toEqual({formStarted: false, active: {}})
    })
  })
})
