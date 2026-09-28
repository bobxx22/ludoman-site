"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Home } from "@/components/sections/home"
import { Tokenomics } from "@/components/sections/tokenomics"
import Metrics from "@/components/sections/metrics"
import Transactions from "@/components/sections/transactions"
import Roadmap from "@/components/sections/roadmap"
import { FAQ } from "@/components/sections/faq"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home" className="scroll-mt-20">
          <Home />
        </section>
        <section id="tokenomics" className="scroll-mt-20">
          <Tokenomics />
        </section>
        <section id="metrics" className="scroll-mt-20">
          <Metrics />
        </section>
        <section id="transactions" className="scroll-mt-20">
          <Transactions />
        </section>
        <section id="roadmap" className="scroll-mt-20">
          <Roadmap />
        </section>
        <section id="faq" className="scroll-mt-20">
          <FAQ />
        </section>
      </main>
      <Footer />
    </div>
  )
}