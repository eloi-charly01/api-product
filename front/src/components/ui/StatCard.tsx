type StatCardProps = {
  label: string;
  value: number | string;
  subtitle: string;
  valueClassName?: string;
};

export function StatCard({
  label,
  value,
  subtitle,
  valueClassName = "text-slate-900",
}: StatCardProps) {
  return (
    <div className="p-5">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p
        className={`mt-2 font-mono text-3xl font-semibold tracking-tight ${valueClassName}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}
