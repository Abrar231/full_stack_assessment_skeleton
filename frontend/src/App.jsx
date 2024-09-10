import Card from './components/Card';
import DropdownBar from "./components/DropdownBar";
import { useGetHomesForUserQuery, useGetUsersQuery } from "./slices/apiSlice";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import { selectSelectedUser } from "./slices/selectedUserSlice";

function App() {
  const { data: users = [] } = useGetUsersQuery();
  const selectedUser = useSelector(selectSelectedUser);
  console.log(selectedUser)
  const { data: homes = [], isFetching} = useGetHomesForUserQuery(selectedUser.id);
  
  return <>
    <div className="">
      <DropdownBar users={users} />
      {isFetching?
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>:
        homes[0] ? 
          <section className="mt-5 p-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {homes.map(home => <Card key={home.id} users={users} home={home}></Card>)}
          </section>:
          <div className="w-screen h-screen flex justify-center items-center">
            <span>nothing to show</span>
          </div>
      }
    </div>
  </>;
}

export default App;
