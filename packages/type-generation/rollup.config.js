/**
 * The following are the devDependencies needed,
 * you can also install them directly by using:
 * yarn add --dev rollup rollup-plugin-typescript2 @rollup/plugin-replace
 * The devDependencies:
 * rollup
 * rollup-plugin-typescript2
 * @rollup/plugin-replace
 * */
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

const { NODE_ENV } = process.env;

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'lib',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    typescript({
      include: ['src/*.ts'],
    }),
    NODE_ENV &&
      replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        preventAssignment: true,
      }),
  ],
  external: ['react', 'react-dom'],
};
