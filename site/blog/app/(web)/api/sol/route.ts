// Reference:  https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextResponse, NextRequest } from "next/server";

import { fetchTransaction } from "./utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const tx = searchParams.get("tx");
  if (tx) {
    const data = await fetchTransaction(tx, "json");
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: "请输入查询参数:tx" });
  }
}
