import { notFound } from "next/navigation";
import { getPlatform } from "@/config/platforms";
import { ProfileExperience } from "@/components/platform/profile-experience";

export default function PlatformPage({ params }: { params: { platform: string } }) {
	const platform = getPlatform(params.platform);
	if (!platform) notFound();
	const supported = platform.id === "github" || platform.id === "codeforces";
	return <main className="page-shell"><p className="eyebrow">Platform map / {platform.category}</p><h1>{platform.name}</h1><p className="lede">{platform.description}</p>{platform.id === "github" ? <ProfileExperience platform="github" /> : platform.id === "codeforces" ? <ProfileExperience platform="codeforces" /> : null}<section className="detail-grid"><div><p className="section-label">Capabilities</p>{platform.capabilities.map((capability) => <article className="detail-row" key={capability.id}><strong>{capability.label}</strong><span>{capability.description}</span></article>)}</div><aside className="notice"><p className="section-label">Availability</p><p><span className={`status status-${platform.integrationStatus || "catalog-only"}`}>{platform.integrationStatus || "catalog-only"}</span></p>{platform.documentationUrl ? <p>Documentation: <a className="text-link" href={platform.documentationUrl}>official documentation</a></p> : null}<p>Authentication: {platform.authentication.join(" / ")}</p><p>Analytics: {platform.analyticsSupport ? "available where public data exists" : "not enabled"}</p><p className="muted">{platform.notes || platform.dataFreshness}</p>{platform.integrationStatus === "public-api" && <a className="button button-primary" href={`/playground?platform=${platform.id}`}>Open API explorer</a>}</aside></section></main>;
}
