import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const baseUrl = "http://localhost:3030";

const useRequest = () => {
  const authContext = useContext(AuthContext);

  async function request(method, url, data) {
    const options = {
      method,
      headers: {},
    };

    if (data != undefined) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }

    const user = authContext.getUserData();
    if (user) {
      const token = user.accessToken;
      options.headers["X-Authorization"] = token;
    }

    try {
      const res = await fetch(baseUrl + url, options);

      if (!res.ok) {
        const err = await res.json();

        if (res.status === 403) {
          const err403 = new Error(err.message);
          err403.status = 403;
          authContext.clearUserData();
          throw err403;
        }

        throw new Error(err.message);
      }

      if (res.status === 204) {
        return res;
      }

      return res.json();
    } catch (err) {
      alert(err.message);
      throw new Error(err.message);
    }
  }

  const get = request.bind(null, "GET");
  const post = request.bind(null, "POST");
  const put = request.bind(null, "PUT");
  const del = request.bind(null, "DELETE");

  return { get, post, put, del };
};

export default useRequest;
