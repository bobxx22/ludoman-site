import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, the product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button size="lg">Return to Home</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
