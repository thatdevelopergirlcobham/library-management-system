import Link from "next/link"
import { BookOpen, Users, BookCheck } from "lucide-react"
import { Button } from "../components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-4xl mx-auto text-center">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Library Management System</h1>
          <p className="text-xl text-muted-foreground">
            A modern solution for managing your librarys resources and members
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-8">
          {[
            {
              icon: BookOpen,
              title: "Book Management",
              description: "Easily manage your library's book collection, track availability, and handle checkouts."
            },
            {
              icon: Users,
              title: "Member Management",
              description: "Keep track of library members, their memberships, and borrowing history."
            },
            {
              icon: BookCheck,
              title: "Checkout System",
              description: "Streamline the process of checking books in and out with our intuitive interface."
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 border rounded-lg bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <Button size="lg" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
