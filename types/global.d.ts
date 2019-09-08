declare interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}

// Note: fix for Could not find a declaration file for module '../utils/inference.worker'. 'inference.worker.js' implicitly has an 'any' type.
// ref: https://github.com/Microsoft/TypeScript/issues/15031#issuecomment-407131785
declare module '*';
