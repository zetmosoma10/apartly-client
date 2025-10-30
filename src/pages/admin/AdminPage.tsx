import { useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import type { User } from "../../entities/User";
import UserCard from "./UserCard";
import DeleteUserModal from "./DeleteUserModal";
import UserGridCardSkeleton from "../../components/loadingIndicators/UserCardSkeleton";
import useGetUsers from "../../hooks/admin/useGetUsers";
import PaginationType from "../../components/filters/Pagination";
import { useSearchParams } from "react-router-dom";

const AdminPage = () => {
  // * HOOKS
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const deleteRef = useRef<HTMLDialogElement>(null);
  const { data, isLoading } = useGetUsers(searchParams);

  // ? VARIABLES
  const page = parseInt(searchParams.get("page") || "1");
  const totalPages = data?.pagination?.totalPages;
  const users = data?.results;

  // * FUNCTIONS
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  const onSelectedUser = (user: User | null) => {
    setSelectedUser(user);
  };

  return (
    <div className="max-container">
      <BackButton />
      <h2>All Users</h2>
      {!isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 mt-5">
          {users?.map((user) => (
            <UserCard
              user={user}
              key={user._id}
              onOpen={() => deleteRef.current?.showModal()}
              onSelectedUser={onSelectedUser}
            />
          ))}
        </div>
      ) : (
        <UserGridCardSkeleton />
      )}

      {/* Pagination */}
      {totalPages && totalPages > 1 && (
        <div className="flex items-center justify-center mt-11">
          <PaginationType
            page={page}
            pagination={data.pagination}
            handlePageChange={handlePageChange}
          />
        </div>
      )}

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
