import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-2xl border border-gray-300 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="min-w-0">
        <p className="font-semibold">{link.title}</p>
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {link.description}
        </p>
      </div>
      <span aria-hidden className="ml-4 text-gray-400">
        →
      </span>
    </a>
  );
}
