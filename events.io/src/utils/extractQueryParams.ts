export function extractQueryParams(url: string): Record<string, string> {
    const urlObj = new URL(url);
    const queryParams: Record<string, string> = {};
    for (const [key, value] of urlObj.searchParams.entries() as any) {
      queryParams[key] = value;
    }
    return queryParams;
  }
  