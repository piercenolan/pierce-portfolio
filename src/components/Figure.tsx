import Image from "next/image";
import { getImageDimensions } from "@/data/imageDimensions";

export default function Figure({
  src,
  caption,
  index,
  wide = false,
}: {
  src: string;
  caption: string;
  index: number;
  wide?: boolean;
}) {
  // Real intrinsic dimensions, so the browser reserves the correct aspect
  // ratio before the image loads instead of shifting the page.
  const { width, height } = getImageDimensions(src);

  return (
    <figure className="flex h-full flex-col border border-rule bg-panel">
      <div className="relative bg-white">
        <Image
          src={src}
          alt={caption}
          width={width}
          height={height}
          sizes={wide ? "(min-width: 1024px) 960px, 100vw" : "(min-width: 640px) 480px, 100vw"}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="flex flex-1 gap-3 border-t border-rule px-4 py-3">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-measure">
          Fig. {String(index).padStart(2, "0")}
        </span>
        <span className="text-[13px] leading-snug text-graphite">{caption}</span>
      </figcaption>
    </figure>
  );
}
