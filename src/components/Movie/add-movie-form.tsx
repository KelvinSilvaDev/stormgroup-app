'use client'
// components/ui/add-movie-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'

import { useState } from 'react'
import api from '@/service/api'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'sonner'

const addMovieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  releaseDate: z
    .string()
    .min(1, { message: 'Release Date is required' })
    .transform((value) => {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
      }
      return date.toISOString() // Converte para o formato ISO-8601
    }),
  directorName: z.string().min(1, 'Director Name is required'),
  genreName: z.string().min(1, 'Genre Name is required'),
  photoUrl: z.string().url({ message: 'Photo URL must be a valid URL' }),
  isActive: z.boolean(),
})

type AddMovieSchema = z.infer<typeof addMovieSchema>

export const AddMovieForm = () => {
  const form = useForm<AddMovieSchema>({
    resolver: zodResolver(addMovieSchema),
    defaultValues: {
      isActive: true,
    },
  })

  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: AddMovieSchema) => {
    try {
      const response = await api.post('/movies', data)
      if (response) {
        toast.success('FOI')
      }
      setMessage('Filme adicionado com sucesso!')
      setError(null)
    } catch (err) {
      setError('Erro ao adicionar filme')
      setMessage(null)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Adicionar Novo Filme</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="releaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Lançamento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="directorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diretor</FormLabel>
                <FormControl>
                  <Input placeholder="Diretor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="genreName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
                <FormControl>
                  <Input placeholder="Gênero" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="photoUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-full">
            Adicionar Filme
          </Button>
        </form>
      </Form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  )
}
