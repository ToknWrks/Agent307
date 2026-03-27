import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center">
      <Link aria-label="Agent307" className="flex items-center gap-2" href="/">
        <span className="font-bold text-xl text-black tracking-tighter transition-colors dark:text-white">
          Agent307
        </span>
      </Link>
    </div>
  );
}
