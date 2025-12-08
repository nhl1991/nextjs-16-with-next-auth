
import { SpotifyImage } from "@/types/spotify";
import Link from "next/link";
import Image from "next/image";

export default function Item({
  external_urls: { spotify },
  images,
  name,
}: {
  external_urls: { spotify: string };
  images: SpotifyImage[],
  name: string;
}) {
  return (
    <article className="p-4 flex flex-col items-center justify-center bg-amber-200 rounded-xl">
          <figure className="w-48 h-48 relative">
            <Image
              src={images[0].url}
              alt="album image"
              fill
              sizes="(max-width: 768px) 33vw, 50vw"
            />
          </figure>
          <div className="flex flex-col items-center gap-y-0.5">
            <p className="font-bold">{name}</p>
            <Link className="flex gap-x-2 rounded-xl hover:bg-emerald-500 px-4 py-1 hover:text-white" href={spotify}>
              Listen on <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="emerald"
                className="w-4 bi bi-spotify"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
              </svg>
              
            </Link>
          </div>
        </article>
  );
}
