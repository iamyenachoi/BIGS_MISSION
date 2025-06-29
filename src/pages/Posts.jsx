import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Pagination from '../components/Pagination'
import '../components/PostsPopup.css'

function Posts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const location = useLocation()

    const fetchPosts = (pageNum = 0) => {
        const token = localStorage.getItem('token')
        if (!token) {
            alert('로그인이 필요합니다.')
            return
        }

        fetch(`/boards?page=${pageNum}&size=10`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('인증 실패 또는 권한 없음')
                }
                return res.json()
            })
            .then(data => {
                setPosts(data.content || [])
                setPage(data.number)
                setTotalPages(data.totalPages)
                setLoading(false)
            })
            .catch(err => {
                console.error('글 목록 불러오기 실패:', err)
                alert('글 목록 조회에 실패했습니다.')
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        if (location.state?.refresh) {
            fetchPosts()
        }
    }, [location.state])

    if (loading) {
        return <div className="posts-container">로딩 중...</div>
    }

    return (
        <div className="posts-container">
            <h2 className="posts-title">글 목록</h2>
            <div className="posts-list">
                {posts.map((post) => (
                    <Link key={post.id} to={`/posts/${post.id}`} className="post-card">
                        <h3>{post.title}</h3>
                        <p className="meta">작성자: {post.username}</p>
                        <p className="category">카테고리: {post.category}</p>
                    </Link>
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={fetchPosts}
            />
        </div>
    )
}

export default Posts;