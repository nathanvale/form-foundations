import * as transformHelper from './transform.helper';

describe('transform helper', () => {
  describe('toggle', () => {
    it('should return style mixin if value is true', () => {
      const mixin = 'mixin';
      const actual = transformHelper.toggle(mixin)(true);
      expect(actual).toBe(mixin);
    });
    it('should return empty string if value is false', () => {
      const mixin = 'mixin';
      const actual = transformHelper.toggle(mixin)(false);
      expect(actual).toBe('');
    });
  });
});
