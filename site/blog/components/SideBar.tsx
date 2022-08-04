import Head from "next/head";
import Link from "next/link";

const name = "Your Name";

export default function SideBar({ children, home, ...otherProps }: any) {
  return (
    <header {...otherProps}>
      <Link href="/">
        <a>
          <img
            src="/images/logo-pink.svg"
            height={108}
            width={108}
            alt={name}
          />
        </a>
      </Link>
      <h1 className="text-white text-right">{name}</h1>
      <h2 className="text-white text-right">
        Fear can hold you prisoner. Hope cna set you free.
      </h2>
      <nav className="text-right">
        <ul className="nav-list">
          <li className="inline-block border-2 border-white text-white px-3 py-1 mt-4">
            <Link href="/">Home</Link>
          </li>
          <li className="inline-block border-2 border-white text-white px-3 py-1 mt-4 ml-2">
            <Link href="/archives">Archives</Link>
          </li>
          <li className="inline-block border-2 border-white text-white px-3 py-1 mt-4 ml-2">
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
