import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function PostDetail() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const fetchPost = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`/boards/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await response.json()
            if (response.ok) {
                setPost(data)
                setTitle(data.title)
                setContent(data.content)
            } else {
                alert(data.message || '글을 불러올 수 없습니다.')
            }
        } catch (error) {
            console.error('글 불러오기 오류:', error)
            alert('서버 오류')
        }
    }

    const handleUpdate = async () => {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (!token || !user.username) {
            alert('로그인이 필요합니다.')
            return
        }

        const formData = new FormData()
        formData.append(
            'request',
            new Blob([JSON.stringify({
                title,
                content,
                category: post.boardCategory,
                username: user.username
            })], { type: 'application/json' })
        )

        try {
            const response = await fetch(`/boards/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (response.ok) {
                alert('수정 완료')
                setEditMode(false)
                fetchPost()
            } else {
                const data = await response.json()
                alert(data.message || '수정 실패')
            }
        } catch (error) {
            console.error('수정 오류:', error)
            alert('수정 중 오류가 발생했습니다.')
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`/boards/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                alert('삭제 완료')
                navigate('/posts', { state: { refresh: true } })
            } else {
                const data = await response.json()
                alert(data.message || '삭제 실패')
            }
        } catch (error) {
            console.error('삭제 오류:', error)
            alert('삭제 중 오류가 발생했습니다.')
        }
    }

    useEffect(() => {
        fetchPost()
    }, [id])

    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const isOwner = user?.username && post?.username && user.username === post.username

    if (!post) return <div style={{ padding: '100px', color: 'white' }}>로딩 중...</div>

    return (
        <div style={{ padding: '100px 20px', color: 'white' }}>
            {editMode ? (
                <>
                    <h2>글 수정</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        style={{ width: '100%', padding: '10px' }}
                    />
                    <div style={{ marginTop: '10px' }}>
                        <button onClick={handleUpdate}>수정 완료</button>
                        <button onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>취소</button>
                    </div>
                </>
            ) : (
                <>
                    <h1>{post.title}</h1>
                    <p>작성자: {post.username}</p>
                    <p>카테고리: {post.boardCategory}</p>
                    <p>{post.content}</p>
                    {post.imageUrl && (
                        <img
                            src={`https://front-mission.bigs.or.kr${post.imageUrl}`}
                            alt="첨부 이미지"
                            style={{ maxWidth: '100%', marginTop: '10px' }}
                        />
                    )}
                    <p style={{ fontSize: '0.9rem', color: '#aaa' }}>
                        작성일: {new Date(post.createdAt).toLocaleString()}
                    </p>
                    {isOwner && (
                        <div style={{ marginTop: '20px' }}>
                            <button onClick={() => setEditMode(true)}>수정</button>
                            <button onClick={handleDelete} style={{ marginLeft: '10px' }}>삭제</button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default PostDetail;