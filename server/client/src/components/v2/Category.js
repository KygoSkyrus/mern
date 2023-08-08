import React from 'react'
import { useParams } from 'react-router-dom'

const Category = () => {
const {categoryId}=useParams()

console.log('in cat',categoryId)

  return (
    <div>Category</div>



   

  )
}

export default Category