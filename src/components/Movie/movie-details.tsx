// components/ui/movie-details.tsx
import { FC } from 'react'
import Image from 'next/image'
import { Vote } from '../vote'

type Movie = {
  id: string
  title: string
  description: string
  photoUrl: string
  director: {
    id: number
    name: string
  }
  movieActors: [
    {
      id: number
      actor: {
        id: number
        name: string
      }
    },
  ]
  genre: {
    name: string
  }
  averageRating: number
}

type MovieDetailsProps = {
  movie: Movie
}

export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  console.log(movie)
  return (
    <div className="space-y-2 rounded p-6 shadow-md">
      <Image src={movie.photoUrl} alt={movie.title} width={280} height={480} />
      <h1 className="mb-4 text-2xl font-bold">{movie.title}</h1>
      <p className="mb-4">{movie.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Director</h2>
        <p className="">{movie.director.name}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Elenco</h2>
        <ul className="list-inside list-disc">
          {movie.movieActors.map((actor) => (
            <li key={actor.id}>{actor.actor.name}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Gênero</h2>
        <p className="">{movie.genre.name}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Average Rating</h2>
        <p className="">{movie.averageRating}</p>
        <Vote movieId={movie.id} />
      </div>
    </div>
  )
}
