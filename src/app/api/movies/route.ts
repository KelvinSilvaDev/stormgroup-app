import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')
  const genre = searchParams.get('genre')
  const director = searchParams.get('director')

  try {
    const response = await axios.get('http://localhost:3000/movies', {
      params: {
        title,
        genre,
        director,
      },
    })
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.error()
  }
}
