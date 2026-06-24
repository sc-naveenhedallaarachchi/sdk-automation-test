/**
 * During `next build`, Experience Edge may not be provisioned yet (for example, the
 * context ID has no edge resource on a first XM Cloud deploy). Return a fallback so
 * Cache Components build-time validation can complete; rethrow at runtime.
 */
export function sitecoreFetchFallback<T>(error: unknown, fallback: T): T {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return fallback;
  }

  throw error;
}
