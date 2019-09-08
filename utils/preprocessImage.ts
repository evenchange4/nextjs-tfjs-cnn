import * as tf from '@tensorflow/tfjs';

/**
 * ref: https://github.com/himanshu987/VGG16-with-TensorflowJs/blob/master/client/predict.js
 * ref: https://github.com/keras-team/keras-applications/blob/master/keras_applications/imagenet_utils.py
 * ref: https://stackoverflow.com/questions/54427551/how-to-preprocess-training-set-for-vgg16-fine-tuning-in-keras
 */
export default function preprocessImage(
  image: HTMLImageElement,
  modelName?: string,
) {
  const tensor = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([224, 224])
    .toFloat();

  if (modelName === 'vgg') {
    const meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);
    return tensor
      .sub(meanImageNetRGB)
      .reverse(2) // using the conventions from vgg16 documentation
      .expandDims();
  }

  if (modelName === 'mobilenet') {
    const offset = tf.scalar(127.5);
    return tensor
      .sub(offset)
      .div(offset)
      .expandDims();
  }

  return tensor.expandDims();
}
