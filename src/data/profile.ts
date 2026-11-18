// 보여 주기용 더미 데이터입니다. 실제 내용은 나중에 이 파일만 수정하면 됩니다.

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
};

export type LinkItem = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export const profile: Profile = {
  name: "김클로",
  bio: "나는야 세계 최강의 바이브코더!",
  imageUrl: "/profile-placeholder.svg",
};

export const links: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    description: "코드와 프로젝트 저장소",
    url: "https://github.com/",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "경력과 이력",
    url: "https://www.linkedin.com/",
  },
  {
    id: "blog",
    title: "Blog",
    description: "개발 기록과 생각들",
    url: "https://example.com/",
  },
];
