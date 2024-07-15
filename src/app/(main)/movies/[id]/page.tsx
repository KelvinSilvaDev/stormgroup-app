'use client'
// app/movies/[id]/page.tsx
import { SetStateAction, useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'

import { MovieDetails } from '@/components/Movie/movie-details'
import api from '@/service/api'

const MovieDetailPage = ({ params }: { params: { id: string } }) => {
  //   const params = useSearchParams()

  //   params.get('id')
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('FILME COM ID ', params.id)
    if (params.id) {
      api
        .get(`movies/${params.id}`)
        .then((response: { data: SetStateAction<null> }) => {
          setMovie(response.data)
          setLoading(false)
        })
        .catch((error: { message: SetStateAction<null> }) => {
          setError(error.message)
          setLoading(false)
        })
    }
  }, [params.id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!movie) return <p>No movie found</p>

  return (
    <div className="mx-auto max-w-4xl p-4">
      <MovieDetails movie={movie} />
    </div>
  )
}

export default MovieDetailPage
