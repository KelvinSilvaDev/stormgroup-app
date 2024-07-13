'use client'

import { useState } from 'react'
import { Button, Input, Label } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'

type ImageProps = {
  url?: string
  src: string
  alt?: string
}

type Props = {
  logo: ImageProps
  title: string
  description: string
  logInButton: ButtonProps
  logInWithGoogleButton: ButtonProps
  forgotPassword: {
    text: string
    url: string
  }
  image: ImageProps
  signUpText: string
  signUpLink: {
    text: string
    url: string
  }
  footerText: string
}

export type Login7Props = React.ComponentPropsWithoutRef<'section'> &
  Partial<Props>

const LoginPage = (props: Login7Props) => {
  const {
    logo,
    title,
    description,
    logInButton,
    forgotPassword,
    image,
    signUpText,
    signUpLink,
    footerText,
  } = {
    ...Login7Defaults,
    ...props,
  } as Props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ email, password })
  }

  return (
    <section>
      <div className="relative grid min-h-screen grid-cols-1 items-stretch justify-center overflow-auto lg:grid-cols-2">
        <div className="md:h-18 absolute bottom-auto left-0 right-0 top-0 z-10 flex h-16 w-full items-center justify-center px-[5%] lg:justify-between">
          <a href={logo.url} className="focus-visible:outline-none">
            <img src={logo.src} alt={logo.alt} />
          </a>
        </div>
        <div className="relative mx-[5vw] flex items-center justify-center pb-16 pt-20 md:pb-20 md:pt-24 lg:py-20">
          <div className="container max-w-sm">
            <div className="container mb-6 max-w-lg text-center md:mb-8">
              <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {title}
              </h1>
              <p className="md:text-md">{description}</p>
            </div>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <div className="grid w-full items-center">
                <Label htmlFor="email" className="mb-2">
                  Email*
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  className="text-foreground"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full items-center">
                <div className="flex items-start justify-between">
                  <Label htmlFor="password" className="mb-2">
                    Senha*
                  </Label>
                  <a
                    href={forgotPassword.url}
                    className="underline focus-visible:outline-none"
                  >
                    {forgotPassword.text}
                  </a>
                </div>
                <Input
                  type="password"
                  id="password"
                  className="text-foreground"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid-col-1 grid gap-4">
                <Button
                  variant={logInButton.variant}
                  size={logInButton.size}
                  iconLeft={logInButton.iconLeft}
                  iconRight={logInButton.iconRight}
                >
                  {logInButton.title}
                </Button>
              </div>
            </form>
            <div className="mt-5 inline-flex w-full items-center justify-center gap-x-1 text-center md:mt-6">
              <p>{signUpText}</p>
              <a
                href={signUpLink.url}
                className="underline focus-visible:outline-none"
              >
                {signUpLink.text}
              </a>
            </div>
          </div>
        </div>
        <div className="bg-background-secondary hidden lg:block">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        </div>
        <footer className="md:h-18 absolute bottom-0 left-0 right-0 top-auto flex h-16 w-full items-center justify-center pr-[5%] lg:justify-start lg:px-[5%]">
          <p className="text-sm">{footerText}</p>
        </footer>
      </div>
    </section>
  )
}

export const Login7Defaults: Login7Props = {
  logo: {
    url: '#',
    src: 'https://relume-assets.s3.amazonaws.com/logo-image.svg',
    alt: 'Logo text',
  },
  title: 'Login',
  description: 'Entre e faça suas próprias avaliações.',
  logInButton: {
    title: 'Login',
  },
  image: {
    src: 'https://relume-assets.s3.amazonaws.com/placeholder-image.svg',
    alt: 'Placeholder image',
  },
  forgotPassword: {
    text: 'Esqueci minha senha',
    url: '#',
  },
  signUpText: 'Ainda não tem um cadastro?',
  signUpLink: {
    text: 'Cadastrar',
    url: '/cadastro',
  },
  footerText: '© 2024 | StormGroup',
}

LoginPage.displayName = 'LoginPage'

export default LoginPage

// 'use client'
// import { Button } from '@/components/ui/button'
// import { Card, CardHeader, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import api from '@/service/api'
// import { useState } from 'react'
// import 'tailwindcss/tailwind.css'

// const LoginPage = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault()
//     // Lógica de autenticação
//     const response = await api.post('/login', {
//       email,
//       password,
//     })

//     if (response.status === 200) {
//       const token = localStorage.setItem(
//         'authToken',
//         response.data.access_token,
//       )
//       return token
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <Card className="w-full max-w-md p-8">
//         <CardHeader>
//           <h2 className="text-center text-2xl font-semibold">Login</h2>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="mt-1 block w-full"
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Senha
//               </label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="mt-1 block w-full"
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Entrar
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default LoginPage
