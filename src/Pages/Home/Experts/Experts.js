import React from 'react';
import expert1 from '../../../images/experts/expert-1.jpg'
import expert2 from '../../../images/experts/expert-2.jpg'
import expert3 from '../../../images/experts/expert-3.jpg'
import expert4 from '../../../images/experts/expert-4.jpg'
import expert5 from '../../../images/experts/expert-5.jpg'
import expert6 from '../../../images/experts/expert-6.png'
import Expert from '../Expert/Expert';

const experts = [
    { id: 11, name: 'Will smith', img: expert1 },
    { id: 12, name: 'Mical jonson', img: expert2 },
    { id: 13, name: 'Roberto', img: expert3 },
    { id: 14, name: 'Dewane rock', img: expert4 },
    { id: 15, name: 'Paul semual', img: expert5 },
    { id: 16, name: 'Markoni', img: expert6 }
]

const Experts = () => {
    return (
        <div id='experts' className='container'>
            <h2 className='text-success text-center mt-4'>We provide service by experts</h2>
            <div className="row">
                {
                    experts.map(expert => <Expert
                        key={expert.id}
                        expert={expert}
                    ></Expert>)
                }
            </div>
        </div>
    );
};

export default Experts;