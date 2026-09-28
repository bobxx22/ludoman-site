"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import { formatCurrency, formatTokenAmount, truncateAddress } from "@/lib/utils/formatters"
import type { Transaction } from "@/types"

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.geckoterminal.com/api/v2/networks/ton/pools/EQDUK1q0zadi3cWKYZrqtIIavMazqgYKIFYRDBBhlIPTxQAV/trades?trade_volume_in_usd_greater_than=0",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch transaction data")
        }
        const data = await response.json()
        setTransactions(data.data.slice(0, 6))
      } catch (err) {
        setError("Error fetching transaction data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (isLoading) return <div className="text-center py-4">{t("transactions.loading")}</div>
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>
  if (!transactions.length) return null

  const buyingPlatforms = [
    {
      name: "Blum",
      url: "https://t.me/blum/app?startapp=memepadjetton_LUDOMAN_hFG7q-ref_Y9kokQfbIr",
      logo: "/blum.jpg",
    },
    {
      name: "OKX",
      url: "https://www.okx.com/web3/detail/607/EQDbKihXMZuNfl7m7VcNrHIyYYYgCFPhccIqNN_ocNn-PBCb?shortCode=0qcXCxY&shareSource=app&deeplink=okx%253A%252F%252Fwallet%252Fdex%252Fcoin%252Fdetail%253FchainId%253D607%2526tokenContractAddress%253DEQDbKihXMZuNfl7m7VcNrHIyYYYgCFPhccIqNN_ocNn-PBCb",
      logo: "/okx.jpg",
    },
    {
      name: "Ston",
      url: "https://app.ston.fi/swap?chartVisible=false&chartInterval=1w&ft=TON&tt=EQDbKihXMZuNfl7m7VcNrHIyYYYgCFPhccIqNN_ocNn-PBCb",
      logo: "/ston.jpg",
    },
    {
      name: "Pump",
      url: "https://t.me/pocketfi_bot/bigpump?startapp=vlady_uk_8859-eyJjb2luSWQiOiI4NDEzNiJ9",
      logo: "/pump.jpg",
    },
  ]

  return (
    <section id="transactions" className="text-card-foreground py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs text-primary-foreground font-medium bg-primary">
            {t("transactions.title")}
          </div>
          <h2 className="text-4xl text-center font-extrabold tracking-tight sm:text-5xl" itemProp="name">
            {t("transactions.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-center text-muted-foreground">
            {t("transactions.description")}
          </p>
        </div>

        {/* Main Card with liquid-glass effect */}
        <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-50"></div>

          <div className="relative grid gap-8 md:grid-cols-2">
            {/* Left: Description and Buying Platforms */}
            <div>
              <p className="mb-2 text-[11px] tracking-widest text-primary uppercase">
                {t("transactions.title")}
              </p>
              <h3 className="text-2xl font-bold leading-tight sm:text-3xl text-card-foreground">
                {t("transactions.recentTransactions")}
              </h3>
              <p className="mt-2 max-w-prose text-sm text-muted-foreground">
                {t("transactions.description")}
              </p>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                  {t("transactions.buyLabel")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {buyingPlatforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      className="flex items-center bg-black/20 backdrop-blur-sm p-4 rounded-xl hover:bg-black/30 transition-all hover:scale-105"
                    >
                      <img
                        src={platform.logo || "/placeholder.svg"}
                        alt={platform.name}
                        className="w-6 h-6 mr-4 rounded-lg"
                      />
                      <p className="text-card-foreground">{platform.name}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right: Transaction Table */}
            <div className="relative overflow-x-auto rounded-2xl">
              <table className="w-full text-sm text-left text-card-foreground relative z-10 w-full min-w-[600px]">
                <thead>
                  <tr className="bg-black/20">
                    <th scope="col" className="px-6 py-3">
                      {t("transactions.type")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("transactions.usd")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("transactions.ludoman")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("transactions.time")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("transactions.txHash")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr
                      key={tx.id}
                      className={`transition-colors ${
                        index % 2 === 0 
                          ? "bg-black/10 hover:bg-black/30" 
                          : "bg-black/20 hover:bg-black/30"
                      }`}
                    >
                      <td className={`px-6 py-4 ${tx.attributes.kind === "buy" ? "text-green-400" : "text-red-400"}`}>
                        {tx.attributes.kind === "buy" ? t("transactions.buy") : t("transactions.sell")}
                      </td>
                      <td className="px-6 py-4 font-medium">{formatCurrency(Number.parseFloat(tx.attributes.volume_in_usd))}</td>
                      <td className="px-6 py-4">
                        {tx.attributes.kind === "buy"
                          ? formatTokenAmount(tx.attributes.to_token_amount)
                          : formatTokenAmount(tx.attributes.from_token_amount)}
                      </td>
                      <td className="px-6 py-4">{new Date(tx.attributes.block_timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <a
                          href={`https://tonviewer.com/transaction/${tx.attributes.tx_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {truncateAddress(tx.attributes.tx_hash, 5, 5)}
                        </a>
                      </td>
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

export default Transactions