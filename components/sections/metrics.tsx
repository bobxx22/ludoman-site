"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import { formatCurrency, formatTokenAmount } from "@/lib/utils/formatters"
import type { DexscreenerPairData } from "@/types"

const Metrics: React.FC = () => {
  const [data, setData] = useState<DexscreenerPairData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.dexscreener.com/latest/dex/pairs/ton/EQDUK1q0zadi3cWKYZrqtIIavMazqgYKIFYRDBBhlIPTxQAV",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const jsonData: DexscreenerPairData = await response.json()
        setData(jsonData)
      } catch (err) {
        setError("Error fetching data from Dexscreener")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <div className="text-center py-4">{t("metrics.loading")}</div>
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>
  if (!data) return null

  const priceChange24h = data.pair.priceChange.h24
  const isPositive = priceChange24h >= 0

  const metricsData = [
    { label: t("metrics.priceUSD"), value: formatCurrency(Number.parseFloat(data.pair.priceUsd), 8) },
    { label: t("metrics.priceTON"), value: `${formatTokenAmount(data.pair.priceNative, 8)} TON` },
    {
      label: t("metrics.change24h"),
      value: `${Math.abs(priceChange24h).toFixed(2)}%`,
      trend: isPositive ? "up" : "down",
    },
    { label: t("metrics.volume24h"), value: formatCurrency(data.pair.volume.h24, 0) },
    { label: t("metrics.liquidityUSD"), value: formatCurrency(data.pair.liquidity.usd, 0) },
    { label: t("metrics.marketCapUSD"), value: formatCurrency(data.pair.marketCap, 0) },
  ]

  return (
    <section id="metrics" className="text-card-foreground py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs text-primary-foreground font-medium uppercase bg-primary">
            {t("metrics.title")}
          </div>
          <h2 className="text-4xl text-center font-extrabold tracking-tight sm:text-5xl" itemProp="name">
            {t("metrics.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-center text-muted-foreground">
            {t("metrics.description")}
          </p>
        </div>

        {/* Main Card with liquid-glass effect */}
        <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-50"></div>

          <div className="relative grid gap-8 md:grid-cols-2">
            {/* Left: Description */}
            <div>
              <p className="mb-2 text-[11px] tracking-widest text-primary uppercase">
                {t("metrics.title")}
              </p>
              <h3 className="text-2xl font-bold leading-tight sm:text-3xl text-card-foreground">
                {t("metrics.realTimeMetrics")}
              </h3>
              <p className="mt-2 max-w-prose text-sm text-muted-foreground">
                {t("metrics.realTimeDescription")}
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metricsData.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-black/20 backdrop-blur-sm p-4 rounded-xl hover:bg-black/30 transition-all hover:scale-105"
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className={`text-lg font-bold mt-1 flex items-center ${stat.trend ? (isPositive ? "text-green-400" : "text-red-400") : "text-card-foreground"}`}>
                      {stat.trend && (isPositive ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />)}
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Grid of all metrics */}
            <div className="relative">
              <iframe
                src="https://www.geckoterminal.com/ton/pools/EQDUK1q0zadi3cWKYZrqtIIavMazqgYKIFYRDBBhlIPTxQAV?embed=1&info=0&swaps=0&light_chart=0&chart_type=price&resolution=4h&bg_color=000000"
                width="100%"
                height="500"
                className="[clip-path:inset(2px_round_12px)] shadow-[0_2px_8px_0_#00000020] border-0"
                allowFullScreen
                title="LUDOMAN/TON Chart"
              ></iframe>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default Metrics