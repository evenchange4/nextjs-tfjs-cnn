# Next.js Tensorflow.js CNN

> Use pre-trained VGG16 models in Keras.
> Transfer Learning https://github.com/tensorflow/tfjs-examples/blob/master/mnist-transfer-cnn/README.md

Using kaggle dogs-vs-cats dataset.

<table>
  <tr>
    <th>Input data type</th>
    <th>Task type</th>
    <th>Model type</th>
    <th>Training</th>
    <th>Inference</th>
    <th>Save-load operations</th>
  <tr>
    <td>Image</td>
    <td>Multiclass classification (transfer learning)</td>
    <td>Convolutional neural network</td>
    <td>Python</td>
    <td>Browser</td>
    <td>Export trained model from Keras and load it in browser</td>
  </tr>
</table>

## Training

[Notebook](./python/vgg16.ipynb)
[Clone](https://colab.research.google.com/drive/1JnUzEH62tgvd5PPc1M9dSEHvzrGhCHAA#scrollTo=q9LELWcnd3Dv)

### Output

[Save Keras models](https://keras.io/getting-started/faq/#how-can-i-save-a-keras-model) as HDF5 files at `./python/output/model.h5`

### Late Submission

https://www.kaggle.com/c/dogs-vs-cats-redux-kernels-edition

## Visualize

View the model with [netron](https://github.com/lutzroeder/netron).

image screenshot

## Convert to tfjs model

Use [tfjs-converter](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter) to convert the model format with docker image:

```bash
$ docker run -it --rm \
  -v "$PWD/python:/python" \
  evenchange4/docker-tfjs-converter \
  tensorflowjs_converter --input_format=keras python/output/model.h5 python/output/model-tfjs
```

### Versions

- Python 3.6.8
- Tensorflowjs 1.2.6
- Dependency versions:
  - keras 2.2.4-tf
  - tensorflow 1.14.0

### Output

`./python/output/model-tfjs/`

## Client side

### Install

```bash
yarn install --pure-lockfile
```

### Development

- node 12.10.0
- yarn 1.17.3

### Deploy to GitHub pages

> Any git tags.

1. Update `CHANGELOG.md`
2. Create a new git tag

```console
$ npm version patch
```

### Test

```
$ yarn run format
$ yarn run eslint
$ yarn run type-check
$ yarn run test:watch
```

---

## CONTRIBUTING

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.
- Pull requests must be accompanied by passing automated tests (`$ yarn run test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

## Reference

- [Keras CNN Dog or Cat Classification](https://www.kaggle.com/uysimty/keras-cnn-dog-or-cat-classification)
- [TensorFlow.js Example: MNIST CNN Transfer Learning Demo](https://github.com/tensorflow/tfjs-examples/blob/master/mnist-transfer-cnn/README.md)
- [TensorFlow.js - Explore tensor operations through VGG16 preprocessing](https://deeplizard.com/learn/video/hRKEQhiqIU4)
- [Classifying images using Keras MobileNet and TensorFlow.js in Google Chrome](https://gogul09.github.io/software/mobile-net-tensorflow-js
- [Building a blood cell classification model using Keras and tfjs](https://towardsdatascience.com/building-a-blood-cell-classification-model-using-keras-and-tfjs-5f7601ace931)
- [VGG16-with-TensorflowJs](https://github.com/himanshu987/VGG16-with-TensorflowJs)
- [Keras 框架中的 epoch、bacth、batch size、iteration](https://blog.csdn.net/msmw2/article/details/80454751)
- https://github.com/leemengtaiwan/cat-recognition-train
- https://github.com/Elwing-Chou/TibameDL
- https://github.com/leemengtaiwan/cat-recognition-train
