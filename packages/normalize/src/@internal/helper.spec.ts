import { isLastChar, shouldDeleteLastChar } from './helper';

describe('(Normalize) helper', () => {
  describe('(Normalize) check last character is', () => {
    it('should return true if last character is provided charater', () => {
      const char = 'd';
      const result = isLastChar('undefined', char);
      expect(result).toBe(true);
    });

    it('should return false if last character isnt the provided charater', () => {
      const char = 'z';
      const result = isLastChar('undefined', char);
      expect(result).toBe(false);
    });

    it('should return false if text is undefined', () => {
      const char = 'd';
      const result = isLastChar(undefined, char);
      expect(result).toBe(false);
    });

    it('should return false if text is null', () => {
      const char = 'd';
      const result = isLastChar(null, char);
      expect(result).toBe(false);
    });
  });

  describe('(Normalize) backspace normalized character', () => {
    it('should be able to backspace normalized character', () => {
      const normalizedCharacter = '-';
      const result = shouldDeleteLastChar('123', '123-', normalizedCharacter);
      expect(result).toBe('123');
    });

    it('should be able to backspace normalized character', () => {
      const normalizedCharacter = '-';
      const result = shouldDeleteLastChar('12', '123', normalizedCharacter);
      expect(result).toBe(undefined);
    });
  });
});
