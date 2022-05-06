import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css'

const Service = ({ service }) => {
    const { _id, name, price, description, img } = service
    const navigate = useNavigate()
    const handleNavigateService = (id) => {
        navigate(`/service/${id}`)
    }
    return (
        <div className='service'>
            <img className='w-100' src={img} alt='' />
            <h2>{name}</h2>
            <h2>price: {price}</h2>
            <p>{description}</p>
            <button onClick={() => handleNavigateService(_id)} className='book-btn'>BOOk {name}</button>
        </div>
    );
};

export default Service;