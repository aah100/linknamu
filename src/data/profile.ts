// 보여 주기용 더미 데이터입니다. 실제 내용은 나중에 이 파일만 수정하면 됩니다.

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
};

export type LinkIconName = "github" | "mail";

export type LinkItem = {
  id: string;
  icon: LinkIconName;
  title: string;
  description: string;
  url: string;
};

export const profile: Profile = {
  name: "김아희",
  bio: "풀스택 개발자 | 요즘 ai 활용에 대해서 공부 중입니다!",
  imageUrl: "/profile.jpg",
};

export const links: LinkItem[] = [
  {
    id: "github",
    icon: "github",
    title: "깃허브",
    description: "코드와 프로젝트 저장소",
    url: "https://github.com/aah100",
  },
  {
    id: "email",
    icon: "mail",
    title: "이메일",
    description: "aah100@naver.com",
    url: "mailto:aah100@naver.com",
  },
];
