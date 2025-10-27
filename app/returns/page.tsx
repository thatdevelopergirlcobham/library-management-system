"use client"

import { useState, useEffect } from "react"
import { Search, BookX, Check, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Card components replaced with div elements
import { useToast } from "@/components/ui/use-toast"

type Book = {
  id: string
  title: string
  author: string
  isbn: string
  checkedOutTo: string | null
  dueDate: string
}

type Member = {
  id: string
  name: string
  email: string
}

type CheckedOutBook = Book & {
  member: Member
  daysOverdue: number
}

export default function ReturnsPage() {
  // Router is imported but not used in this component as we're not doing any navigation
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooks, setSelectedBooks] = useState<CheckedOutBook[]>([])
  const [checkedOutBooks, setCheckedOutBooks] = useState<CheckedOutBook[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - in a real app, fetch from API
  useEffect(() => {
    // Mock checked out books with member information
    const mockCheckedOutBooks: CheckedOutBook[] = [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
        checkedOutTo: '1',
        dueDate: '2023-12-15',
        member: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com'
        },
        daysOverdue: 2
      },
      {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '9780061120084',
        checkedOutTo: '2',
        dueDate: '2023-12-20',
        member: {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com'
        },
        daysOverdue: 0
      },
      {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        checkedOutTo: '3',
        dueDate: '2023-12-10',
        member: {
          id: '3',
          name: 'Bob Johnson',
          email: 'bob@example.com'
        },
        daysOverdue: 5
      },
    ]
    
    setCheckedOutBooks(mockCheckedOutBooks)
  }, [])

  const toggleBookSelection = (book: CheckedOutBook) => {
    setSelectedBooks(prev => {
      const isSelected = prev.some(b => b.id === book.id)
      if (isSelected) {
        return prev.filter(b => b.id !== book.id)
      } else {
        return [...prev, book]
      }
    })
  }

  const handleReturn = async () => {
    if (selectedBooks.length === 0) return

    setIsLoading(true)
    
    try {
      // In a real app, make an API call to process the return
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const bookTitles = selectedBooks.map(book => book.title).join(', ')
      
      toast({
        title: "Books returned successfully",
        description: `${bookTitles} ${selectedBooks.length > 1 ? 'have' : 'has'} been returned.`,
      })
      
      // In a real app, update the checked out books list
      setCheckedOutBooks(prev => 
        prev.filter(book => !selectedBooks.some(selected => selected.id === book.id))
      )
      
      // Reset selection
      setSelectedBooks([])
      
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to process return. Please try again.",
        // variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  const filteredBooks = checkedOutBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm) ||
    book.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Return Books</h1>
          <p className="text-muted-foreground">
            Process returns for checked out books
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedBooks.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedBooks([])}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Clear Selection
            </Button>
          )}
          
          <Button 
            onClick={handleReturn}
            disabled={selectedBooks.length === 0 || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4" />
                Return {selectedBooks.length > 0 ? `(${selectedBooks.length})` : ''}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Checked Out Books</h2>
              <p className="text-sm text-muted-foreground">
                {checkedOutBooks.length} books currently checked out
                {selectedBooks.length > 0 && ` • ${selectedBooks.length} selected`}
              </p>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books or members..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          {filteredBooks.length > 0 ? (
            <div className="border rounded-md divide-y">
              {filteredBooks.map(book => {
                const isSelected = selectedBooks.some(b => b.id === book.id)
                const isOverdue = book.daysOverdue > 0
                
                return (
                  <div 
                    key={book.id}
                    className={`p-4 flex items-start gap-4 transition-colors ${
                      isSelected 
                        ? 'bg-primary/5 border-l-4 border-l-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => toggleBookSelection(book)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'border-2 border-muted-foreground/30'
                      }`}>
                        {isSelected && <Check className="h-3.5 w-3.5" />}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{book.title}</h3>
                        {isOverdue && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                            {book.daysOverdue} day{book.daysOverdue !== 1 ? 's' : ''} overdue
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      
                      <div className="mt-2 pt-2 border-t text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium">Checked out to:</span>
                          <span>{book.member.name}</span>
                          <span className="text-muted-foreground/50">•</span>
                          <span>{book.member.email}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Due: {new Date(book.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookX className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <h3 className="mt-2 text-sm font-medium text-muted-foreground">
                {searchTerm ? 'No matching books found' : 'No books are currently checked out'}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm ? 'Try a different search term' : 'All books are accounted for'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
