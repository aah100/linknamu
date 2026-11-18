import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="rounded-full bg-gradient-to-b from-white to-sky-100 p-1.5 shadow-[0_12px_32px_-12px_rgba(70,95,160,0.45)] dark:from-slate-700 dark:to-slate-800">
        <Image
          src={profile.imageUrl}
          alt={`${profile.name} 프로필 사진`}
          width={128}
          height={128}
          priority
          className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-slate-500 text-balance dark:text-slate-400">
        {profile.bio}
      </p>
    </header>
  );
}
