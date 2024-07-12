import MovieSearch from './search/MovieSearch'

export default function Home() {
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center p-16 align-middle">
      <MovieSearch />
    </main>
  )
}
