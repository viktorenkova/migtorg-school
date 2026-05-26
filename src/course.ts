export const moduleRouteSlugs = [
  "market-basics",
  "platform-overview",
  "partner-specialization",
  "lot-selection",
  "bid-economics",
  "auction-analytics",
  "deal-completion"
] as const;

export function getModuleSlugByIndex(index: number) {
  return moduleRouteSlugs[index] ?? `module-${index + 1}`;
}

export function getFirstLessonPath(moduleSlug: string) {
  return `/learn/${moduleSlug}/lesson-1`;
}
