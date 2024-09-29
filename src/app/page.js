'use client' // Diperlukan untuk menggunakan hooks

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login') // Arahkan user ke halaman login ketika halaman Home dibuka
  }, [router])

  return null // Tidak ada konten yang perlu ditampilkan di halaman Home
}
