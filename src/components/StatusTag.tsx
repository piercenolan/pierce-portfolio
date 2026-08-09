const styles: Record<string, string> = {
  "In progress": "border-measure text-measure",
  Shipped: "border-signal text-signal",
  Complete: "border-rule text-graphite",
};

export default function StatusTag({ status }: { status: string }) {
  return (
    <span
      className={`border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
        styles[status] ?? styles.Complete
      }`}
    >
      {status}
    </span>
  );
}
