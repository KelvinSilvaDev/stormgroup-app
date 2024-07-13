'use client'
import { Catalog } from '@/components/Home/Catalog'
import { useState, useEffect } from 'react'

import Header from '@/components/Home/Header'
import { Movie } from '@/types/movie'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import api from '@/service/api'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      //   const { data } = await api.get(
      //     `http://localhost:3000/movies?page=${currentPage}&pageSize=1`,
      //   )

      setIsLoading(true)
      const res = await fetch(
        `http://localhost:3000/movies?page=${currentPage}&pageSize=1`,
      )

      if (res.status === 200) {
        setIsLoading(false)
      }

      const data = await res.json()
      setTotalPages(data.totalPages)
      setMovies(data.movies)
      console.log(data)
      return data
    }

    fetchMovies()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <main>
      <Header />
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
