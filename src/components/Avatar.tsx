import Image from "next/image";

export default function Avatar({ src }: { src: string }) {
  return (
    <div className="size-16 aspect-square overflow-hidden rounded-md">
      <Image
        src={src}
        alt={src}
        width={70}
        height={70}
        className="rounded-full"
      />
    </div>
  );
}
