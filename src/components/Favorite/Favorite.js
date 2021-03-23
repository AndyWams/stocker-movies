const Favorite = ({ movie, onToggle }) => {
  let likedClass = "fa fa-heart";
  if (!movie.liked) likedClass += "-o";
  return (
    <i
      style={{ cursor: "pointer", color: "#dc3545" }}
      className={likedClass}
      aria-hidden="true"
      onClick={() => onToggle(movie._id)}
    ></i>
  );
};

export default Favorite;
