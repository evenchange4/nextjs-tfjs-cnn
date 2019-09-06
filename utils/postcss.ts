import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import CleanCSS from 'clean-css';

// You can find a benchmark of the available CSS minifiers under
// https://github.com/GoalSmashers/css-minification-benchmark
// We have found that clean-css is faster than cssnano but the output is larger.
// Waiting for https://github.com/cssinjs/jss/issues/279
// 4% slower but 12% smaller output than doing it in a single step.
//
// It's using .browserslistrc
const prefixer = postcss([autoprefixer]);
const cleanCSS = new CleanCSS();

export default async function(originCSS: string): Promise<string> {
  let css = originCSS;

  // It might be undefined, e.g. after an error.
  if (css && process.env.NODE_ENV === 'production') {
    const result = await prefixer.process(css, { from: undefined });
    // eslint-disable-next-line prefer-destructuring
    css = result.css;
    css = cleanCSS.minify(css).styles;
  }

  return css;
}
