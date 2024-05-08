export default function FilterOptions({ setSortBy, setOrder }) {
  return (
    <section id="articles-filter">
      <form>
        <label htmlFor="sort_by">Sort by:</label>
        <select
          id="sort_by"
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="created_at">date</option>
          <option value="comment_count">comments</option>
          <option value="votes">votes</option>
        </select>
        <label htmlFor="order_by">Order by:</label>
        <select
          id="order_by"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="desc">Highest first</option>
          <option value="asc">Lowest first</option>
        </select>
      </form>
    </section>
  );
}
