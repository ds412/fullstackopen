import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import { createBlog, updateBlog, removeBlog, addComment } from './requests'

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
            notificationDispatch(`Removed ${blogObject.title} by ${blogObject.author}`)
        },
    })

    const commentBlogMutation = useMutation({
        mutationFn: ({ blog, content }) => addComment(blog, content),
        onSuccess: (updatedBlog) => {
            queryClient.invalidateQueries('blogs')
            notificationDispatch(`Commented on ${updatedBlog.title}`)
        },
        onError: () => {
            notificationDispatch('Failed to add comment')
        },
    })

    const handleAddBlog = async (blogObject) => {
        addBlogMutation.mutate(blogObject)
    }

    const handleUpdateBlog = async (blog) => {
        updateBlogMutation.mutate({ ...blog })
    }

    const handleDeleteBlog = async (blogObject) => {
        const confirmed = window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)
        if (confirmed) {
            deleteBlogMutation.mutate(blogObject)
        }
    }

    const handleCommentBlog = async (blog, comment) => {
        commentBlogMutation.mutate({ blog, content: comment })
    }

    return {
        handleAddBlog,
        handleUpdateBlog,
        handleDeleteBlog,
        handleCommentBlog,
    }
}

export default useBlogMutations
