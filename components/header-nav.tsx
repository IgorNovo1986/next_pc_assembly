'use client'

import { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { DoorOpen, FingerprintPattern } from 'lucide-react'
import { getTabValue } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { signOut } from 'next-auth/react'

type AuthSession = {
  session: Session | null
}

export default function HeaderNav({ session }: AuthSession) {
  const pathname = usePathname()
  const tabValue = getTabValue(pathname)

  if (!session?.user) {
    return (
      <div className="flex justify-end">
        <Button variant="outline">
          <Link href="/login" className="flex items-center gap-2">
            <FingerprintPattern className="w-20 h-20" />
            Войти
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div />
      <div className="flex jusify-center">
        <Tabs value={tabValue} className="w-fit">
          <TabsList variant="line">
            <TabsTrigger value="dashboard" asChild>
              <Link href="/dashboard">Создать сборку</Link>
            </TabsTrigger>
            <TabsTrigger value="builds" asChild>
              <Link href="/builds">Мои сборки</Link>
            </TabsTrigger>
            <TabsTrigger value="explore" asChild>
              <Link href="/builds/explore">Публичные сборки</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="lg"
          type="button"
          onClick={() => signOut({ redirectTo: '/' })}
          className="flex item-center gap-2 cursor-pointer"
        >
          <DoorOpen className="w-20 h-20" />
          Выйти
        </Button>
      </div>
    </div>
  )
}
