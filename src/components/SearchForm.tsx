import { Search } from 'lucide-react'
import { Input } from './ui/input'

export function SearchForm() {
  return <Input endIcon={Search} type="text" placeholder="Password" />
}
