import type { LinkItem } from "@/data/profile";
import LinkIcon from "@/components/LinkIcon";

export default function LinkCard({ link }: { link: LinkItem }) {
  // mailto: 같은 링크는 새 탭으로 열면 빈 탭이 남으므로 웹 주소만 새 탭으로 엽니다.
  const isWebLink = link.url.startsWith("http");

  return (
    <a
      href={link.url}
      {...(isWebLink && { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex items-center gap-4 rounded-3xl border border-white/70 bg-white/45 px-4 py-4 shadow-[0_4px_24px_-10px_rgba(70,95,160,0.22)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_10px_30px_-12px_rgba(70,95,160,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:px-5 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-100">
        <LinkIcon name={link.icon} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold tracking-tight">{link.title}</p>
        <p className="truncate text-sm text-slate-500 dark:text-slate-400">
          {link.description}
        </p>
      </div>
      <span
        aria-hidden
        className="text-slate-400 transition duration-300 group-hover:translate-x-0.5 group-hover:text-slate-600 dark:group-hover:text-slate-200"
      >
        →
      </span>
    </a>
  );
}
