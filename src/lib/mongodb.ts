import { MongoClient, type Collection } from "mongodb";

// 클릭 수 문서: _id는 링크 id(예: "github"), count는 누적 클릭 수
export type ClickDoc = { _id: string; count: number };

const DB_NAME = "linknamu";
const COLLECTION_NAME = "clicks";

// 개발 모드에서는 코드 변경(HMR)마다 모듈이 다시 실행되므로
// 연결을 전역에 보관해 매번 새 연결이 쌓이지 않게 합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
  }

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri)
      .connect()
      .catch((error) => {
        // 연결에 실패하면 캐시를 비워, 설정을 고친 뒤 다음 요청에서 다시 시도하게 합니다.
        globalForMongo._mongoClientPromise = undefined;
        throw error;
      });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClient();
  return client.db(DB_NAME).collection<ClickDoc>(COLLECTION_NAME);
}
