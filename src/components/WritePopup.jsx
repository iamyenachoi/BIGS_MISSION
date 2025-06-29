import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './WritePopup.css'

function WritePopup() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('NOTICE')
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (!token || !user.username) {
            alert('로그인이 필요합니다.')
            navigate('/login')
            return
        }

        const formData = new FormData()
        formData.append(
            'request',
            new Blob([JSON.stringify({
                title,
                content,
                category
            })], { type: 'application/json' })
        )
        if (file) formData.append('file', file)

        try {
            const response = await fetch('/boards', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            })

            if (response.ok) {
                alert('글이 등록되었습니다.')
                navigate('/posts', { state: { refresh: true } })
            } else {
                const data = await response.json()
                alert(data.message || '글 등록 실패')
            }
        } catch (error) {
            console.error('글 등록 에러:', error)
            alert('서버 오류')
        }
    }

    const handleClose = () => {
        navigate('/')
    }

    return (
        <div className="write-wrapper active-popup">
            <span className="write-icon-close" onClick={handleClose}>×</span>
            <div className="write-form-box">
                <h5>글쓰기</h5>
                <form onSubmit={handleSubmit}>
                    <div className="write-input-box">
                        <label>제목</label>
                        <input type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="write-input-box">
                        <label>내용</label>
                        <textarea value={content} required onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div className="write-input-box">
                        <label>카테고리</label>
                        <select value={category} required onChange={(e) => setCategory(e.target.value)}>
                            <option value="NOTICE">공지사항</option>
                            <option value="FREE">자유게시판</option>
                            <option value="QUESTION">질문게시판</option>
                            <option value="QUESTION">기타게시판</option>
                        </select >
                    </div >
                    <div className="write-input-box">
                        <label>첨부 파일</label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <button type="submit" className="write-btn">등록</button>
                </form >
            </div >
        </div >
    )
}

export default WritePopup;