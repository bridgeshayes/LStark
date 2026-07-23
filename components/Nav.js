import Link from "next/link";

export default function Nav({ brand }) {
  return (
    <nav>
      <div className="wrap">
        <Link href="/" className="brand">
          {brand.first} <span>{brand.last}</span>
        </Link>
        <div className="navlinks">
          <Link href="/#clips">Clips</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
