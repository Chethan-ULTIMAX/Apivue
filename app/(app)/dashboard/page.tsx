import { appNavigation } from "@/config/navigation";

export default function DashboardPage() {
	return <main className="page-shell"><p className="eyebrow">{appNavigation[0].label}</p><h1>Your developer intelligence, in one place.</h1><p className="lede">Connect a supported platform to begin building a profile view. No data has been fetched yet.</p></main>;
}
