import { onlyLetters } from './onlyLetters';

describe('(Normalize) phone', () => {
  it('should return empty string if value is undefined', () => {
    const result = onlyLetters(undefined, undefined);
    expect(result).toBe(undefined);
  });

  it('should return empty string if no value given', () => {
    const result = onlyLetters('!@#$', undefined);
    expect(result).toBe('');
  });

  it('should return empty string if the value contains only special chars', () => {
    const result = onlyLetters('!@#$', undefined);
    expect(result).toBe('');
  });

  it('should strip special chars from value', () => {
    const result = onlyLetters('q!w@e#', undefined);
    expect(result).toBe('qwe');
  });

  it('should not strip spaces', () => {
    const result = onlyLetters('q!w @e#', undefined);
    expect(result).toBe('qw e');
  });
});
