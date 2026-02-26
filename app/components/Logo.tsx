import Image from "next/image";

type Props = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className = "", variant = "dark" }: Props) {
  const textClass =
    variant === "light" ? "text-white" : "text-navy";

  return (
    <a href="#" className={`inline-flex items-center gap-3 ${className}`}>
      <span className="relative flex h-11 w-11 shrink-0 sm:h-12 sm:w-12">
        <Image
          src="/logo.png"
          alt=""
          width={48}
          height={48}
          className="object-contain"
          priority
        />
      </span>
      <span className={`font-serif text-xl font-semibold tracking-tight sm:text-2xl ${textClass}`}>
        Northstar Energy Partners
      </span>
    </a>
  );
}
