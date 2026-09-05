import { HistoryView } from "@/components/app/history-view";

export default function HistoryPage() {
  return <main className="page-shell"><p className="eyebrow">History / snapshots</p><h1>See how your saved public metrics changed.</h1><p className="lede">APIVue compares explicitly saved snapshots. It never invents historical records from live API responses.</p><HistoryView /></main>;
}
