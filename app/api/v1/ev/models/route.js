import { NextResponse } from "next/server";
import { evModels } from "../../../../lib/evData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tier = searchParams.get("tier");
  const make = searchParams.get("make");

  if (tier && !/^\d+$/.test(tier)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (make && !/^[a-z0-9-]+$/i.test(make)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const models = evModels.filter((model) => {
    if (tier && String(model.priorityTier) !== tier) {
      return false;
    }

    if (make && model.make !== make) {
      return false;
    }

    return true;
  });

  return NextResponse.json({
    models,
    meta: {
      total: models.length,
    },
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
