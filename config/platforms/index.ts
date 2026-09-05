import type { PlatformDefinition } from "@/types";
import { codingPlatforms } from "./coding";
import { cloudPlatforms } from "./cloud";
import { gitPlatforms } from "./git";
import { aiPlatforms } from "./ai";
import { securityPlatforms } from "./security";
import { educationPlatforms } from "./education";
import { communityPlatforms } from "./community";
import { productivityPlatforms } from "./productivity";
import { otherPlatforms } from "./other";

export const platforms: PlatformDefinition[] = [
  ...gitPlatforms,
  ...codingPlatforms,
  ...communityPlatforms,
  ...educationPlatforms,
  ...productivityPlatforms,
  ...cloudPlatforms,
  ...aiPlatforms,
  ...securityPlatforms,
  ...otherPlatforms,
];

export function getPlatform(platformId: string) {
  return platforms.find((platform) => platform.id === platformId);
}