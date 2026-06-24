import { buildSitecoreDictionaryCacheTag, DictionaryPhrases } from '@sitecore-content-sdk/nextjs';
import { cacheTag } from 'next/cache';
import client from 'src/lib/sitecore-client';
import { sitecoreFetchFallback } from 'src/lib/cache/sitecore-fetch-fallback';

type GetSitecoreDictionaryParams = {
  site: string;
  locale: string;
};

/**
 * Fetches dictionary phrases using Next.js Cache Components and a deterministic dictionary tag.
 */
export async function getSitecoreDictionary(params: GetSitecoreDictionaryParams): Promise<DictionaryPhrases> {
  'use cache';

  const { site, locale } = params;
  cacheTag(buildSitecoreDictionaryCacheTag({ site, locale }));

  try {
    return await client.getDictionary({ site, locale });
  } catch (error) {
    return sitecoreFetchFallback(error, {});
  }
}
