import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedUser } from '../slices/selectedUserSlice';

function DropdownBar({users}) {
  const selectedUser = useSelector(state => state.selectedUser);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(changeSelectedUser({user: JSON.parse(e.target.value)}));
  } 

  return (
    <div className="flex justify-end w-full items-center fixed top-0 right-6 bg-white p-2">
        <span className="text-sm mr-5">Select user:</span>
        <select name="user" id="user" className="text-sm border rounded px-4 py-1 border-black" 
          onChange={handleChange} value={JSON.stringify(selectedUser)}
        >
          <option value='None' >None</option>
          {users[0] && users.map(user => <option key={user.id} value={JSON.stringify(user)} >{user.username}</option>)}
        </select>
    </div>
  )
}

DropdownBar.propTypes = {
  users: PropTypes.array,
}

export default DropdownBar