import { useEffect, useState } from "react";
import { getUsers } from "../../api/services/users";
import { User } from "../../types/User";
import Loading from "../../ui/components/Loading";

const Clients = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((res) => {
      if (res) {
        setUsers(res);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Loading visible={true} />;
  }

  return (
    <div>
      {users.map((user, i) => (
        <h1 key={i}>{user.name}</h1>
      ))}
    </div>
  );
};

export default Clients;
