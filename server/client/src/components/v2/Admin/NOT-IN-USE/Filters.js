import React,{useRef,useEffect,useState} from 'react'

const Filters = () => {
    const filtersRef = useRef();
    const [open, setOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState([])
    let filtersArray = ["category v1", "category v2", "category v3", "category", "category v1", "category vq1", "category vq7",]//this should has icons too 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!filtersRef?.current?.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, [])
    const selectFilter = () => {
        setOpen(true)
    }
    const applyFilter = (e) => {
        console.log('e', e.target.value)
        if (!appliedFilters.includes(e.target.innerText))
            setAppliedFilters(prevState => [...prevState, e.target.innerText])
    }
    const removeFilter = (value) => {
        console.log('value', value)
        setAppliedFilters(prevState => prevState.filter(x => x !== value))
    }
    
  return (
    <div className="px-3 py-2 gap-1 bg-white-custom border-bottom shadow-sm d-flex align-items-center position-relative">
    <span className="badge rounded-pill py-2 pe-2 badge-add-filter" data-bs-toggle="modal" href="#modalStart" role="button" onClick={e => selectFilter()}>
        Select Filter <i className="fa fa-plus ms-1"></i>
       {open && <div className='filters rounded-1 px-3 py-2 gap-1 bg-white shadow-m' ref={filtersRef}>
            {filtersArray.map((filter,i)=>{
                return(
                    <section className='p-2 rounded-pill bg-light' key={i}onClick={e=>applyFilter(e)} >{filter}</section>
                )
            })}                       
        </div>}
    </span>
    <div className='hstack overflow-auto gap-1 py-2' >
        {appliedFilters?.map((filter,i)=>{
            return(
                <span className="badge badge-light-light rounded-pill text-dark py-2 fw-normal" key={i}>
                <i className="fa fa-circle me-1 text-danger"></i>
                <span className="me-1">{filter}</span>
                <span className="text-dark opacity-25 ms-1 pointer" onClick={e=>removeFilter(filter)}>
                    <i className="fa fa-times-circle"></i>
                </span>
            </span>
            )
        })}
    </div>
</div>
  )
}

export default Filters