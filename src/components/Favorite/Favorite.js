const Favorite = ({ movie, onToggle }) => {
  let likedClass = "fa fa-heart";
  if (!movie.liked) likedClass += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={likedClass}
      aria-hidden="true"
      onClick={() => onToggle(movie.id)}
    ></i>
  );
};

export default Favorite;
