export const moduleRouteSlugs = [
  "market-basics",
  "lot-selection",
  "damage-evaluation",
  "max-bid-economics",
  "auction-bidding",
  "lot-transfer",
  "inspection-and-legal-check"
] as const;

export function getModuleSlugByIndex(index: number) {
  return moduleRouteSlugs[index] ?? `module-${index + 1}`;
}

export function getFirstLessonPath(moduleSlug: string) {
  return `/learn/${moduleSlug}/lesson-1`;
}
