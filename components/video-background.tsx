"use client"

import { useState, useEffect, useRef } from "react"

export function VideoBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Проверяем, загружено ли видео при монтировании
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true)
    }
  }, [])

  return (
    <>
      {/* Статический фон-скелет с пульсацией */}
      <div 
        className="fixed inset-0 z-[-2]"
        style={{
          background: 'linear-gradient(135deg, #0a0012 0%, #1a0a2e 50%, #0a0012 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 8s ease infinite, pulse 2s ease-in-out infinite'
        }}
      />

      {/* Видео фон */}
      <div className="fixed inset-0 z-[-1]" style={{ background: 'transparent' }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            setVideoLoaded(true)
          }}
          onCanPlay={() => {
            setVideoLoaded(true)
          }}
          onError={(e) => {
            console.error('❌ Video error:', e)
            setVideoError(true)
          }}
          className="w-full h-full object-cover"
          style={{
            objectFit: 'cover',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            display: 'block'
          }}
        >
          <source src="/background.webm" type="video/webm" />
        </video>
        
        {/* Индикатор ошибки */}
        {videoError && (
          <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded text-sm z-50">
            ⚠️ Video not found: /background.webm
          </div>
        )}
      </div>

      {/* Стили для анимаций */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  )
}