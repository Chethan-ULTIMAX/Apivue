import { platforms } from "@/config/platforms";
import { PlatformDirectory } from "@/components/search/platform-directory";

export default function ExplorePage() { return <main className="page-shell"><p className="eyebrow">Explore / platform registry</p><h1>Choose a source, then ask better questions.</h1><p className="lede">150 platforms are catalogued. Availability labels distinguish implemented public APIs from authenticated and catalog-only entries.</p><PlatformDirectory platforms={platforms}/></main>; }
