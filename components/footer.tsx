import Link from "next/link"
import Image from "next/image"
import { Twitter, MessageCircle, Users } from "lucide-react"
import { useLanguage } from "@/lib/contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/favicon.ico"
                alt="LUDOMAN logo"
                width={20}
                height={20}
                className="h-8 w-8"
                onError={(e) => (e.currentTarget.src = "/fallback-logo.png")} // Fallback image
              />
              <span className="text-xl font-bold text-foreground">$LUDOMAN</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t("footer.brandDescription")}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.navigation")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link href="#tokenomics" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.tokenomics")}
                </Link>
              </li>
              <li>
                <Link href="#metrics" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.metrics")}
                </Link>
              </li>
            </ul>
          </div>

          {/* More Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.more")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#transactions" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.transactions")}
                </Link>
              </li>
              <li>
                <Link href="#roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.roadmap")}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.connect")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Twitter className="h-4 w-4 text-primary" />
                <Link href="https://x.com/1000LUDOMAN" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.twitter")}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <Link href="https://t.me/ludoman_1000" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.telegramChannel")}
                </Link>
              </li>
              <li className="flex items-start space-x-2">
                <Users className="h-4 w-4 text-primary mt-0.5" />
                <Link href="https://t.me/+Oavl_xReGX05YjJi" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.telegramChat")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            {t("footer.copyright")} | <Link href="https://app.ston.fi/swap?chartVisible=false&chartInterval=1w&ft=TON&tt=EQDbKihXMZuNfl7m7VcNrHIyYYYYgCFPhccIqNN_ocNn-PBCb" className="hover:text-primary">{t("footer.swapOn")}</Link> | <Link href="https://dexscreener.com/ton/eqduk1q0zadi3cwkyzrqtiiavmazqgykifyrdbbhliptxqav" className="hover:text-primary">{t("footer.dexScreener")}</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}