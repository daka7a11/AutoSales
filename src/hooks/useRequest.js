// const baseUrl = "http://localhost:8000";
const baseUrl = "https://autosalesapi-552aac66d548.herokuapp.com";

const useRequest = (getUserData, clearUserData) => {
  async function request(method, url, data) {
    const options = {
      method,
      headers: {},
    };

    if (data !== undefined) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) {
      const token = user.token;
      options.headers["Authorization"] = token;
    }

    try {
      const res = await fetch(baseUrl + url, options);

      if (!res.ok) {
        const err = await res.json();

        if (res.status === 400) {
          const error = new Error();
          error.status = 400;
          error.errors = err;
          throw error;
        }

        if (res.status === 401) {
          const error = new Error("Unauthorized");
          error.status = 401;
          throw error;
        }

        if (res.status === 403) {
          const err403 = new Error(err.message);
          err403.status = 403;
          throw err403;
        }

        throw new Error(err.message);
      }

      if (res.status === 204) {
        return res;
      }

      return res.json();
    } catch (err) {
      if ((err.status && err.status === 400) || err.status === 401) {
        throw err;
      }
      throw new Error(err);
    }
  }

  const get = request.bind(null, "GET");
  const post = request.bind(null, "POST");
  const put = request.bind(null, "PUT");
  const del = request.bind(null, "DELETE");

  return { get, post, put, del };
};

export default useRequest;
