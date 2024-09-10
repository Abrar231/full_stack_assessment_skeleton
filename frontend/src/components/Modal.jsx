import PropTypes from 'prop-types'
import { useGetCheckedUsersForHomeQuery, useUpdateUsersForHomeMutation } from '../slices/apiSlice';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

function Modal({home, users, setShowModal}) {
    const {data: selectedUsers = []} = useGetCheckedUsersForHomeQuery(home.id);
    const [updateUsers, {isLoading}] = useUpdateUsersForHomeMutation();
    const [selectedCount, setSelectedCount] = useState(0);
    const [checkList, setCheckList] = useState(users.map(user => {
        return {...user, checked: selectedUsers.find(selectedUser => selectedUser.id === user.id)? true: false}
    }));

    const handleCancel = () =>{
        setShowModal(false);
    }

    const handleChange = (id) => {
        const data = checkList.map(user => {
            if(user.id === id){
                return {...user, checked: !user.checked}
            } else{
                return user
            }
        })
        setCheckList(data);
        setSelectedCount(prevCount => 
            checkList.find(user => user.id === id).checked ? prevCount - 1 : prevCount + 1
        );
    }

    const handleSave = async () => {
        const response = await updateUsers({checkList, home_id: home.id});
        if(response.message){
            setShowModal(false);
        }
    }

    useEffect(() => {
        if(selectedUsers){
            setCheckList(users.map(user => {
                return {...user, checked: selectedUsers.find(selectedUser => selectedUser.id === user.id)? true: false}
            }));
            setSelectedCount(selectedUsers.length);
        }
    }, [selectedUsers, users])

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-base'>
            <div className='mt-20 w-max rounded-lg border p-5 flex flex-col gap-3 bg-white'>
                {selectedUsers.length? 
                    <>
                        <div className='pr-5 font-bold'>Modify Users for: {home.street_address}</div>
                        <section>
                            {checkList.map(user =>  
                                <div key={user.id} className='flex gap-2'>
                                    <input type="checkbox" id={user.username} name={user.username} className='peer' checked={user.checked} onChange={() => handleChange(user.id)} />
                                    {console.log(`User: ${JSON.stringify(user)}`)}
                                    <label htmlFor={user.username} className='peer-checked:font-bold'>{user.username}</label>
                                </div>
                            )}
                            {selectedCount === 0 && <div className='text-red-500 font-bold'>Error: Atleast 1 user has to be selected</div>}
                        </section>
                        <div className='flex justify-end gap-2'>
                            <button className='rounded-lg px-4 py-2 bg-gray-300' onClick={handleCancel}>Cancel</button>
                            <button className='rounded-lg px-4 py-2 bg-blue-500 text-white disabled:bg-gray-300' onClick={handleSave} disabled={isLoading || selectedCount === 0}>Save</button>
                        </div>
                    </>
                    :
                    <Spinner />
                }
            </div>
        </div>
    )
}

Modal.propTypes = {
    home: PropTypes.object,
    users: PropTypes.array,
    setShowModal: PropTypes.func,
}

export default Modal