"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Copy } from "lucide-react"

import { useLanguage } from "@/lib/contexts/LanguageContext"
import { LudomanLogo } from "@/components/LudomanLogo" // ← Новый компонент

export function Home() {
  const [copied, setCopied] = useState(false)

  const { t } = useLanguage()

  const contractAddress = "EQDbKihXMZuNfl7m7VcNrHIyYYYYgCFPhccIqNNN_ocNnn-PBCb"
  const dexScreenerLink = "https://dexscreener.com/ton/eqduk1q0zadi3cwkyzrqtiiavmazqgykifyrdbbhliptxqav"
  const buyLink = "https://app.ston.fi/swap?chartVisible=false&chartInterval=1w&ft=TON&tt=EQDbKihXMZuNfl7m7VcNrHIyYYYYgCFPhccIqNN_ocNn-PBCb"

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="home" className="relative py-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* ЛЕВАЯ ЧАСТЬ */}
          <div className="flex-1 lg:flex-[2] lg:text-left lg:mr-auto">
            <div className="mb-5 flex items-center justify-center lg:justify-start gap-2">
              <Image src="/ludoman.svg" alt="Ludoman logo" width={32} height={32} className="h-8 w-8" />
              <p className="text-sm uppercase tracking-[0.25em] text-primary">$LUDOMAN</p>
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
              <span className="block text-left lava-lamp-text">{t("home.title")}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-left">
              {t("home.description")}
            </p>
            
            {/* Контракт адрес */}
            <div className="mb-8">
              <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide text-left">
                {t("home.contractAddress")}
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={contractAddress}
                  readOnly
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 pr-12 font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-left"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={handleCopy}
                >
                  <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : 'text-muted-foreground'}`} />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-1 font-medium text-left">Copied!</p>
              )}
            </div>
            
            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={buyLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="button-primary bg-primary rounded-full text-lg px-8 w-full sm:w-auto">
                  {t("home.buyLudoman")}
                </Button>
              </Link>
              <Link href={dexScreenerLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="button-primary rounded-full text-lg px-8 w-full sm:w-auto">
                  {t("home.viewOnDexScreener")}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* ПРАВАЯ ЧАСТЬ — ТОЛЬКО БОЛЬШОЕ ЛОГО ИЗ КОМПОНЕНТА */}
          <div className="flex-1 lg:flex-[1] flex justify-center lg:justify-start">
            <LudomanLogo />
          </div>
        </div>
      </div>
    </section>
  )
}