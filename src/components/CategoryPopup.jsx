import React, { useEffect, useState } from 'react'
import './CategoryPopup.css'
import { AiOutlineClose } from 'react-icons/ai'

function CategoryPopup({ show, onClose }) {
    const [categories, setCategories] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!show) return
        const token = localStorage.getItem('token')
        if (!token) {
            alert('로그인이 필요합니다.')
            return
        }

        fetch('/boards/categories', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setCategories(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('카테고리 조회 실패:', err)
                alert('카테고리 불러오기 실패')
                setLoading(false)
            })
    }, [show])

    if (!show) return null

    return (
        <div className="category-popup-wrapper active-popup">
            <span className="category-icon-close" onClick={onClose}>
                <AiOutlineClose />
            </span>
            <div className="category-form-box">
                <h5>게시판 카테고리</h5>
                {loading ? (
                    <p className="category-loading">불러오는 중...</p>
                ) : (
                    <ul className="category-list">
                        {Object.entries(categories).map(([code, label]) => (
                            <li key={code}>
                                <strong>{code}</strong>: {label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default CategoryPopup;