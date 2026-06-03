import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const lead = Object.fromEntries(formData.entries());

  if (!lead.email && !lead.phone) {
    return NextResponse.json(
      { ok: false, message: "Please include an email or phone number so a supplier can follow up." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks. Your request was received. Confirm tire size, quantity, and location when speaking with a supplier."
  });
}
