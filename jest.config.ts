const config = {
  preset: 'jest-preset-angular/presets/defaults',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/test.base.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  moduleNameMapper: {
    '@app-core(.*)': '<rootDir>/src/app/core/$1',
  },
  moduleDirectories: ['node_modules', '.'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,html,ts,scss}',
    '!src/**/main.ts',
    '!src/**/polyfills.ts',
    '!src/**/index.html',
    '!src/**/environment.*',
    '!src/**/*.module.ts',
    '!src/**/*.enum.ts',
    '!src/**/*.mock.ts',
  ],
};

export default config;
