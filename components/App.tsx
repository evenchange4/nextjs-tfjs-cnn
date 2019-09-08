import * as React from 'react';
import * as R from 'ramda';
import debug from 'debug';
import { Box, CircularProgress } from '@material-ui/core';
import roundTo from 'round-to';
import Card from './Card';
import Dropzone from './Dropzone';
import useInferenceWorkerRef from '../hooks/useInferenceWorkerRef';
import toImageElement from '../utils/toImageElement';
import preprocessImage from '../utils/preprocessImage';

enum LabelEnum {
  'CAT' = 'Cat 🐈',
  'DOG' = 'Dog 🐕',
}
interface Result {
  [objectURL: string]: {
    src: string;
    timestamp: Date;
    file: File;
    label?: number;
    duration?: number;
  };
}
type WorkerAction =
  | { type: 'LOAD_MODEL_START' }
  | { type: 'LOAD_MODEL_END'; payload: number }
  | {
      type: 'PREDICT_END';
      payload: { key: string; label: number; duration: number };
    };

const log = debug('app:index');
const LABEL_MAPPER: { [n: number]: LabelEnum } = {
  0: LabelEnum.CAT,
  1: LabelEnum.DOG,
};

const App = React.memo(function App() {
  const [result, setResult] = React.useState<Result>({});
  const [loadModel, setLoadModel] = React.useState(0);
  const workerRef = useInferenceWorkerRef();

  const onDrop = React.useCallback(
    async files => {
      try {
        const file = files[0];
        if (!file) return;

        const timestamp = new Date();
        const src = URL.createObjectURL(file);
        const imageElement = await toImageElement(src);
        setResult(prevResult => ({
          ...prevResult,
          [src]: { src, timestamp, file },
        }));

        // Note: Preprocess image
        const tensor = preprocessImage(imageElement, 'vgg');
        // log({ tensor });
        // tensor.print();
        const tensorData = tensor.dataSync();

        // Note: Inference
        if (workerRef.current) {
          workerRef.current.postMessage({ key: src, data: tensorData });
          workerRef.current.onmessage = ({ data }: { data: WorkerAction }) => {
            switch (data.type) {
              case 'LOAD_MODEL_START': {
                log('LOAD_MODEL_START');
                break;
              }
              case 'LOAD_MODEL_END': {
                setLoadModel(data.payload);
                break;
              }
              case 'PREDICT_END': {
                const { key, label, duration } = data.payload;
                setResult(prevResult => ({
                  ...prevResult,
                  [key]: { ...prevResult[key], label, duration },
                }));
                break;
              }
              default:
                break;
            }
          };
        } else {
          throw new Error('Missing web workerRef.current');
        }
      } catch (err) {
        log(err);
      }
    },
    [workerRef],
  );

  React.useEffect(
    () => () => {
      // Note: Make sure to revoke the data uris to avoid memory leaks
      Object.keys(result).forEach(src => URL.revokeObjectURL(src));
    },
    [result],
  );

  const images = Object.values(result).sort(R.descend(R.prop('timestamp')));

  return (
    <React.Fragment>
      <Box mb={2}>
        <Dropzone dropzoneOptions={{ onDrop }} />
      </Box>

      {!loadModel && !R.isEmpty(result) && (
        <Box display="flex" alignItems="center" mb={1}>
          <Box mr={1}>Fetching the model of TensorFlow.js...</Box>
          <CircularProgress size={18} />
        </Box>
      )}

      {Boolean(loadModel) && (
        <Box mb={1} color="primary.light">
          The model have been downloaded in&nbsp;
          {roundTo(loadModel / 1000, 2)}s.
        </Box>
      )}

      <Box m={-1} display="flex" flexWrap="wrap">
        {images.map(({ src, label, file, duration }) => (
          <Box key={src} m={1}>
            <Card src={src} title={`${file.name} - ${file.size} bytes`}>
              <Box fontSize="body2.fontSize">
                {R.isNil(label) ? 'Processing' : LABEL_MAPPER[label]}
                {
                  <Box fontSize="caption.fontSize" color="text.hint">
                    in {duration ? roundTo(duration / 1000, 2) : '__ '}s
                  </Box>
                }
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
});

export default App;
