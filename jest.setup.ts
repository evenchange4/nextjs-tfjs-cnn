import '@testing-library/jest-dom/extend-expect';

jest.setTimeout(10000);
jest.mock('./utils/now', () => new Date('Tue May 20 2020 11:00:20 GMT+0800'));

// TODO: https://github.com/testing-library/react-testing-library#suppressing-unnecessary-warnings-on-react-dom-168
// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});
