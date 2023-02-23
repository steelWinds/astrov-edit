// interface WebfontFamily {
//    category?: string | undefined;
//    kind: string;
//    family: string;
//    subsets: string[];
//    variants: string[];
//    version: string;
//    lastModified: string;
//    files: { [variant: string]: string };
// }

// interface WebfontList {
//        kind: string;
//        items: WebfontFamily[];
//    }

type SortingValues = 'alpha' | 'date' | 'popularity' | 'style' | 'trending';

export const getGFontsList = (
  sort: SortingValues,
  options: Parameters<typeof useFetch>['1'] = {}
) => {
  const rc = useRuntimeConfig()

  return useFetch(rc.public.gfApiBase, Object.assign(options, {
    query: {
      key: rc.public.gfApiKey,
      sort
    }
  }))
}
