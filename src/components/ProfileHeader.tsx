import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.imageUrl}
        alt={`${profile.name} 프로필 사진`}
        width={160}
        height={160}
        priority
        className="h-36 w-36 rounded-full border-2 border-gray-200 object-cover sm:h-40 sm:w-40 dark:border-gray-700"
      />
      <h1 className="mt-5 text-2xl font-bold">{profile.name}</h1>
      <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
        {profile.bio}
      </p>
    </header>
  );
}
