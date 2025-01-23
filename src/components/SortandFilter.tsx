import React from "react";
interface SortAndFilterProps {
  filter: { isComplete: string; priority: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ isComplete: string; priority: string }>
  >;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}
const SortAndFilter: React.FC<SortAndFilterProps> = ({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="filter-sort-section">
      <div>
        <label htmlFor="filter-priority">Priority</label>
        <select
          id="filter-priority"
          name="priority"
          value={filter.priority}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, priority: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label htmlFor="filter-complete">Completion Status</label>
        <select
          id="filter-complete"
          name="isComplete"
          value={filter.isComplete}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, isComplete: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="sort-order">Sort By</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};
export default SortAndFilter;
