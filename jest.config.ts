/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  globals:{
    fetch: global.fetch,
  },

  moduleFileExtensions: [
     "js",
     "mjs",
     "cjs",
     "jsx",
     "ts",
     "tsx",
     "json",
     "node"
   ],

   moduleNameMapper: { '\\.png$': '<rootDir>/src/__mocks__/file.mock.cjs'},

   preset: 'ts-jest',

  testEnvironment: "jest-environment-jsdom",

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  transformIgnorePatterns: [
    '/node_modules/',
    '\\.(jpg|jpeg|png|gif|webp|svg|html)$',
   ],

};

export default config;
