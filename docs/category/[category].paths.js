import { categoryList } from './types'

export default {
  paths() {
    const output = categoryList.map((category) => {
      const slug = category.toLowerCase().replace(/ /g, '-');

      return {
        params: {
          category: slug,
          name: category,
        },
      };
    });

    return output;
  }
}
