/* eslint-disable no-use-before-define */
// User.ts
export interface User {
  id: number
  // Adicione mais propriedades do modelo User conforme necessário
}

// Director.ts
export interface Director {
  id: number
  name: string
  movies: Movie[]
}

// Movie.ts
export interface Movie {
  id: number
  title: string
  description: string
  releaseDate: Date
  photoUrl: string
  director?: Director
  directorId?: number
  genre?: Genre
  genreId?: number
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  votes: Vote[]
  movieActors: MovieActor[]
}

// Vote.ts
export interface Vote {
  id: number
  score: number
  userId: number
  movieId: number
  createdAt: Date
  user: User
  movie: Movie
}

// Genre.ts
export interface Genre {
  id: number
  name: string
  movies: Movie[]
}

// Actor.ts
export interface Actor {
  id: number
  name: string
  movieActors: MovieActor[]
}

// MovieActor.ts
export interface MovieActor {
  id: number
  movieId: number
  actorId: number
  movie: Movie
  actor: Actor
}
