/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Catalog } from '@/components/Home/Catalog'
import { useState, useEffect } from 'react'

// import Header from '@/components/Home/Header'
import { Movie } from '@/types/movie'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
// import { Filter } from '@/components/Home/Filter'
// import api from '@/service/api'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState({ director: '', actor: '', genre: '' })
  const [sortBy, setSortBy] = useState<string>('title')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const url = new URL(apiUrl + '/movies')

        url.searchParams.append('page', currentPage.toString())
        url.searchParams.append('pageSize', '12')

        if (filters.director)
          url.searchParams.append('director', filters.director)
        if (filters.actor) url.searchParams.append('actor', filters.actor)
        if (filters.genre) url.searchParams.append('genre', filters.genre)
        if (sortBy) url.searchParams.append('sortBy', sortBy)
        if (order) url.searchParams.append('order', order)

        const res = await fetch(url)

        if (!res.ok) {
          throw new Error(`Error fetching movies: ${res.statusText}`)
        }

        const data = await res.json()
        setTotalPages(data.totalPages)
        setMovies(data.movies)
        console.log(data)
        return data
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [currentPage, filters, sortBy, order])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleTogleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const director = formData.get('director') as string
    const actor = formData.get('actor') as string
    const genre = formData.get('genre') as string

    setFilters({ director, actor, genre })
    setCurrentPage(1)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }

  const handleOrderChange = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  return (
    <main className="container">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="my-9 w-full text-2xl font-bold">
          Confira nossos filmes
        </h1>
        <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center">
          <p className="text-sm font-semibold">Ordenar por:</p>
          <select
            className="rounded-md border border-gray-300 px-2 py-1 text-sm font-semibold text-foreground"
            name="order"
            id="order"
            onChange={handleSortChange}
          >
            <option value="title">Título</option>
            <option value="releaseDate">Data de Lançamento</option>
            <option value="rating">Avaliação</option>
          </select>
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-background"
            onClick={handleOrderChange}
          >
            {order === 'asc' ? 'Ascendente' : 'Descendente'}
          </button>
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-background"
            onClick={handleTogleFilter}
          >
            Filtrar
          </button>
          <button className="rounded-md bg-blue-500 px-4 py-2 text-background">
            Favoritos
          </button>
        </div>
      </div>
      <div className="flex w-full">
        {isFilterOpen && (
          <form onSubmit={handleFilterSubmit} className="mb-4">
            <div className="flex gap-4">
              <div>
                <label
                  htmlFor="director"
                  className="block text-sm font-medium text-gray-700"
                >
                  Diretor
                </label>
                <input
                  type="text"
                  name="director"
                  id="director"
                  className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="actor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ator
                </label>
                <input
                  type="text"
                  name="actor"
                  id="actor"
                  className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gênero
                </label>
                <input
                  type="text"
                  name="genre"
                  id="genre"
                  className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-4 py-2 text-background"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {movies && <Catalog movies={movies} isLoading={isLoading} />}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              isActive={currentPage === 1}
              className={
                currentPage === 1 ? 'text-foreground' : 'text-background'
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
                className={
                  index + 1 === currentPage
                    ? 'text-foreground'
                    : 'text-background'
                }
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              isActive={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? 'text-foreground'
                  : 'text-background'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  )
}
