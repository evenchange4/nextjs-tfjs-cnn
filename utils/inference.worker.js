/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const TFJS =
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.2.9/dist/tf.min.js';
const TFJS_MODEL_PATH = '/static/model-tfjs/model.json';

const wait = (amount = 0) =>
  new Promise(resolve => setTimeout(resolve, amount));

importScripts(TFJS);

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
    await wait();

    const timePredict = performance.now();
    const imageTensor = tf.tensor4d(data, [1, 224, 224, 3]);
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
