import { NextResponse, NextRequest } from "next/server";

import { getPost } from "@/app/(web)/lib/service";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")!;

  return NextResponse.json({ data: getPost(slug)!.meta.title, slug });
}
