"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
// Card components replaced with div elements

type BookFormData = {
  title: string
  author: string
  isbn: string
  publishedYear: string
  publisher: string
  category: string
  description: string
  quantity: string
}

export default function AddBookPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    isbn: "",
    publishedYear: new Date().getFullYear().toString(),
    publisher: "",
    category: "fiction",
    description: "",
    quantity: "1"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: keyof BookFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.title.trim() || !formData.author.trim() || !formData.isbn.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        // variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // In a real app, make an API call to add the book
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: `"${formData.title.replace(/'/g, '&apos;')}" has been added to the library.`,
      })
      
      // Redirect to books page after successful submission
      router.push("/books")
      
    } catch (err) {
      console.error('Error adding book:', err);
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        // variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
          <p className="text-muted-foreground">
            Enter the details of the new book to add to the library
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Book Information</h2>
            <p className="text-sm text-muted-foreground">
              Enter the basic details of the book
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author <span className="text-destructive">*</span></Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN <span className="text-destructive">*</span></Label>
                <Input
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="Enter ISBN number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="publishedYear">Published Year</Label>
                <Input
                  id="publishedYear"
                  name="publishedYear"
                  type="number"
                  min="1000"
                  max={new Date().getFullYear()}
                  value={formData.publishedYear}
                  onChange={handleChange}
                  placeholder="Enter published year"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Enter publisher name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiction">Fiction</SelectItem>
                    <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                    <SelectItem value="biography">Biography</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="mystery">Mystery</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="children">Children</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter book description"
                rows={4}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/books")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
