import Link from 'next/link'

export function Header() {
  return (
    <header className="container w-full">
      <Link href="/">
        <h2>Movies Api</h2>
      </Link>
    </header>
  )
}
