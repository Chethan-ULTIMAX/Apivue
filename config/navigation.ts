export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export const publicNavigation: NavigationItem[] = [
  { label: "Explore", href: "/explore", description: "Browse public platform analytics." },
  { label: "Platforms", href: "/explore#platforms", description: "See supported data sources." },
  { label: "Docs", href: "/docs", description: "Understand sources and request boundaries." },
  { label: "Changelog", href: "/changelog", description: "Follow product progress." },
];

export const appNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profiles", href: "/profiles" },
  { label: "Playground", href: "/playground" },
  { label: "Workspaces", href: "/workspaces" },
];

export const settingsNavigation: NavigationItem[] = [
  { label: "Settings", href: "/settings" },
  { label: "Security", href: "/settings/security" },
  { label: "Billing", href: "/settings/billing" },
];
