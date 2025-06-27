import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './WritePopup.css'

function PostDetailPopup() {
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
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await response.json()
            if (response.ok) {
                setPost(data)
                setTitle(data.title)
                setContent(data.content)
            } else {
                alert(data.message || '글을 불러올 수 없습니다.')
            }
        } catch {
            alert('서버 오류')
        }
    }

    const handleUpdate = async () => {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        const formData = new FormData()
        formData.append('request', new Blob([JSON.stringify({
            title,
            content,
            category: post.boardCategory,
            username: user.username
        })], { type: 'application/json' }))

        const response = await fetch(`/boards/${id}`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        })

        if (response.ok) {
            alert('수정 완료')
            setEditMode(false)
            fetchPost()
        } else {
            alert('수정 실패')
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return
        const token = localStorage.getItem('token')
        const response = await fetch(`/boards/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
        if (response.ok) {
            alert('삭제 완료')
            navigate('/posts', { state: { refresh: true } })
        } else {
            alert('삭제 실패')
        }
    }

    useEffect(() => {
        fetchPost()
    }, [id])

    if (!post) return null

    return (
        <div className="write-wrapper active-popup">
            <span className="write-icon-close" onClick={() => navigate('/posts')}>×</span>
            <div className="write-form-box">
                {editMode ? (
                    <>
                        <h5>글 수정</h5>
                        <div className="write-input-box">
                            <label>제목</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="write-input-box">
                            <label>내용</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" />
                        </div>
                        <div className="write-btn-bottom-right">
                            <button className="write-btn-small" onClick={handleUpdate}>수정 완료</button>
                            <button className="write-btn-small" onClick={() => setEditMode(false)}>취소</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h5>{post.title}</h5>
                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>글 내용:</p>
                        <div style={{ whiteSpace: 'pre-wrap', marginBottom: '10px' }}>{post.content}</div>
                        {post.imageUrl && (
                            <img
                                src={`https://front-mission.bigs.or.kr${post.imageUrl}`}
                                alt="첨부 이미지"
                                style={{ maxWidth: '100%', marginBottom: '10px' }}
                            />
                        )}
                        <p style={{ margin: '32px 0 10px' }}><strong>카테고리:</strong> {post.boardCategory}</p>
                        <p style={{ fontSize: '0.9rem', color: '#aaa' }}>
                            작성일: {new Date(post.createdAt).toLocaleString()}
                        </p>
                        <div className="write-btn-bottom-right">
                            <button className="write-btn-small" onClick={() => setEditMode(true)}>수정</button>
                            <button className="write-btn-small" onClick={handleDelete}>삭제</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default PostDetailPopup;