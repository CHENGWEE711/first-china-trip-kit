import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type EditorialImageProps = Omit<ImageProps, "fill"> & {
  alt: string;
  aspect?: "hero" | "card" | "inline" | "portrait";
  caption?: string;
  credit?: string;
  objectPosition?: string;
  wrapperClassName?: string;
  imageClassName?: string;
};

const aspectClasses = {
  hero: "aspect-[7/5] lg:aspect-auto lg:min-h-[640px]",
  card: "aspect-[3/2]",
  inline: "aspect-[16/9]",
  portrait: "aspect-[4/5]",
};

export function EditorialImage({
  alt,
  aspect = "card",
  caption,
  credit,
  objectPosition,
  wrapperClassName,
  imageClassName,
  sizes = "100vw",
  ...imageProps
}: EditorialImageProps) {
  return (
    <figure className={wrapperClassName}>
      <div className={cn("relative overflow-hidden bg-mist", aspectClasses[aspect])}>
        <Image
          {...imageProps}
          alt={alt}
          fill
          sizes={sizes}
          style={{ objectPosition }}
          className={cn("object-cover", imageClassName)}
        />
      </div>
      {caption || credit ? (
        <figcaption className="mt-2 text-xs leading-relaxed text-ink/55">
          {caption}{caption && credit ? " · " : ""}{credit}
        </figcaption>
      ) : null}
    </figure>
  );
}
