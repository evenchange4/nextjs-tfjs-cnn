/* global self */
/* eslint-disable no-restricted-globals, no-undef  */
import * as tf from '@tensorflow/tfjs';
import waait from 'waait';
import {
  TFJS_MODEL_PATH,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  IMAGE_CHANNELS,
} from './constants';

tf.setBackend('webgl');

/**
 * ref: https://github.com/abaranovskis-redsamurai/automation-repo/blob/master/tfjs-sentiment/js/sentimenttfjs/src/js/worker.js
 */

let model;

onmessage = async ({ data: { key, data } }) => {
  try {
    if (!model) {
      self.postMessage({ type: 'LOAD_MODEL_START' });
      const timeLoadModel = performance.now();
      model = await tf.loadLayersModel(TFJS_MODEL_PATH);
      model.summary();
      self.postMessage({
        type: 'LOAD_MODEL_END',
        payload: performance.now() - timeLoadModel,
      });
    }

    // TODO: web worker improvement to avoid main thread block
    await waait();

    const timePredict = performance.now();
    const imageTensor = tf.tensor4d(data, [
      1,
      IMAGE_HEIGHT,
      IMAGE_WIDTH,
      IMAGE_CHANNELS,
    ]);
    console.log({ imageTensor });
    imageTensor.print();
    const predictTensor = model.predict(imageTensor);
    const predictionResult = await predictTensor.argMax(1).data();
    const label = predictionResult[0];
    self.postMessage({
      type: 'PREDICT_END',
      payload: { key, label, duration: performance.now() - timePredict },
    });
  } catch (error) {
    throw error;
  }
};
