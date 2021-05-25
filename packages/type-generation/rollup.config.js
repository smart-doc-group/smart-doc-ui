/**
 * The following are the devDependencies needed,
 * you can also install them directly by using:
 * yarn add --dev rollup rollup-plugin-typescript2
 * The devDependencies:
 * rollup
 * rollup-plugin-typescript2
 * */
import typescript from 'rollup-plugin-typescript2';

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
  plugins: [typescript()],
  external: ['react', 'react-dom'],
};
