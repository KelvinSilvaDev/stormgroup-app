'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { login, register } from '@/service/auth'

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type RegisterSchema = z.infer<typeof registerSchema>

export default function Register() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })
  const router = useRouter()
  const handleSubmit = async (data: RegisterSchema) => {
    console.log(data)
    try {
      const res = await register(data)

      if (res) {
        toast('Usuário cadastrado.')
        const auth = await login({ email: data.email, password: data.password })
        if (auth.access_token) {
          router.push('/')
        }
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
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded p-8 shadow-md">
        <h2 className="mb-8 text-center text-2xl font-bold">Register</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
