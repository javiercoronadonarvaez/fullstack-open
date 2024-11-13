import axios from "axios";
const baseUrl = "/api/logout";

const logout = async (user) => {
  console.log("USER", user);
  const token = `Bearer ${user.token}`;
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(baseUrl, config);
};

export default { logout };
