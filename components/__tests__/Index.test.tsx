import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';
import Index from '../Index';
import theme from '../../utils/theme';

jest.mock('../../hooks/useInferenceWorkerRef', () => () => {});

test('should render <Index />', async () => {
  const { getByText, asFragment } = render(
    <ThemeProvider theme={theme}>
      <Index />
    </ThemeProvider>,
  );

  expect(getByText(/Dogs vs. Cats/)).toBeInTheDocument();
  expect(
    getByText('Drag and drop one image here, or click to select file'),
  ).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});
