import { NextRequest, NextResponse } from "next/server";
import { pageService } from "@/application/page.service";

export async function POST(req: NextRequest) {
  try {
    const { title, content, role, userId } = await req.json();

    const page = pageService.create(title, content, role, userId);

    return NextResponse.json(page);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 403 }
    );
  }
}
