import { NextRequest, NextResponse } from 'next/server'
import api from '@/service/api'

export async function POST(request: NextRequest) {
  try {
    const { title, description, releaseDate, director, genre, photoUrl } =
      await request.json()

    const response = await api.post(
      'http://localhost:3000/movies',
      {
        title,
        description,
        releaseDate,
        director,
        genre,
        photoUrl,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return NextResponse.json(response.data, { status: response.status })
  } catch (error) {
    console.error('Error posting data:', error)

    return NextResponse.json({ message: 'Error creating movie' })
  }
}
