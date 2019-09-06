import * as React from 'react';
import * as tf from '@tensorflow/tfjs';
import { TFJS_MODEL_PATH } from '../utils/constants';

interface State {
  data?: tf.LayersModel;
  loading: boolean;
  error?: string;
}
type Action =
  | { type: 'setLoading' }
  | { type: 'setError'; payload: State['error'] }
  | { type: 'setData'; payload: State['data'] };

const initialState = {
  data: undefined,
  loading: false,
  error: undefined,
};

function reducer(_state: State, action: Action) {
  switch (action.type) {
    case 'setLoading':
      return { data: undefined, loading: true, error: undefined };
    case 'setError':
      return { data: undefined, loading: false, error: action.payload };
    case 'setData':
      return { data: action.payload, loading: false, error: undefined };
    default:
      throw new Error();
  }
}

export default function useLoadTFModel() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const loadModel = React.useCallback(async () => {
    if (state.data) return;
    dispatch({ type: 'setLoading' });
    try {
      const model = await tf.loadLayersModel(TFJS_MODEL_PATH);
      model.summary();
      dispatch({ type: 'setData', payload: model });
    } catch (error) {
      dispatch({ type: 'setError', payload: error });
    }
  }, [state.data]);

  React.useEffect(() => {
    loadModel();
  }, [loadModel]);

  return state;
}
