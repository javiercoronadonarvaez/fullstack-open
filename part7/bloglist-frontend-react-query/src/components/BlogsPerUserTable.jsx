import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../requests";

const BlogsPerUserTable = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const users = result.data;

  console.log("Users", users);

  const data = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
  ];

  return (
    <>
      <h2>Users</h2>
      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td style={{ textAlign: "center" }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BlogsPerUserTable;
