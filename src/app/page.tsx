import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 은은한 빛 번짐: 글래스 카드 뒤에 비칠 색감을 만들어 줍니다. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-200/70 blur-3xl dark:bg-sky-900/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-rose-100/70 blur-3xl dark:bg-indigo-900/30"
      />

      <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-16 sm:px-8 sm:py-24">
        <ProfileHeader profile={profile} />

        <ul className="mt-12 flex flex-col gap-4 sm:gap-5">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
