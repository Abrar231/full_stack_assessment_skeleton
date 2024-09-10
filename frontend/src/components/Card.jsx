import PropTypes from 'prop-types'
import Modal from './Modal'
import {useState} from 'react'

function Card({home, users}) {
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setShowModal(true);
    }

    return (
        <div className='text-xs flex flex-col justify-between gap-2 shadow-lg p-5 min-w-44'>
            <div className='flex flex-col gap-1'>
                <div className='text-lg font-bold'>{home.street_address}</div>
                <div>
                    <div>List Price: ${home.list_price}</div>
                    <div>State: {home.state}</div>
                    <div>Zip: {home.zip}</div>
                    <div>Sqft: {home.sqft}</div>
                    <div>Beds: {home.beds}</div>
                    <div>Baths: {home.baths}</div>
                </div>
            </div>
            <button className='bg-blue-500 text-white py-1 px-4 rounded-sm w-max' onClick={handleClick}>Edit Users</button>
            {showModal && <Modal users={users} home={home} setShowModal={setShowModal} />}
        </div>
    )
}

Card.propTypes = {
    home: PropTypes.object,
    users: PropTypes.array,
}

export default Card