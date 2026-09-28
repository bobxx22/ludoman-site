"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/contexts/LanguageContext"

const faqData = [
  {
    question: "faq.question1",
    answer: "faq.answer1",
  },
  {
    question: "faq.question2",
    answer: "faq.answer2",
  },
  {
    question: "faq.question3",
    answer: "faq.answer3",
  },
  {
    question: "faq.question4",
    answer: "faq.answer4",
  },
  {
    question: "faq.question5",
    answer: "faq.answer5",
  },
  {
    question: "faq.question6",
    answer: "faq.answer6",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full glass-border overflow-hidden rounded-[10px] transition-all duration-500 ease-out cursor-pointer hover:glass-border-enhanced group`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground transition-all duration-500 ease-out group-hover:text-primary ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const { t } = useLanguage()
  
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  
  return (
    <section id="faq" className="text-card-foreground">
      <div className="container mx-auto px-4 py-16 sm:py-20 flex flex-col justify-center items-center min-h-screen">
        <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <div
              className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs text-primary-foreground font-medium bg-primary"
            >
              FAQ
            </div>
            <h2 className="text-4xl text-center font-extrabold tracking-tight sm:text-5xl" itemProp="name">
              {t("faq.title")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-center text-muted-foreground" itemProp="description">
              {t("faq.description")}
            </p>
          </div>
        </div>
        <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={t(faq.question)} 
              answer={t(faq.answer)} 
              isOpen={openItems.has(index)} 
              onToggle={() => toggleItem(index)} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}