import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import Table from "./Table";
const MovieTable = ({
  onDelete,
  onToggleLike,
  onSort,
  sortColumn,
  allmovies,
}) => {
  const columns = [
    {
      path: "id",
      label: "#",
    },
    {
      path: "title",
      label: "Title",
    },
    {
      path: "genre",
      label: "Genre",
    },
    {
      path: "stock",
      label: "Stock",
    },
    {
      path: "rating",
      label: "Rating",
    },
    {
      key: "like",
      label: "Like",
      content: (movie) => <Favorite movie={movie} onToggle={onToggleLike} />,
    },
    {
      key: "delete",
      label: "Action",
      content: (movie) => (
        <Button
          bgcolor="btn--danger btn-md"
          btntext="Delete"
          onClick={() => onDelete(movie.id)}
        />
      ),
    },
  ];

  return (
    <Table
      data={allmovies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MovieTable;
