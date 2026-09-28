"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TOKENOMICS_DATA, TOTAL_SUPPLY } from "@/lib/constants/tokenomics"
import { formatNumber } from "@/lib/utils/formatters"
import { truncateAddress } from "@/lib/utils/formatters"
import type { BurnedPairData } from "@/types"
import { useLanguage } from "@/lib/contexts/LanguageContext"

export function Tokenomics() {
  const totalLocked = TOKENOMICS_DATA.reduce((sum, item) => {
    return sum + Number.parseFloat(item.amount.replace(/,/g, ""))
  }, 0)

  const [data, setData] = useState<BurnedPairData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch("https://tonapi.io/v2/jettons/EQDbKihXMZuNfl7m7VcNrHIyYYYgCFPhccIqNN_ocNn-PBCb")

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const responseData: BurnedPairData = await response.json()
        setData(responseData)
      } catch (err) {
        setError("Error fetching data from Tonapi: " + err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <div className="text-center py-4">{t("metrics.loading")}</div>
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>
  if (!data) return null

  const burnedAmount = TOTAL_SUPPLY - Number(data.total_supply) / 1000000000

  return (
    <section id="tokenomics" className="text-card-foreground">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <div
              className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs text-primary-foreground font-medium bg-primary"
            >
              {t("tokenomics.title")}
            </div>
            <h2 className="text-4xl text-center font-extrabold tracking-tight sm:text-5xl" itemProp="name">
              {t("tokenomics.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-center text-muted-foreground" itemProp="description">
              {t("tokenomics.description")}
            </p>
          </div>
        </div>
      
        <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
          <div className="absolute inset-0 bg-black/20 opacity-50"></div>
          
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] tracking-widest text-primary uppercase">{t("tokenomics.title")}</p>
              <h3 className="text-2xl font-bold leading-tight text-card-foreground sm:text-3xl">
                {t("tokenomics.title")}
              </h3>
              <p className="mt-2 max-w-prose text-sm text-muted-foreground">
                {t("tokenomics.description")}
              </p>
              
              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="flex justify-between text-md">
                  <span className="text-muted-foreground">{t("tokenomics.totalSupply")}</span>
                  <span className="font-bold">{formatNumber(TOTAL_SUPPLY)} LUDOMAN</span>
                </div>
                <div className="flex justify-between text-md">
                  <span className="text-muted-foreground">{t("tokenomics.burned")}</span>
                  <span className="font-bold">{formatNumber(burnedAmount)} LUDOMAN</span>
                </div>
                <div className="flex justify-between text-md">
                  <span className="text-muted-foreground">{t("tokenomics.locked")}</span>
                  <span className="font-bold">{formatNumber(totalLocked)} LUDOMAN</span>
                </div>
              </div>

              <div className="mt-8 flex flex-row gap-3">
                <Button
                  size="lg"
                  className="button-primary bg-primary rounded-full text-sm px-6"
                  asChild
                >
                  <a
                    href="https://tonraffles.app/lock"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔒 {t("tokenomics.lockButton")}
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="button-primary bg-primary rounded-full text-sm px-6"
                  asChild
                >
                  <a href="ton://transfer/EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c?amount=1000&text=Burn">
                    🔥 {t("tokenomics.burnButton")}
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative overflow-x-auto rounded-2xl">
              <table className="w-full text-sm text-left text-card-foreground relative z-10 w-full min-w-[600px]">
                <thead>
                   <tr className="bg-black/20">
                     <th scope="col" className="px-6 py-3">
                       {t("tokenomics.wallet")}
                     </th>
                     <th scope="col" className="px-6 py-3">
                       {t("tokenomics.amount")}
                     </th>
                     <th scope="col" className="px-6 py-3">
                       {t("tokenomics.cycleDay")}
                     </th>
                     <th scope="col" className="px-6 py-3">
                       {t("tokenomics.lockTime")}
                     </th>
                   </tr>
                </thead>
                <tbody>
                  {TOKENOMICS_DATA.map((row, index) => (
                    <tr
                      key={index}
                      className={`transition-colors ${
                        index % 2 === 0 
                          ? "bg-black/10 hover:bg-black/30" 
                          : "bg-black/20 hover:bg-black/30"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <a
                          href={`https://tonviewer.com/${row.wallet}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {truncateAddress(row.wallet)}
                        </a>
                      </td>
                      <td className="px-6 py-4 font-medium">{row.amount}</td>
                      <td className="px-6 py-4">{row.cycleDay}</td>
                      <td className="px-6 py-4">{row.lockTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}