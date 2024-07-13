import { Movie } from '@/types/movie'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Suspense } from 'react'

interface CatalogProps {
  movies: Movie[]
  isLoading: boolean
}

export function Catalog({ movies, isLoading }: CatalogProps) {
  return (
    <main className="container">
      <h1 className="my-9 text-2xl font-bold">Confira nossos filmes</h1>
      <Suspense fallback={<h1>Loading</h1>}>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <Card key={movie.id} className="border-none">
              <div className="relative h-80 w-full shadow">
                <Image
                  src={movie.photoUrl}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t object-contain object-center"
                />
              </div>
              <div className="mt-2 p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-gray-600">{movie.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Suspense>
    </main>
  )
}
