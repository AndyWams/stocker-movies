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
      path: "title",
      label: "Title",
    },
    {
      path: "genre.name",
      label: "Genre",
    },
    {
      path: "numberInStock",
      label: "Stock",
    },
    {
      path: "dailyRentalRate",
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
          onClick={() => onDelete(movie._id)}
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
