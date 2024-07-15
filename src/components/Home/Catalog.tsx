import { Movie } from '@/types/movie'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Suspense } from 'react'
import Link from 'next/link'

interface CatalogProps {
  movies: Movie[]
  isLoading: boolean
}

export function Catalog({ movies }: CatalogProps) {
  return (
    <main className="container my-4">
      <Suspense fallback={<h1>Loading</h1>}>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <Link key={movie.id} href={`movies/${movie.id}`}>
              <Card className="border-none">
                <div className="relative h-60 w-full shadow">
                  <Image
                    src={
                      movie.photoUrl ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s'
                    }
                    alt={movie.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t object-contain object-center"
                  />
                </div>
                <div className="mt-2 p-4">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="truncate text-gray-600 hover:text-clip">
                    {movie.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Suspense>
    </main>
  )
}
