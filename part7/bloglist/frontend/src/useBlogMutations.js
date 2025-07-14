import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import { createBlog, updateBlog, removeBlog } from './requests'

export const useBlogMutations = (blogFormRef) => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()

    const addBlogMutation = useMutation({
        mutationFn: createBlog,
        onSuccess: (returnedBlog) => {
            queryClient.invalidateQueries('blogs')
            notificationDispatch(`Added ${returnedBlog.title} by ${returnedBlog.author}`)
            if (blogFormRef?.current) {
                blogFormRef.current.toggleVisibility()
            }
        },
        onError: () => {
            notificationDispatch('Error: failed to add blog')
        },
    })

    const updateBlogMutation = useMutation({
        mutationFn: updateBlog,
        onSuccess: (updatedBlog) => {
            queryClient.invalidateQueries('blogs')
            notificationDispatch(`Liked ${updatedBlog.title} by ${updatedBlog.author}`)
        },
    })

    const deleteBlogMutation = useMutation({
        mutationFn: removeBlog,
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        },
        onError: () => {
            notificationDispatch('Error: you do not have permission to remove this blog')
        },
    })

    const handleAddBlog = async (blogObject) => {
        addBlogMutation.mutate(blogObject)
    }

    const handleUpdateBlog = async (blog) => {
        updateBlogMutation.mutate({ ...blog })
        notificationDispatch(`Liked ${blog.title} by ${blog.author}`)
    }

    const handleDeleteBlog = async (blogObject) => {
        const confirmed = window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)
        if (confirmed) {
            deleteBlogMutation.mutate(blogObject)
            notificationDispatch(`Removed ${blogObject.title} by ${blogObject.author}`)
        }
    }

    return {
        handleAddBlog,
        handleUpdateBlog,
        handleDeleteBlog,
    }
}

export default useBlogMutations
