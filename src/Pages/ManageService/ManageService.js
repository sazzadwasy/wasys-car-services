import React from 'react';
import useServices from '../../hooks/useServices';

const ManageService = () => {
    const [services, setServices] = useServices()
    const handleServiceDelete = id => {
        const proceed = window.confirm('Are sure you want to delete?')
        if (proceed) {
            const url = `https://agile-dusk-73421.herokuapp.com/service/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = services.filter(service => service._id !== id)
                    setServices(remaining)
                })
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Manage all services</h1>
            {
                services.map(service => <p key={service._id} className='fs-4 fw-semibold'>{service.name} <button onClick={() => handleServiceDelete(service._id)}>x</button></p>)
            }
        </div>
    );
};

export default ManageService;