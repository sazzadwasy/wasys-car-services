import React from 'react';
import close from '../../../images/closed.jpg'

const NotFound = () => {
    return (
        <div className=''>
            <h1 className='text-center text-danger'>Sorry!</h1>
            <img className='w-50' src={close} alt='' />
        </div>
    );
};

export default NotFound;