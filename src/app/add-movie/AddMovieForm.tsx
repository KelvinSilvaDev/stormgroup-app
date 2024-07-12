'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import api from '@/service/api'

const movieSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
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

  directorName: z.string().min(1, { message: 'Director ID is required' }),
  genreName: z.string().min(1, { message: 'Genre ID is required' }),
  photoUrl: z.string().url({ message: 'Photo URL must be a valid URL' }),
})

type MovieSchema = z.infer<typeof movieSchema>

const AddMovieForm = () => {
  const form = useForm<MovieSchema>({
    resolver: zodResolver(movieSchema),
  })

  const handleSubmit: SubmitHandler<MovieSchema> = async (data) => {
    try {
      const response = await api.post('/movies', data)
      console.log('Movie added:', response.data)
    } catch (error) {
      console.error('Error adding movie:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Add New Movie</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="releaseDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="directorName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diretor</FormLabel>
                <FormControl>
                  <Input type="string" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="genreName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genero</FormLabel>
                <FormControl>
                  <Input type="string" {...field} />
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
          <Button type="submit">Add Movie</Button>
        </form>
      </Form>
    </div>
  )
}

export default AddMovieForm
