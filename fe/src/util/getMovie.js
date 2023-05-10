import axios from "axios";
const getMovie = async (movie) => {
    const data = await axios.get(
      `https://movie-reviews-znfor.ondigitalocean.app/api/reviews/movies?id=${movie.id}`
    );

    return data.data;
  };

  export default getMovie