import { notFound } from "next/navigation";
import { getPlatform } from "@/config/platforms";

export default function PlatformPage({ params }: { params: { platform: string } }) {
	const platform = getPlatform(params.platform);
	if (!platform) notFound();
	return <main className="page-shell"><p className="eyebrow">Platform map / {platform.category}</p><h1>{platform.name}</h1><p className="lede">{platform.description}</p><section className="detail-grid"><div><p className="section-label">Capabilities</p>{platform.capabilities.map((capability) => <article className="detail-row" key={capability.id}><strong>{capability.label}</strong><span>{capability.description}</span></article>)}</div><aside className="notice"><p className="section-label">Availability</p><p>Source API: <a className="text-link" href={platform.documentationUrl}>official documentation</a></p><p>Authentication: {platform.authentication.join(" / ")}</p><p>Historical snapshots: {platform.supportsHistoricalSnapshots ? "supported by the model" : "not available"}</p><p className="muted">{platform.dataFreshness}</p></aside></section></main>;
}
