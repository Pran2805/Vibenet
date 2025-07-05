import { axiosInstance } from '@/Utils/axiosInstance'
import toast from 'react-hot-toast'
import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    authUser: null,
    isPending: false,
    isSignin: null,

    signup: async(data: object)=>{
       try {
        set({isPending: true})
         const res = await axiosInstance.post('/auth/signup', data)
         if(res.data.success){
            toast.success(res.data.message)
            toast('Verify Your Email')
         }else{
            toast.error('Failed to create account')
         }
         set({isPending: false})
        
       } catch (error: any) {
        toast.error(error.response.data.message)
       }finally{
        set({isPending: false})
       }
    },
    verifyEmail: async(token: string) =>{
        try {
            set({isPending: true})
            const res = await axiosInstance.post(`/auth/verifyEmail/${token}`)
            console.log(res.data.success)
            if(res.data.success){
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
        } catch (error: any) {
             toast.error(error.response.data.message)
        }finally{
            set({isPending: false})
        }
    },

    login: async(data: object) =>{
        try {
        set({isPending: true})
         const res = await axiosInstance.post('/auth/signin', data)
            console.log(res)
         set({authUser: res.data.data, isPending: false})
        } catch (error: any) {
             toast.error(error.response.data.message)
        }finally{
            set({isPending: false})
        }
    },

    checkAuth: async() =>{
        try {
            const res = await axiosInstance.post('/auth/check-auth')

            set({isSignin: res.data.success, authUser: res.data.user})
        } catch (error: any) {
            set({isSignin: false})
             console.warn(error.response.data.message)
        }
    },
    logout: async() =>{
        try {
            const res = await axiosInstance.post('/auth/logout')
            toast.success(res.data.message)
            set({authUser: null, isSignin: false})
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

}))

