import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';
const CheckOut = () => {
    const [user] = useAuthState(auth);
    const { serviceId } = useParams()
    const [service] = useServiceDetail(serviceId)
    // const [user, setUser] = useState({
    //     name: 'Sazzad',
    //     email: 'Sazzad@gmail.com',
    //     address: 'Chattogram',
    //     phone: '01703890605'
    // })

    // const handleAddressChange = (event) => {
    //     console.log(event.target.value)
    //     const { address, ...rest } = user
    //     console.log(address, rest)
    //     const newAddress = event.target.value
    //     const newUser = { address: newAddress, ...rest }
    //     console.log(newUser)
    //     setUser(newUser)
    // }
    const handlePlaceOrder = event => {
        event.preventDefault()
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('https://agile-dusk-73421.herokuapp.com/order', order)
            .then(response => {
                const { data } = response
                if (data.insertedId) {
                    toast('Your order booked successfully!!!')
                    event.target.reset()
                }
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h1 className='text-center text-success m-4'>Please order : {service.name}</h1>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2 p-2' type='text' value={user?.displayName} name='name' placeholder='Your name' readOnly required disabled />
                <input className='w-100 mb-2 p-2' type='email' value={user?.email} name='email' placeholder='Your email' readOnly required disabled />
                <input className='w-100 mb-2 p-2' type='text' value={service.name} name='service' placeholder='Service' required readOnly />
                <input className='w-100 mb-2 p-2' type='text' name='address' placeholder='Address' required autoComplete='off' />
                <input className='w-100 mb-2 p-2' type='number' name='phone' placeholder='Phone no' required />
                <input className='btn btn-success text-center' type='submit' value='Please submit' />
            </form>
        </div>
    );
};

export default CheckOut;