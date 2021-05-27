import { hideTerminalCursor, showTerminalCursor } from '../src/util';

describe('test utils function', () => {
  it('hide terminal cursor"', () => {
    const mockFn = jest.spyOn(process.stderr, 'write');
    hideTerminalCursor();
    expect(mockFn).toHaveBeenCalledWith('\x1B[?25l');
  });

  it('show terminal cursor', () => {
    const mockFn = jest.spyOn(process.stderr, 'write');
    showTerminalCursor();
    expect(mockFn).toHaveBeenCalledWith('\x1B[?25h');
  });
});
