import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            const email = user.email
            console.log(email)
            const url = `https://agile-dusk-73421.herokuapp.com/order?email=${email}`
            const { data } = await axios.get(url)
            setOrders(data)
        }
        getOrders()
    }, [user])
    return (
        <div className='text-center'>
            <h1>Please order :{orders.length}</h1>
            {
                orders.map(order => <p key={order._id}>
                    <h2>{order.email} : {order.service}</h2>
                </p>)
            }
        </div>
    );
};

export default Orders;