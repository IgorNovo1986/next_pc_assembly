import { auth } from '@/auth'
import Link from 'next/link'
import { TypographyH3 } from './ui/typography-h3'
import HeaderNav from './header-nav'
import { Computer } from 'lucide-react'

export async function Header() {
  const session = await auth()

  return (
    <header className="container mx-auto flex items-center px-4 p-6 border-b-1 border-b-grey">
      <div className="shrink-0">
        <TypographyH3>
          <Link
            href={session?.user ? '/dashboard' : '/'}
            className="flex item-center"
          >
            <Computer className="h-8 w-8" /> -builder
          </Link>
        </TypographyH3>
      </div>
      <nav className="min-w-0 flex-1">
        <HeaderNav session={session} />
      </nav>
    </header>
  )
}
