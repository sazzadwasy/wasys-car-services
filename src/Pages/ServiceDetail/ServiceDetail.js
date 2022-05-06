import { Link, useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams()
    const [service] = useServiceDetail(serviceId)
    return (
        <div>
            <h1>Service detail : {service.name}</h1>
            <div className='text-center'>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-success'>Proceed Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;