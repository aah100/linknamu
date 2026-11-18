"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 보여 줍니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  // 페이지가 열리면 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Record<string, number> }) =>
        // 응답 전에 이미 누른 클릭이 있으면 그만큼 더해 줘서 숫자가 줄어 보이지 않게 합니다.
        setCounts((prev) => {
          const next = { ...data.counts };
          for (const [id, local] of Object.entries(prev)) {
            next[id] = (next[id] ?? 0) + local;
          }
          return next;
        }),
      )
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("클릭 수를 불러오지 못했습니다:", error);
      });

    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    // 화면에는 바로 +1을 반영하고, 저장 요청은 뒤에서 보냅니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // keepalive: 링크로 이동하며 페이지가 바뀌어도 요청이 끝까지 전송되게 합니다.
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch((error) => console.error("클릭 수를 저장하지 못했습니다:", error));
  };

  return (
    <ul className="mt-12 flex flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            clickCount={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
