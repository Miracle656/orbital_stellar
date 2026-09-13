import { getVerdictStore } from "@/lib/registry";

export const dynamic = "force-dynamic";

const SCHEMA_VERSION = "1.0.0";
const CACHE_CONTROL = "public, s-maxage=60, stale-while-revalidate=300";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const contractId = searchParams.get("contractId");

  const store = getVerdictStore();

  if (contractId) {
    const verdict = await store.getLatest(contractId);
    if (!verdict) {
      return Response.json({ error: "not_found", message: "No verdict for this contract" }, { status: 404 });
    }
    return Response.json(
      { meta: { schema_version: SCHEMA_VERSION }, data: verdict },
      { headers: { "Cache-Control": CACHE_CONTROL } },
    );
  }

  const verdicts = await store.getAll();
  return Response.json(
    { meta: { schema_version: SCHEMA_VERSION }, data: verdicts },
    { headers: { "Cache-Control": CACHE_CONTROL } },
  );
}
