import { useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import type { User } from "../../entities/User";
import useGetUsers from "../../hooks/useGetUsers";
import UserCard from "./UserCard";
import DeleteUserModal from "./DeleteUserModal";

const AdminPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const deleteRef = useRef<HTMLDialogElement>(null);
  const { data, isLoading, error } = useGetUsers();
  const users = data?.results as User[];

  const onSelectedUser = (user: User | null) => {
    setSelectedUser(user);
  };

  if (isLoading) return <h3>Loading...</h3>;

  if (error) console.log(error);

  return (
    <div className="max-container">
      <BackButton />
      <h2>All Users</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 mt-5">
        {users.map((user) => (
          <UserCard
            user={user}
            key={user._id}
            onOpen={() => deleteRef.current?.showModal()}
            onSelectedUser={onSelectedUser}
          />
        ))}
      </div>

      {/* Delete Modal */}
      <DeleteUserModal
        ref={deleteRef}
        onClose={() => deleteRef?.current?.close()}
        user={selectedUser}
      />
    </div>
  );
};

export default AdminPage;
