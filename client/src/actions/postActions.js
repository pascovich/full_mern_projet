import axios from "axios";

// posts
export const GET_POSTS = "GET_POST";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      // const res = await axios.get(`${process.env.REACT_APP_API_URL}api/post`)
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) => {
          dispatch({ type: GET_POSTS, payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

// comment
