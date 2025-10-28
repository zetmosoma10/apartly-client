import BackButton from "../../components/BackButton";
import type { User } from "../../entities/User";
import useGetUsers from "../../hooks/useGetUsers";
import UserCard from "./UserCard";

const AdminPage = () => {
  const { data, isLoading, error } = useGetUsers();
  const users = data?.results as User[];

  if (isLoading) return <h3>Loading...</h3>;

  if (error) console.log(error);

  return (
    <div className="space-y-5 max-container">
      <BackButton />
      <h2>All Users</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
        {users.map((user) => (
          <UserCard user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
