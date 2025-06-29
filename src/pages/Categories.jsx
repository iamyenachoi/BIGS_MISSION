import React, { useEffect, useState } from 'react'

function Categories() {
    const [categories, setCategories] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
                console.error('카테고리 불러오기 실패:', err)
                alert('카테고리 조회 실패')
                setLoading(false)
            })
    }, [])

    if (loading) return <div style={{ padding: '100px', color: 'white' }}>로딩 중...</div>

    return (
        <div style={{ padding: '100px 20px', color: 'white' }}>
            <h2>게시판 카테고리</h2>
            <ul style={{ marginTop: '20px', lineHeight: '2' }}>
                {Object.entries(categories).map(([code, label]) => (
                    <li key={code}>
                        <strong>{code}</strong>: {label}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;