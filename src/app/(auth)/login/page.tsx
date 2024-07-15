'use client'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'

import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { login } from '@/service/auth'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function Login() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data)

      if (res) {
        toast('Login bem-sucedido.')
        router.push('/')
      } else {
        toast.error('Credenciais erradas.')
      }
    } catch (error) {
      console.error('Falha ao efetuar login:', error)
      toast.error('Usuario não localizado.', {
        style: {
          background: 'black',
          color: 'white',
        },
      })
    }
    // Handle login logic
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded p-8 shadow-md">
        <h2 className="mb-8 text-center text-2xl font-bold">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
