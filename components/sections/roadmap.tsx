"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import Emoji from "@/components/emoji"

interface Feature {
  id: string
  title: string
  description: string
  status: "planned" | "in-progress" | "shipped"
  version?: string
  votes: number
  userVoted: boolean
}

const initialFeatures: Feature[] = [
  {
    id: "1",
    title: "roadmap.milestone1",
    description: "roadmap.milestone1Desc",
    status: "shipped",
    version: "2.3.1",
    votes: 1247,
    userVoted: false,
  },
  {
    id: "2",
    title: "roadmap.milestone2",
    description: "roadmap.milestone2Desc",
    status: "shipped",
    version: "2.2.8",
    votes: 892,
    userVoted: true,
  },
  {
    id: "3",
    title: "roadmap.milestone3",
    description: "roadmap.milestone3Desc",
    status: "shipped",
    version: "2.1.5",
    votes: 756,
    userVoted: false,
  },
  {
    id: "4",
    title: "roadmap.milestone4",
    description: "roadmap.milestone4Desc",
    status: "shipped",
    version: "2.0.0",
    votes: 1156,
    userVoted: false,
  },
  {
    id: "5",
    title: "roadmap.milestone5",
    description: "roadmap.milestone5Desc",
    status: "shipped",
    version: "1.9.5",
    votes: 1089,
    userVoted: true,
  },
  {
    id: "6",
    title: "roadmap.milestone6",
    description: "roadmap.milestone6Desc",
    status: "shipped",
    version: "1.8.0",
    votes: 823,
    userVoted: false,
  },
  {
    id: "7",
    title: "roadmap.milestone7",
    description: "roadmap.milestone7Desc",
    status: "shipped",
    version: "1.7.2",
    votes: 634,
    userVoted: false,
  },
  {
    id: "8",
    title: "roadmap.milestone8",
    description: "roadmap.milestone8Desc",
    status: "shipped",
    version: "1.6.0",
    votes: 521,
    userVoted: true,
  },
  {
    id: "9",
    title: "roadmap.milestone9",
    description: "roadmap.milestone9Desc",
    status: "planned",
    votes: 445,
    userVoted: false,
  },
  {
    id: "10",
    title: "roadmap.milestone10",
    description: "roadmap.milestone10Desc",
    status: "planned",
    votes: 398,
    userVoted: false,
  },
  {
    id: "11",
    title: "roadmap.milestone11",
    description: "roadmap.milestone11Desc",
    status: "planned",
    votes: 367,
    userVoted: false,
  },
  {
    id: "12",
    title: "roadmap.milestone12",
    description: "roadmap.milestone12Desc",
    status: "planned",
    votes: 334,
    userVoted: false,
  },
  {
    id: "13",
    title: "roadmap.milestone13",
    description: "roadmap.milestone13Desc",
    status: "planned",
    votes: 298,
    userVoted: false,
  },
  {
    id: "14",
    title: "roadmap.milestone14",
    description: "roadmap.milestone14Desc",
    status: "planned",
    votes: 267,
    userVoted: false,
  },
  {
    id: "15",
    title: "roadmap.milestone15",
    description: "roadmap.milestone15Desc",
    status: "planned",
    votes: 234,
    userVoted: false,
  },
]

const Roadmap: React.FC = () => {
  const { t } = useLanguage()

  const getStatusBadge = (status: Feature["status"]) => {
    return (
      <span className="text-lg">
        <Emoji emoji={status === "shipped" ? "✅" : "⏳"} size={20} />
      </span>
    )
  }

  const sortedFeatures = [...initialFeatures].sort((a, b) => {
    const statusOrder = { shipped: 0, "in-progress": 1, planned: 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  return (
    <section id="roadmap" className="text-card-foreground">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <div className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs text-primary-foreground font-medium bg-primary">
              {t("roadmap.title")}
            </div>
            <h2 className="text-4xl text-center font-extrabold tracking-tight sm:text-5xl" itemProp="name">
              {t("roadmap.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-center text-muted-foreground" itemProp="description">
              {t("roadmap.description")}
            </p>
          </div>
        </div>

        <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
          <div className="absolute inset-0 bg-black/20 opacity-50"></div>
          <div className="relative">
            <p className="mb-2 text-[11px] tracking-widest text-primary uppercase">
              {t("roadmap.title")}
            </p>
            <h3 className="text-2xl font-bold leading-tight text-card-foreground sm:text-3xl">
              {t("roadmap.title")}
            </h3>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground">
              {t("roadmap.description")}
            </p>

            <div className="mt-6 relative overflow-x-auto rounded-2xl">
              <table className="w-full text-sm text-left text-card-foreground">
                <thead className="text-xs uppercase text-muted-foreground bg-black/20">
                  <tr>
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-2 py-3">
                      {t("roadmap.featureColumn")}
                    </th>
                    <th scope="col" className="px-2 py-3 w-24">
                      {t("roadmap.statusColumn")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedFeatures.map((feature, index) => (
                    <tr
                      key={feature.id}
                      className={`transition-colors ${
                        index % 2 === 0
                          ? "bg-black/10 hover:bg-black/30"
                          : "bg-black/20 hover:bg-black/30"
                      }`}
                    >
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="px-2 py-4">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground leading-tight">
                            {t(feature.title)}
                          </div>
                          <div className="text-xs text-muted-foreground leading-tight mt-1 line-clamp-2">
                            {t(feature.description)}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-4">
                        {getStatusBadge(feature.status)}
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

export default Roadmap