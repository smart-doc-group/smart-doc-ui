/**
 * hide terminal cursor
 */
export const hideTerminalCursor = () => {
  process.stderr.write('\x1B[?25l');
};

/**
 * show terminal cursor
 */
export const showTerminalCursor = () => {
  process.stderr.write('\x1B[?25h');
};
