import { axiosInstance } from '@/Utils/axiosInstance'
import toast from 'react-hot-toast'
import { create } from 'zustand'

interface PostStore {
  isLoading: boolean
  create: (data: any) => Promise<any>
}

export const usePostStore = create<PostStore>((set) => ({
  isLoading: false,

  create: async (data) => {
    try {
      console.log(data)
      set({ isLoading: true })
      const res = await axiosInstance.post('/post/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toast.success(res.data.message || 'Post created successfully')
      return res.data.post
    } catch (error: any) {
      console.error('Create post error:', error)
      toast.error(error?.response?.data?.message || 'Failed to create post')
      return null
    } finally {
      set({ isLoading: false })
    }
  },
  getPost: async () => {
    try {
      const res = await axiosInstance.get('/post/')
      console.log(res)
      return res.data.data
    } catch (error) {}
  },

  toggleLike: async (id: string) => {
    try {
      const res = await axiosInstance.put(`/post/like/${id}`)
      return res.data.data
    } catch (err: any) {
      toast.error(err?.message || 'Failed to like post')
    }
  },
  getPostLike: async (id: string) => {
    try {
      const res = await axiosInstance.get(`/post/like/${id}`)
      return res.data?.data
    } catch (err: any) {
      toast.error(err?.message || 'Failed to fetched liked post')
    }
  }
}))
