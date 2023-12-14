import React from 'react'
import { signOut } from '../Utility'
import { useDispatch } from 'react-redux'

const Header = ({ heading, icon, setSearchedQuery }) => {

    const dispatch = useDispatch()

    const showSearchInput = () => {
        setSearchedQuery('')

        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.searchBtn');
        const searchIcon = document.querySelector('.fa-search');

        searchInput.classList.toggle('searchInputActive')
        searchIcon.classList.toggle('fa-times');
        searchIcon.classList.toggle('ms-2');
        searchBtn.classList.toggle('rounded-circle');

        //hiding header content on mobile view
        // document.querySelector('.darkMode-btn').classList.toggle('d-none500');
        document.querySelector('.headerName').classList.toggle('d-none500');
        document.querySelector('.dash-header').classList.toggle('d-flexon500');
        searchInput.classList.toggle('w-100on500');
        searchBtn.classList.toggle('w-100on500');
    }

    return (
        <div className="dash-header p-3 overflow-auto d-flex bg-white-custom border-bottom shadow-sm">
            <div className="d-flex flex-grow-1 align-items-center headerName">
                <h6 className="align-self-center mb-0 me-3 fw-semibold text-nowrap">
                    {heading}
                </h6>
                <i className={`fa-solid ${icon}`}></i>
            </div>
            <div className="d-flex h-stack gap-1 position-relative">

                {/* Dark Mode */}
                {/* <div className='btn darkMode-btn'>
                    <input className="checkbox" type="checkbox" id="toggle" onChange={() => {
                        document.querySelector('.adminView').classList.toggle('dark');
                        document.querySelectorAll('.bg-white-custom').forEach(x => { x.classList.toggle('dark') })
                    }} />
                    <label className="toggle" htmlFor="toggle">
                        <ion-icon className="icon icon--light" name="sunny-outline"></ion-icon>
                        <ion-icon className="icon icon--dark" name="moon-outline"></ion-icon>
                        <span className="ball"></span>
                    </label>
                </div> */}

                {/* <a href="/projects-list.html" className="btn btn-link btn-sm rounded-circle text-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="List View">
                        <i className="fas fa-columns"></i>
                    </a>

                    <a href="/projects-grid.html" className="btn btn-link btn-sm rounded-circle text-secondary" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Grid View">
                        <i className="fas fa-th"></i>
                    </a>

                    <a href="/" className="btn btn-link btn-sm rounded-circle me-3 text-secondary active" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Table View">
                        <i className="fas fa-bars"></i>
                    </a> */}

                <button className="btn btn-light btn-sm rounded-circle text-secondary searchBtn d-flex align-items-center " >
                    <input type='text' id='searchInput' className='searchInput rounded-1' onChange={(e) => setSearchedQuery(e.target.value)} />
                    <i onClick={() => showSearchInput()} className="fas fa-search" title=""></i>
                </button>

                <button className="btn btn-light btn-sm rounded-circle text-secondary" title="Sign out" data-bs-original-title="logout" onClick={() => signOut(dispatch)}>
                    <i className="fa fa-sign-out-alt"></i>
                </button>

            </div>
        </div>
    )
}

export default Header