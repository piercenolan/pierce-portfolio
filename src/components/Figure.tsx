import Image from "next/image";

export default function Figure({
  src,
  caption,
  index,
}: {
  src: string;
  caption: string;
  index: number;
}) {
  return (
    <figure className="border border-rule bg-panel">
      <div className="relative bg-white">
        <Image
          src={src}
          alt={caption}
          width={1600}
          height={1000}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="flex gap-3 border-t border-rule px-4 py-3">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-measure">
          Fig. {String(index).padStart(2, "0")}
        </span>
        <span className="text-[13px] leading-snug text-graphite">{caption}</span>
      </figcaption>
    </figure>
  );
}
