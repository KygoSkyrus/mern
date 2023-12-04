import React from 'react'

const Header = ({ heading, icon, setSearchedQuery }) => {


    const handleSearch=(e)=>{
        console.log('fjdjj',e.target.value)
        setSearchedQuery(e.target.value)
    }

    return (
        <div className=' dash-header'>
            <div className="p-3 overflow-auto d-flex bg-white-custom border-bottom shadow-sm">

                {/* <!-- Left Side--> */}
                <div className="d-flex flex-grow-1 align-items-center">
                    <h6 className="align-self-center mb-0 me-3 fw-semibold text-nowrap">
                        {heading}
                    </h6>
                    <i className={`fa-solid ${icon}`}></i>
                </div>

                {/* <!-- Right Side--> */}
                <div className="d-flex h-stack gap-1 position-relative">

                    {/* Dark Mode */}
                    <div className='btn'>
                        <input className="checkbox" type="checkbox" id="toggle" onChange={() => {
                            document.querySelector('.adminView').classList.toggle('dark');
                            document.querySelectorAll('.bg-white-custom').forEach(x => { x.classList.toggle('dark') })
                        }} />
                        <label className="toggle" htmlFor="toggle">
                            <ion-icon className="icon icon--light" name="sunny-outline"></ion-icon>
                            <ion-icon className="icon icon--dark" name="moon-outline"></ion-icon>
                            <span className="ball"></span>
                        </label>
                    </div>
                    {/* <!-- List View --> */}
                    <a href="/projects-list.html" className="btn btn-link btn-sm rounded-circle text-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="List View">
                        <i className="fas fa-columns"></i>
                    </a>

                    {/* <!-- Grid View --> */}
                    <a href="/projects-grid.html" className="btn btn-link btn-sm rounded-circle text-secondary" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Grid View">
                        <i className="fas fa-th"></i>
                    </a>

                    {/* <!-- Table View --> */}
                    <a href="/" className="btn btn-link btn-sm rounded-circle me-3 text-secondary active" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Table View">
                        <i className="fas fa-bars"></i>
                    </a>


                    {/* <!-- Add Task/Project --> */}
                    {/* <button className="btn btn-light btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#modalCreateProject">
                <i className="fas fa-plus" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Add Project" aria-label="Add Project"></i>
            </button> */}

                    <button className="btn btn-light btn-sm rounded-circle text-secondary" data-bs-toggle="modal" data-bs-target="#modalCreateProject">
                        <input type='search' onChange={(e)=>handleSearch(e)} />
                        <i className="fas fa-search" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Add Project" aria-label="Add Project"></i>
                    </button>

                </div>
            </div>


        </div>
    )
}

export default Header