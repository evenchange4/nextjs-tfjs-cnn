import * as React from 'react';
import * as R from 'ramda';
import debug from 'debug';
import * as tf from '@tensorflow/tfjs';
import { Box, CircularProgress } from '@material-ui/core';
import Card from './Card';
import Dropzone from './Dropzone';
import useLoadTFModel from '../hooks/useLoadTFModel';
import toImageElement from '../utils/toImageElement';
import preprocessImage from '../utils/preprocessImage';

enum LabelEnum {
  'CAT' = 'Cat 🐈',
  'DOG' = 'Dog 🐕',
}

const LABEL_MAPPER: { [n: number]: LabelEnum } = {
  0: LabelEnum.CAT,
  1: LabelEnum.DOG,
};

interface Result {
  [objectURL: string]: {
    src: string;
    label?: number;
    timestamp: Date;
    file: File;
  };
}

const log = debug('app:index');

const App = React.memo(function App() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<Result>({});
  const { data: model, loading, error } = useLoadTFModel();

  const onDrop = React.useCallback(
    async files => {
      try {
        if (!model) throw new Error('Missing model');

        const file = files[0];
        if (!file) return;

        const timestamp = new Date();
        const src = URL.createObjectURL(file);
        setIsProcessing(true);
        setResult(R.assocPath([src], { src, timestamp, file }));

        // Note: Preprocess image
        const imageElement = await toImageElement(src);
        const tensor = preprocessImage(imageElement, 'vgg');
        log({ tensor });
        tensor.print();

        // Note: Inference
        const predictTensor = model.predict(tensor) as tf.Tensor;
        const predictionResult = await predictTensor.argMax(1).data();
        const label = predictionResult[0];
        setIsProcessing(false);
        setResult(R.assocPath([src, 'label'], label));
      } catch (err) {
        log(err);
      }
    },
    [model, setIsProcessing],
  );

  // NOte: Make sure to revoke the data uris to avoid memory leaks
  React.useEffect(
    () => () => {
      Object.keys(result).forEach(src => URL.revokeObjectURL(src));
    },
    [result],
  );

  if (error) return <React.Fragment>{error}</React.Fragment>;
  if (loading || !model) {
    return (
      <Box display="flex" alignItems="center" fontSize="body1.fontSize">
        <Box mr={1}>Fetching the model of TensorFlow.js...</Box>
        <CircularProgress size={24} />
      </Box>
    );
  }

  const images = Object.values(result).sort(R.descend(R.prop('timestamp')));

  return (
    <React.Fragment>
      <Box mb={2}>
        <Dropzone dropzoneOptions={{ onDrop, disabled: isProcessing }} />
      </Box>

      <Box m={-1} display="flex" flexWrap="wrap">
        {images.map(({ src, label, file }) => (
          <Box key={src} m={1}>
            <Card src={src} title={`${file.name} - ${file.size} bytes`}>
              <Box fontSize="body2.fontSize">
                {R.isNil(label) ? 'Processing' : LABEL_MAPPER[label]}
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
});

export default App;
