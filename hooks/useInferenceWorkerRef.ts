import * as React from 'react';
import debug from 'debug';
import InferenceWorker from '../utils/inference.worker';

const log = debug('app:useInferenceWorker');

export default function useInferenceWorkerRef() {
  const inferenceWorkerRef = React.useRef<Worker>();

  React.useEffect(() => {
    if (!inferenceWorkerRef.current) {
      log('Create a new web worker');
      inferenceWorkerRef.current = new InferenceWorker();
    }

    return () => {
      if (inferenceWorkerRef.current) inferenceWorkerRef.current.terminate();
    };
  }, []);

  return inferenceWorkerRef;
}
