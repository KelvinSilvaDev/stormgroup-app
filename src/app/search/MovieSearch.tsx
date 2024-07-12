'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { debounce } from 'lodash'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const fetcher = (url: string) => axios.get(url).then((res) => res.data.movies)

const MovieSearch = () => {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [director, setDirector] = useState('')
  const { data: movies, error } = useSWR(
    () => `/api/movies?title=${title}&genre=${genre}&director=${director}`,
    fetcher,
  )

  const debouncedSetTitle = useCallback(
    debounce((value) => setTitle(value), 500),
    [],
  )

  const debouncedSetGenre = useCallback(
    debounce((value) => setGenre(value), 500),
    [],
  )

  const debouncedSetDirector = useCallback(
    debounce((value) => setDirector(value), 500),
    [],
  )

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetTitle(e.target.value)
  }

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetGenre(e.target.value)
  }

  const handleDirectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetDirector(e.target.value)
  }

  if (error) return <div>Error fetching movies</div>
  if (!movies) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Movie Search</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <Input type="text" onChange={handleTitleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Genre:
          </label>
          <Input type="text" onChange={handleGenreChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Director:
          </label>
          <Input type="text" onChange={handleDirectorChange} />
        </div>
      </form>
      <div className="mt-6">
        <h2 className="mb-2 text-xl font-semibold">Movie Results</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie: any) => (
            <Card key={movie.id}>
              <img
                src={movie.photoUrl}
                alt={movie.title}
                className="mb-4 h-48 w-full rounded object-cover"
              />
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p>{movie.description}</p>
              <p>Genre: {movie.genre.name}</p>
              <p>Director: {movie.director.name}</p>
              <p>
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </p>
              <div>
                <h4 className="font-semibold">Actors:</h4>
                <ul>
                  {movie.actors.map((actor: any) => (
                    <li key={actor.id}>{actor.name}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieSearch
