import { NextRequest, NextResponse } from "next/server";
import { pageService } from "@/app/application/page.service";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { role } = await req.json();

    const page = pageService.publish(id, role);

    return NextResponse.json(page);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 403 }
    );
  }
}
