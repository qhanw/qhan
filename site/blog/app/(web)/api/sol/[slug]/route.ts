// Reference:  https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextResponse, NextRequest } from "next/server";
import { fetchTransaction } from "../utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const tx = (await params).slug;

  if (tx) {
    const data = await fetchTransaction(tx, "jsonParsed");
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: "请输入查询参数:tx" });
  }
}
