import React, { useEffect } from 'react';
let num = 0;


const Pagination = ({ postsPerPage, totalPosts, paginate, Number }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    let totalPagination = pageNumbers.length

    console.log("totalPagination",totalPagination)

    let pages=[]

    if(totalPagination>10){
        for (let i = 1; i <= 10; i++) {
            pages.push(i);
        }
    }
    else{
        pages=pageNumbers
    }

    const pageNumber = (number) => () => {
        num = number;
    }

    const previous = () => {
        num = Number
        if (num > 0) {
            if (num > 1) {
                paginate(num - 1)
                num = num - 1
            } else {
                paginate(1)
            }
        }
        else {
            paginate(1)
        }
    }

    const next = () => {
        num = Number
        if (num < totalPagination) {
            if (num < totalPagination - 1) {
                paginate(num + 1)
                num = num + 1
            } else {
                paginate(totalPagination)
            }
        }
        else {
            paginate(totalPagination)
        }
    }

    const start = () => {
        paginate(1)
    }

    const end = () => {
        paginate(totalPagination)
    }

    return (
        <nav>
            <ul className='pagination'>
                {totalPagination > 1 && (
                    <>
                        <li className='page-item'>
                            <a className='page-link' onClick={start}>
                                <span aria-hidden="true"><i class="fa fa-angle-double-left"></i></span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li className='page-item'>
                            <a className='page-link' onClick={previous}>
                                <span aria-hidden="true"><i class="fa fa-angle-left"></i></span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                    </>
                )}

                {pages.map(number => {
                    return (
                        <li key={number} className='page-item' onClick={pageNumber(number)}>
                            <a onClick={() => paginate(number)} className='page-link'>
                                {number}
                            </a>
                        </li>

                    )
                })}
                {totalPagination > 1 && (
                    <>
                        <li className='page-item'>
                            <a className='page-link' onClick={next}>
                                <span aria-hidden="true"><i class="fa fa-angle-right"></i></span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li className='page-item'>
                            <a className='page-link' onClick={end}>
                                <span aria-hidden="true"><i class="fa fa-angle-double-right"></i></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;