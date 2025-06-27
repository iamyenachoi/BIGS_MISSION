import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Header({ onLoginClick }) {
  const [user, setUser] = useState(null)
  const [showSubMenu, setShowSubMenu] = useState(false)
  const navigate = useNavigate()
  const submenuRef = useRef(null)

  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      const userInfo = localStorage.getItem('user')
      if (token && userInfo && userInfo !== 'undefined') {
        const parsedUser = JSON.parse(userInfo)
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser)
        }
      }
    } catch (err) { }
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target) &&
        event.target.className !== 'main-menu-link'
      ) {
        setShowSubMenu(false)
      }
    }
    if (showSubMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSubMenu])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }

  const handleWriteClick = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      alert('로그인이 필요합니다.')
      onLoginClick()
    } else {
      navigate('/write')
    }
  }

  const handleProtectedNav = (path) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('로그인이 필요합니다.')
      onLoginClick()
    } else {
      navigate(path)
    }
  }

  return (
    <header>
      <div className="header-top">
        <h2 className="logo" onClick={() => navigate('/')}>Logo</h2>
        <div className="top-right">
          {user ? (
            <>
              <div className="user-id">{(user.name || '').trim() || '사용자'} 님, 반갑습니다.</div>
              <button className="btnLogin-popup" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="btnLogin-popup" onClick={onLoginClick}>Login</button>
          )}
        </div>
      </div>

      <div className="menu-row">
        <div className={`button-wrapper ${showSubMenu ? 'move-left' : ''}`}>
          <div className="main-buttons">
            <a href="#" onClick={handleWriteClick}>글쓰기</a>
            <a href="#" onClick={(e) => {
              e.preventDefault()
              setShowSubMenu(!showSubMenu)
            }}>글 조회</a>
          </div>
          <div
            ref={submenuRef}
            className={`submenu-buttons-horizontal${showSubMenu ? ' show' : ''}`}
          >
            <a href="#" onClick={(e) => {
              e.preventDefault()
              handleProtectedNav('/posts')
            }}>글 목록 조회</a>
            <a href="#" onClick={(e) => {
              e.preventDefault()
              navigate('/categories')
            }}>게시판 카테고리</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;