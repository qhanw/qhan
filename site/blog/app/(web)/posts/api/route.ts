import { NextResponse, NextRequest } from "next/server";

import { getPostBySlug } from "@/app/(web)/lib/posts";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")!;

  return NextResponse.json({
    data: getPostBySlug(slug)!.meta.title,
    slug,
  });
}
