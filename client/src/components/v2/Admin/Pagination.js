import React from 'react'

const Pagination = ({pageNumber, setPageNumber, totalDocsCount}) => {
    return (
        <nav aria-label="...">
            <ul className="pagination d-flex justify-content-center">
                <li className={`page-item ${pageNumber === 1 ? 'disabled' : 'pointer text-warning'}`} onClick={() => { pageNumber !== 1 && setPageNumber((prev) => prev - 1) }} disabled={pageNumber === 1}>
                    <span className="page-link" >Previous</span>
                </li>
                {Array.from(Array(Math.ceil(totalDocsCount / 10))).map((x, i) => {
                    return (
                        <li className={`page-item ${i + 1 === pageNumber && 'active'}`} aria-current="page" onClick={() => setPageNumber(i + 1)}>
                            <span className="page-link">
                                {/* {pageNumber} */}
                                {i + 1}
                            </span>
                        </li>
                    )
                })}
                <li className={`page-item ${totalDocsCount / (pageNumber * 10) <= 1 ? 'disabled' : 'pointer text-warning'}`} onClick={() => { totalDocsCount / (pageNumber * 10) > 1 && setPageNumber((prev) => prev + 1) }}>
                    <span className="page-link">Next</span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination