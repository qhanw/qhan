import { type NextRequest } from "next/server";

async function digestMessage(message: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const digest = await crypto.subtle.digest("SHA-1", data);

  const hash = Array.from(new Uint8Array(digest))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
  return hash;
}

// 获取微信身份签名
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  const cfg = {
    appId: "wx710dc9a208086c41",
    noncestr: "Wm3WZYTPz0wzccnW",
    timestamp: "1414587457",
  };

  const t = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${cfg.appId}&secret=ec452b558de7bbb62caf708fbd3e9b76`,
    { next: { revalidate: 7200 } }
  ).then((res) => res.json());

  const ticket = await fetch(
    `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${t.access_token}&type=jsapi`,
    { next: { revalidate: 7200 } }
  ).then((res) => res.json());

  const txt = `jsapi_ticket=${ticket.ticket}&noncestr=${cfg.noncestr}&timestamp=${cfg.timestamp}&url=${url}`;

  const signature = await digestMessage(txt);

  return Response.json({ ...cfg, signature });
}
