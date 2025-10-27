"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
// import { Badge } from "../../components/ui/badge"

type Book = {
  id: string
  title: string
  author: string
  isbn: string
  description: string
  category: string
  status: 'Available' | 'Checked Out' | 'On Hold' | 'Lost'
  dueDate: string
  publishedYear: number
  publisher: string
}

const statusVariantMap = {
  'available': "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  'checked-out': "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  'on-hold': "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  'lost': "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
}

const initialFormData: Omit<Book, 'id'> = {
  title: "",
  author: "",
  isbn: "",
  description: "",
  category: "Fiction",
  status: "Available",
  dueDate: "",
  publishedYear: new Date().getFullYear(),
  publisher: ""
}

export default function BooksPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  // FIX 1: Correctly destructure useState for isDeleteDialogOpen
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      description: "A story of decadence and excess in the Jazz Age.",
      category: "Classic",
      status: "Available",
      dueDate: "",
      publishedYear: 1925,
      publisher: "Scribner"
    },
    {
      id: '2',
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780061120084",
      description: "A powerful story of racial injustice in the American South.",
      category: "Fiction",
      status: "Checked Out",
      dueDate: "2023-06-15",
      publishedYear: 1960,
      publisher: "J. B. Lippincott & Co."
    },
    {
      id: '3',
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      description: "A dystopian novel about totalitarianism and surveillance.",
      category: "Science Fiction",
      status: "Available",
      dueDate: "",
      publishedYear: 1949,
      publisher: "Secker & Warburg"
    },
    {
      id: '4',
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "9780141439518",
      description: "A romantic novel about the emotional development of Elizabeth Bennet.",
      category: "Romance",
      status: "On Hold",
      dueDate: "",
      publishedYear: 1813,
      publisher: "T. Egerton, Whitehall"
    },
    {
      id: '5',
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "9780547928227",
      description: "A fantasy novel about the adventures of Bilbo Baggins.",
      category: "Fantasy",
      status: "Lost",
      dueDate: "",
      publishedYear: 1937,
      publisher: "George Allen & Unwin"
    },
  ])

  const [formData, setFormData] = useState<Omit<Book, 'id'>>(initialFormData)

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  // FIX 6: Uncomment filteredBooks and use it for search functionality
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // FIX 7: Update edit click handler to set editingBook state
  const handleEditClick = (book: Book) => {
    setEditingBook(book)
    setFormData(book)
    setIsAddDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publishedYear' ? parseInt(value) || 0 : value
    }))
  }

  const handleSelectChange = (name: keyof Omit<Book, 'id'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // FIX 7: Rename function to handle both Add and Edit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingBook) {
      // Edit logic
      setBooks(books.map(book =>
        book.id === editingBook.id ? { ...formData, id: editingBook.id } : book
      ))
    } else {
      // Add logic
      const newBook: Book = {
        ...formData,
        id: (books.length + 1).toString(), // Note: In a real app, use UUIDs or DB IDs
      }
      setBooks([newBook, ...books])
    }
    resetFormAndCloseDialog()
  }

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book)
    setIsDeleteDialogOpen(true) // This will now work
  }

  // FIX 2 & 3: This function is now used by the Delete Dialog
  const confirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter(book => book.id !== bookToDelete.id))
      setIsDeleteDialogOpen(false) // This will now work
      setBookToDelete(null)
    }
  }

  // FIX 4: Removed the unused getStatusColor function

  const resetFormAndCloseDialog = () => {
    setFormData(initialFormData)
    setEditingBook(null)
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Books</h1>
        <p className="text-muted-foreground">
          {`Manage your library's book collection`}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search books..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- ADD/EDIT DIALOG --- */}
        <Dialog open={isAddDialogOpen} onOpenChange={(isOpen: boolean) => {
          if (!isOpen) {
            resetFormAndCloseDialog()
          } else {
            setIsAddDialogOpen(true)
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleFormSubmit}>
              <DialogHeader>
                {/* FIX 7: Dynamic Dialog Title */}
                <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
                <DialogDescription>
                  {editingBook ? "Update the book details." : "Add a new book to the library collection."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Book Title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Author Name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      placeholder="ISBN Number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleInputChange}
                      placeholder="Publisher Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      // FIX 5: Add string type to value parameter
                      onValueChange={(value: string) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Biography', 'History', 'Self-Help', 'Children', 'Other'].map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publishedYear">Published Year</Label>
                    <Input
                      id="publishedYear"
                      name="publishedYear"
                      type="number"
                      value={formData.publishedYear}
                      onChange={handleInputChange}
                      min="1000"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>

                {/* Status selector - only available when editing */}
                {editingBook && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: 'Available' | 'Checked Out' | 'On Hold' | 'Lost') => handleSelectChange('status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Checked Out">Checked Out</SelectItem>
                          <SelectItem value="On Hold">On Hold</SelectItem>
                          <SelectItem value="Lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Book description..."
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetFormAndCloseDialog}>
                  Cancel
                </Button>
                {/* FIX 7: Dynamic button text */}
                <Button type="submit">{editingBook ? "Save Changes" : "Add Book"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <div className="relative overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* FIX 6: Map over filteredBooks */}
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusVariantMap[book.status.toLowerCase().replace(' ', '-') as keyof typeof statusVariantMap]
                    }`}>
                      {book.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(book)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteClick(book)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t">
          {/* FIX 8: Updated pagination text to be dynamic */}
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredBooks.length}</span> of <span className="font-medium">{books.length}</span> results
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* --- DELETE CONFIRMATION DIALOG --- */}
      {/* FIX 2: Added the delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the book
              <span className="font-medium"> {bookToDelete?.title}</span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setBookToDelete(null);
              setIsDeleteDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                confirmDelete();
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
