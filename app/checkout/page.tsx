"use client"

import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
import { Search, BookCheck, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Card components replaced with div elements
import { useToast } from "@/components/ui/use-toast"

type Book = {
  id: string
  title: string
  author: string
  isbn: string
  available: boolean
}

type Member = {
  id: string
  name: string
  email: string
  membership: string
}

export default function CheckoutPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - in a real app, fetch from API
  useEffect(() => {
    // Mock books
    setBooks([
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
        available: true
      },
      {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '9780061120084',
        available: true
      },
      {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        available: false
      },
    ])

    // Mock members
    setMembers([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        membership: 'Premium'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        membership: 'Standard'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        membership: 'Student'
      },
    ])
  }, [])

  const handleCheckout = async () => {
    if (!selectedBook || !selectedMember) return

    setIsLoading(true)
    
    try {
      // In a real app, make an API call to process the checkout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Book checked out successfully",
        description: `${selectedBook.title} has been checked out to ${selectedMember.name}`,
      })
      
      // Reset form
      setSelectedBook(null)
      setSelectedMember(null)
      setSearchTerm("")
      
      // In a real app, you might want to refresh the books list
      // to show the updated availability status
    } catch {
      toast({
        title: "Error",
        description: "Failed to check out book. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Check Out Book</h1>
          <p className="text-muted-foreground">
            Scan or search for a book and select a member to check out
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Book Selection */}
        <div className="border rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <BookCheck className="h-5 w-5" />
              Select Book
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Available Books</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                {books
                  .filter(book => 
                    book.available && 
                    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     book.isbn.includes(searchTerm))
                  )
                  .map(book => (
                    <div 
                      key={book.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedBook?.id === book.id 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedBook(book)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        {selectedBook?.id === book.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Member Selection */}
        <div className="border rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <User className="h-5 w-5" />
              Select Member
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Members</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                {members
                  .filter(member => 
                    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    member.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(member => (
                    <div 
                      key={member.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedMember?.id === member.id 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedMember(member)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{member.email}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              {member.membership}
                            </span>
                          </div>
                        </div>
                        {selectedMember?.id === member.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary and Checkout Button */}
      <div className="border rounded-lg overflow-hidden mt-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Checkout Summary</h2>
        </div>
        <div className="p-6 space-y-6">
          {selectedBook && selectedMember ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Book</p>
                  <p className="font-medium">{selectedBook.title}</p>
                  <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member</p>
                  <p className="font-medium">{selectedMember.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t">
                <Button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <BookCheck className="h-4 w-4" />
                      Confirm Checkout
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Select a book and member to proceed with checkout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
