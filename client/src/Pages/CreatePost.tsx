import { useEffect, useState } from "react"
import Navbar from "@/Components/Navbar"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"
import { usePostStore } from "@/Store/usePostStore"
import toast from "react-hot-toast"
import Loading from "./Loading"

function CreatePost() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const { create, isLoading }: any = usePostStore()

  const handleReset = () => {
    setTitle("")
    setDescription("")
    setFiles([])
    setImagePreviews([])
    localStorage.removeItem("draft_title")
    localStorage.removeItem("draft_description")
  }

  useEffect(() => {
    const savedTitle = localStorage.getItem("draft_title")
    const savedDesc = localStorage.getItem("draft_description")

    if (savedTitle) setTitle(savedTitle)
    if (savedDesc) setDescription(savedDesc)
  }, [])

  useEffect(() => {
    localStorage.setItem("draft_title", title)
  }, [title])

  useEffect(() => {
    localStorage.setItem("draft_description", description)
  }, [description])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).slice(0, 9)
    setFiles(selectedFiles)

    const previews = selectedFiles.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return toast.error("Title is required")
    if (files.length > 9) return toast.error("Maximum 9 images allowed")

    const data = {
      title,
      description,
      files,
    }

    try {
      const res = await create(data)
      if (res) {
        handleReset()
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong while creating the post")
    }
  }

  return (
    <div className="w-screen overflow-x-hidden">
      {isLoading && <Loading />} {/* ✅ Show loading page when isLoading is true */}

      <Navbar />
      <div className="mx-4 md:ml-[300px] mt-20 xl:w-[80%] bg-background/20 rounded-md p-6">
        <h1 className="text-2xl font-bold w-full text-center mb-4">Create a Post</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5 w-full">
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">Title:</label>
            <Input
              type="text"
              placeholder="Post Title"
              id="title"
              className="py-6"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-medium">Description:</label>
            <Textarea
              placeholder="Write something interesting..."
              id="description"
              className="py-4 h-40 resize-none overflow-y-auto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="files" className="block mb-1 font-medium">
              Upload Images (max 9):
            </label>
            <Input
              type="file"
              id="files"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="h-16 file:mr-4 file:px-4 file:rounded-md file:border-0 file:text-sm file:mt-3 file:font-semibold file:bg-[#8573f0] file:text-white hover:file:bg-[#6f5ce2]"
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="rounded-lg w-full h-[150px] object-cover shadow"
                />
              ))}
            </div>
          )}

          <div className="flex flex-row justify-between w-full">
            <Button
              type="reset"
              onClick={handleReset}
              className="mt-4 flex-1 bg-background/0 hover:bg-background/10 active:bg-background/20 mr-2"
              variant="outline"
              disabled={isLoading}
            >
              Reset Post
            </Button>

            <Button
              type="submit"
              className="mt-4 flex-1 ml-2"
              variant="blue"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
