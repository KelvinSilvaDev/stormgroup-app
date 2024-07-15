/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/vote.tsx
import { useState } from 'react'
import { Button } from './ui/button'
import api from '@/service/api'
import { useAuth } from '@/hooks/useAuth'

type VoteProps = {
  movieId: string
}

export const Vote: React.FC<VoteProps> = ({ movieId }) => {
  const { user } = useAuth()

  const [vote, setVote] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleVote = async (vote: number) => {
    if (!user) {
      setError('Usuário não autenticado')
      return
    }

    try {
      const response = await api.post(`/movies/${movieId}/vote`, {
        vote,
        userId: user.id,
      })
      setMessage(response.data.message)
      setError(null)
    } catch (err: any) {
      setMessage(null)
      setError(err.response?.data?.message || 'Erro ao enviar voto')
    }
  }

  return (
    <div className="my-4">
      <h3 className="mb-2 text-lg font-semibold">Vote neste filme:</h3>
      <div className="flex space-x-2">
        {[1, 2, 3, 4].map((value) => (
          <Button
            key={value}
            variant={vote === value ? 'destructive' : 'default'}
            onClick={() => {
              setVote(value)
              handleVote(value)
            }}
          >
            {value}
          </Button>
        ))}
      </div>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  )
}
