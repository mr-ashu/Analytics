import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import "./Filters.css";
const projects = ["project-1", "project-2"];
const events = ["page_view", "purchase", "signup"];
const breakdowns = ["store", "city", "device"];

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

 
  const projectId = searchParams.get("projectId") || projects[0];
  const event = searchParams.get("event") || events[0];
  const breakdown = searchParams.get("breakdown") || breakdowns[0];
  const from =
    searchParams.get("from") || dayjs().subtract(6, "day").format("YYYY-MM-DD");
  const to = searchParams.get("to") || dayjs().format("YYYY-MM-DD");

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <div className="filters-container">
    
        <select
         className="filter-select"
          value={projectId}
          onChange={(e) => updateParam("projectId", e.target.value)}
          title="Select project"
        >
          {projects.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
   

      <select
        className="filter-select"
        value={event}
        onChange={(e) => updateParam("event", e.target.value)}
        title="Select event"
      >
        {events.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={breakdown}
        onChange={(e) => updateParam("breakdown", e.target.value)}
        title="Select breakdown"
      >
        {breakdowns.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <input
        className="filter-input"
        type="date"
        value={from}
        onChange={(e) => updateParam("from", e.target.value)}
        title="Start date"
        placeholder="Start date"
      />

    
        <input
          className="filter-input"
          type="date"
          value={to}
          onChange={(e) => updateParam("to", e.target.value)}
          title="End date"
          placeholder="End date"
        />
 
    </div>
  );
};

export default Filters;
