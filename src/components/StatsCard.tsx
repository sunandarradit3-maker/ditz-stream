type Props = { label: string; value: string | number; hint?: string };

export function StatsCard({ label, value, hint }: Props) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-zinc-950/70 p-5 shadow-soft">
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
      {hint ? <div className="mt-2 text-xs text-zinc-500">{hint}</div> : null}
    </div>
  );
}
