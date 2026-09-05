import { ProfileWorkbench } from "@/components/app/profile-workbench";

export default function ProfilesPage() {
  return <main className="page-shell"><p className="eyebrow">Profiles / live analysis</p><h1>Fetch a profile. Turn it into a reusable snapshot.</h1><p className="lede">Analyze supported public profiles, inspect normalized metrics, and explicitly save snapshots to this browser's APIVue workspace.</p><ProfileWorkbench /></main>;
}
