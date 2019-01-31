import * as boxStyleHelper from './boxStyle.helper'

describe('Box Helpers', () => {
  describe('marginTop', () => {
    it('should output style for marginTop at a XS breakpoint', () => {
      const expected = boxStyleHelper.marginTop()(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginTop at a SM breakpoint', () => {
      const expected = boxStyleHelper.marginTop('SM')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginTop at a MD breakpoint', () => {
      const expected = boxStyleHelper.marginTop('MD')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginTop at a LG breakpoint', () => {
      const expected = boxStyleHelper.marginTop('LG')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginTop at a XL breakpoint', () => {
      const expected = boxStyleHelper.marginTop('XL')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should throw an error with an invalid breakpoint', () => {
      function test() {
        boxStyleHelper.marginTop('invalid breakpoint')
      }
      expect(test).toThrowError('Breakpoints must be SM, MD, LG or XL')
    })
  })
  describe('marginRight', () => {
    it('should output style for marginRight at a XS breakpoint', () => {
      const expected = boxStyleHelper.marginRight()(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginRight at a SM breakpoint', () => {
      const expected = boxStyleHelper.marginRight('SM')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginRight at a MD breakpoint', () => {
      const expected = boxStyleHelper.marginRight('MD')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginRight at a LG breakpoint', () => {
      const expected = boxStyleHelper.marginRight('LG')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginRight at a XL breakpoint', () => {
      const expected = boxStyleHelper.marginRight('XL')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should throw an error with an invalid breakpoint', () => {
      function test() {
        boxStyleHelper.marginRight('invalid breakpoint')
      }
      expect(test).toThrowError('Breakpoints must be SM, MD, LG or XL')
    })
  })
  describe('marginBottom', () => {
    it('should output style for marginBottom at a XS breakpoint', () => {
      const expected = boxStyleHelper.marginBottom()(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginBottom at a SM breakpoint', () => {
      const expected = boxStyleHelper.marginBottom('SM')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginBottom at a MD breakpoint', () => {
      const expected = boxStyleHelper.marginBottom('MD')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginBottom at a LG breakpoint', () => {
      const expected = boxStyleHelper.marginBottom('LG')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginBottom at a XL breakpoint', () => {
      const expected = boxStyleHelper.marginBottom('XL')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should throw an error with an invalid breakpoint', () => {
      function test() {
        boxStyleHelper.marginBottom('invalid breakpoint')
      }
      expect(test).toThrowError('Breakpoints must be SM, MD, LG or XL')
    })
  })
  describe('marginLeft', () => {
    it('should output style for marginLeft at a XS breakpoint', () => {
      const expected = boxStyleHelper.marginLeft()(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginLeft at a SM breakpoint', () => {
      const expected = boxStyleHelper.marginLeft('SM')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginLeft at a MD breakpoint', () => {
      const expected = boxStyleHelper.marginLeft('MD')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginLeft at a LG breakpoint', () => {
      const expected = boxStyleHelper.marginLeft('LG')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for marginLeft at a XL breakpoint', () => {
      const expected = boxStyleHelper.marginLeft('XL')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should throw an error with an invalid breakpoint', () => {
      function test() {
        boxStyleHelper.marginLeft('invalid breakpoint')
      }
      expect(test).toThrowError('Breakpoints must be SM, MD, LG or XL')
    })
  })
  describe('paddingX', () => {
    it('should output style for paddingX at a XS breakpoint', () => {
      const expected = boxStyleHelper.paddingX()(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for paddingX at a SM breakpoint', () => {
      const expected = boxStyleHelper.paddingX('SM')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for paddingX at a MD breakpoint', () => {
      const expected = boxStyleHelper.paddingX('MD')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for paddingX at a LG breakpoint', () => {
      const expected = boxStyleHelper.paddingX('LG')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for paddingX at a XL breakpoint', () => {
      const expected = boxStyleHelper.paddingX('XL')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should throw an error with an invalid breakpoint', () => {
      function test() {
        boxStyleHelper.paddingX('invalid breakpoint')
      }
      expect(test).toThrowError('Breakpoints must be SM, MD, LG or XL')
    })
  })
  describe('paddingY', () => {
    it('should output style for paddingY at a XS breakpoint', () => {
      const expected = boxStyleHelper.paddingY()(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for paddingY at a SM breakpoint', () => {
      const expected = boxStyleHelper.paddingY('SM')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for paddingY at a MD breakpoint', () => {
      const expected = boxStyleHelper.paddingY('MD')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for paddingY at a LG breakpoint', () => {
      const expected = boxStyleHelper.paddingY('LG')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should output style for paddingY at a XL breakpoint', () => {
      const expected = boxStyleHelper.paddingY('XL')(100)
      expect(expected).toMatchSnapshot()
    })
    it('should throw an error with an invalid breakpoint', () => {
      function test() {
        boxStyleHelper.paddingY('invalid breakpoint')
      }
      expect(test).toThrowError('Breakpoints must be SM, MD, LG or XL')
    })
  })
  describe('size', () => {
    it('should return empty when property is empty', () => {
      expect(boxStyleHelper.dangerousStyleValue('height', null)).toEqual('')
      expect(boxStyleHelper.dangerousStyleValue('height', '')).toEqual('')
      expect(boxStyleHelper.dangerousStyleValue('height', true)).toEqual('')
      expect(boxStyleHelper.dangerousStyleValue('height', false)).toEqual('')
    })

    it('should add "px" suffix to attributes', () => {
      expect(boxStyleHelper.dangerousStyleValue('height', 10)).toEqual('10px')
      expect(boxStyleHelper.dangerousStyleValue('width', 20)).toEqual('20px')
    })

    it('should not add "px" suffix to the unitless properties', () => {
      expect(boxStyleHelper.dangerousStyleValue('flex', 1)).toEqual('1')
      expect(boxStyleHelper.dangerousStyleValue('zIndex', 99)).toEqual('99')
    })

    it('should keep the same value if it is custom property', () => {
      expect(
        boxStyleHelper.dangerousStyleValue('custom-property', '100%', true),
      ).toEqual('100%')
    })
  })
})
