import { NextResponse } from "next/server";
import { getEvHubData } from "../../../../lib/evData";

export async function GET() {
  return NextResponse.json(getEvHubData(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
