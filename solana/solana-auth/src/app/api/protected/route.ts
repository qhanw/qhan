// import { getToken } from "next-auth/jwt";

// const secret = process.env.AUTH_SECRET;

import { auth } from "@/auth";

export const GET = auth((req) => {
  // const token = await getToken({ req, secret });

  // console.log("token", token, req.auth);

  if (req.auth) {
    return Response.json({
      data: "This is protected content. You can access this content because you are signed in with your Solana Wallet.",
    });
  }

  return Response.json(
    {
      message:
        "Not authenticated, You must be signed in with your Solana Wallet to view the protected content on this page.",
    },
    { status: 401 }
  );
});

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const token = await getToken({ req, secret });

//   if (!token || !token.sub)
//     return res.send({
//       error: "User wallet not authenticated",
//     });

//   if (token) {
//     return res.send({
//       content:
//         "This is protected content. You can access this content because you are signed in with your Solana Wallet.",
//     });
//   }

//   res.send({
//     error:
//       "You must be signed in with your Solana Wallet to view the protected content on this page.",
//   });
// }
