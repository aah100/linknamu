import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 요청마다 최신 값을 읽도록 캐시하지 않습니다.
export const dynamic = "force-dynamic";

const linkIds = links.map((link) => link.id);

// 모든 링크의 클릭 수를 한 번에 반환합니다. 예: { "counts": { "github": 42, "email": 3 } }
export async function GET() {
  try {
    const collection = await getClicksCollection();
    const docs = await collection.find({ _id: { $in: linkIds } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(
      linkIds.map((id) => [id, 0]),
    );
    for (const doc of docs) counts[doc._id] = doc.count;

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("[clicks] 클릭 수 조회 실패:", error);
    return NextResponse.json(
      { error: "클릭 수를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}

// 링크 하나의 클릭 수를 1 늘립니다. body: { "id": "github" }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;

  // 등록된 링크 id만 허용해 임의의 문서가 생기지 않게 합니다.
  if (typeof id !== "string" || !linkIds.includes(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const collection = await getClicksCollection();
    const doc = await collection.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("[clicks] 클릭 수 증가 실패:", error);
    return NextResponse.json(
      { error: "클릭 수를 저장하지 못했습니다." },
      { status: 500 },
    );
  }
}
