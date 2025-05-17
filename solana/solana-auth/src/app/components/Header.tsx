"use client";
import Link from "next/link";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";

import {
  useWalletModal,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SigninMessage } from "@/utils/SigninMessage";
import bs58 from "bs58";

import { useEffect } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log("status", status);

  const wallet = useWallet();
  const walletModal = useWalletModal();

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) walletModal.setVisible(true);

      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: csrf,
      });

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      signIn("credentials", {
        message: JSON.stringify(message),
        signature: serializedSignature,
        // redirect: false, // 可以保障页面刷新
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (wallet.connected && status === "unauthenticated") {
      handleSignIn();
    }
  }, [wallet.connected]);

  return (
    <header className="mx-8">
      <div className="flex">
        <div
          className={`flex nojs-show ${
            !session && loading ? "loading" : "loaded"
          }`}
        >
          {!session && (
            <>
              <span>You are not signed in</span>
              <span onClick={handleSignIn}>Sign in</span>
              {/* <WalletMultiButton /> */}
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={"avatar"}
                />
              )}
              <span className={"signedInText"}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={"button"}
                onClick={async (e) => {
                  e.preventDefault();
                  await wallet.disconnect();
                  // signOut({ redirect: false });
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </div>
      </div>
      <nav>
        <ul className="flex gap-2">
          <li className="hover:text-blue-500">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-500">
            <Link href="/examples/protected">Protected API Route</Link>
          </li>
          <li className="hover:text-blue-500">
            <Link href="/me">Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
