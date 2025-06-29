import React from 'react'

function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    style={{
                        margin: '0 5px',
                        padding: '6px 12px',
                        backgroundColor: i === currentPage ? '#000' : '#ccc',
                        color: i === currentPage ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    )
}

export default Pagination;