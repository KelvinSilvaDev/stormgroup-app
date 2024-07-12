import Link from 'next/link'
import { SearchForm } from './SearchForm'

export function Header() {
  return (
    <header className="container flex w-full items-center justify-start py-4">
      <Link href="/" className="px-3 py-2">
        <h2 className="text-2xl font-semibold">Movies Api</h2>
      </Link>
      <div className="flex flex-1 items-center">
        <SearchForm />
      </div>
    </header>
  )
}
