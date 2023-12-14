import { globby } from 'globby';

export default {
  async paths() {
    const paths = await globby([
      'docs/components/**/*.vue',
    ]);

    const output = paths.map(path => {
      const [component, example] = path.split('/').slice(-2).map(p => p.replace('.vue', ''));
      return { params: { component, example }};
    });

    return output;
  },
}
