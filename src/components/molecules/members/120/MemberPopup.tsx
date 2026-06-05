'use client'

import React, { useEffect } from 'react'

import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.png'
// Import file GIF dari folder yang sama
import ZetaGif from './zeta.gif'
// ZetaGif buat backgroung
// Import file JPG dari folder yang sama
import CinemeowImg from './absolute_cinemeow.jpg'
//CinemeowImg buat overay profile image di popup

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  // TAMBAHKAN STATE INI:
  const [isFlipped, setIsFlipped] = React.useState(false)

  useEffect(() => {
    if (!isOpen) {
      setIsFlipped(false) // Reset status saat popup ditutup
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    // PADA BAGIAN INI KAMU BOLEH MENGUBAH STYLE SESUKA HATI KAMU, TAPI JANGAN UBAH STRUKTUR DAN FUNGSI DARI KODE INI AGAR FUNGSI POPUP TETAP BERJALAN DENGAN BAIK
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pt-28 pb-8 sm:pt-32">
      <button
        type="button"
        aria-label="Close member detail"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* =========================================================
          KOTAK LUAR POPUP: Menentukan tinggi-lebar kartu & memotong ujung GIF
          (z-10 diubah ke relative, overflow-y-auto DIHAPUS dari sini)
         ========================================================= */}
      <div className="border-neutral-cs-10 relative z-10 h-[calc(100vh-9rem)] w-full max-w-[720px] animate-[member-popup-show_200ms_ease-out] rounded-2xl border-2 text-white shadow-xl sm:h-[calc(100vh-10rem)] overflow-hidden">
        
        {/* BACKGROUND GIF: Sekarang pakai 'absolute', dia otomatis stay karena box luarnya tidak bisa di-scroll */}
        <img 
          src={ZetaGif.src} 
          alt="Vestia Zeta Background" 
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center pointer-events-none"
        />

        {/* LAPISAN OVERLAY GELAP */}
        <div className="absolute inset-0 -z-10 bg-black/50 backdrop-blur-[1px]" />

        {/* =========================================================
            KOTAK DALAM POPUP: Khusus menampung konten yang bisa di-scroll
            (Trik utama agar konten gerak tapi background di luar tetap diam)
           ========================================================= */}
        <div className="absolute inset-0 overflow-y-auto p-6 sm:p-8">

          {/* TOMBOL CLOSE POPUP */}
          <button
            type="button"
            aria-label="Close member detail"
            onClick={onClose}
            className="border-neutral-cs-10 hover:bg-neutral-cs-10/10 absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border text-xl leading-none z-20"
          >
            x
          </button>

          {/* CONTAINER FOTO PROFIL */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)} // Tambahkan fungsi untuk toggle flip saat foto diklik (buat bantu mobile user)
            className="border-neutral-cs-10/40 mb-5 overflow-hidden rounded-2xl border relative z-10 group cursor-pointer select-none"
          >
            {/* Foto profile asli */}
            <Image 
              src={ProfileImage} 
              alt="Profile Image" 
              className="h-120 w-full object-cover object-center" 
            />
            {/* Lapisan overlay dengan efek blur dan gambar Cinemeow */}
            <img 
              src={CinemeowImg.src} 
              alt="Absolute Cinemeow Overlay" 
              className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-in-out pointer-events-none group-hover:opacity-0 ${isFlipped ? 'opacity-0' : 'opacity-100'}" 
            />
          </div>

          <div className="pr-10 relative z-10">
            {/* NAMA */}
            <h2 className="text-2xl font-black font-sans tracking-wide">Rido Patra Yudhistira Edwin</h2>
            {/* NRP DAN ASAL */}
            <p className="text-neutral-cs-10/70 mt-1 text-sm font-semibold font-mono">5027251120 - Surabaya</p>
          </div>

          <div className="mt-5 flex gap-2 relative z-10">
            <Instagram username="bl4nk_06/" />
            <LinkedInButtonLink username="rido-patra-yudhistira-edwin-2a0697379" />
          </div>

          {/* GRIDS INFORMASI DENGAN EFEK GLASSMORPHISM */}
          <div className="mt-6 grid gap-4 text-sm font-semibold sm:grid-cols-2 relative z-10">
            <div className="border-neutral-cs-10/40 bg-black/40 backdrop-blur-md rounded-xl border p-4">
              <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase font-mono">Site ɑ: 俺の趣味 (Hobiku):</p>
              <p className="mt-2 font-sans font-medium">Nonton Anime dan Donghua, Baca Manga, Manhwa, Manhua, dan Light Novel, Main Game; terutama game Gacha, Shooter, RPG, Anime, Sandbox, Menggambar, Mendengarkan Lagu; mostly lagu Jepang, Game, Anime</p>
            </div>
            <div className="border-neutral-cs-10/40 bg-black/40 backdrop-blur-md rounded-xl border p-4">
              <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase font-mono">Site β: 俺の豆知識 (Fun Fact tentang aku):</p>
              <p className="mt-2 font-sans font-medium">Sudah main dan preregist banyak anime style RPG gacha game (Terlalu banyak sampe bisa jadi bahan yapping berjam-jam)</p>
            </div>
          </div>

          <div className="border-neutral-cs-10/40 bg-black/40 backdrop-blur-md mt-4 rounded-xl border p-4 relative z-10">
            <p className="text-neutral-cs-10/60 text-xs font-bold tracking-wide uppercase font-mono">Site ζ: 俺が好きな曲 (Lagu kesukaanku):</p>
            <p className="my-2 text-sm font-semibold font-sans">"You're Mine" — Vestia Zeta</p>
            <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/3kK8euC9eUBRwZKpMsQsDZ?si=2337bb62b0bd4ada" />
          </div>

        </div> {/* BATAS KOTAK DALAM POPUP */}

      </div>
    </div>
  )
}

export default MemberPopup