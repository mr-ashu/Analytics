import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getTimeSeries,
  getTopN,
  TimeSeriesPoint,
  TopNItem,
} from "../Utils/fakeApi";
import TimeSeriesChart from "../Components/TimeSeriesChart";
import TopNTable from "../Components/TopNTable";
import Filters from "../Components/Filters";
import { exportToCSV } from "../Utils/csv";
import { useDispatch } from "react-redux";
import { logout } from "../Auth/authStore";
import LoadingOverlay from "../Components/LoadingOverlay";
import "./Dashboard.css";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [series, setSeries] = useState<TimeSeriesPoint[]>([]);
  const [topN, setTopN] = useState<TopNItem[]>([]);
  const [loading, setLoading] = useState(false);

  // filters from URL
  const projectId = searchParams.get("projectId") || undefined;
  const event = searchParams.get("event") || undefined;
  const breakdown = searchParams.get("breakdown") || undefined;
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;

  const [error, setError] = useState<string | null>(null);
  
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      getTimeSeries({ projectId, event, breakdown, from, to }),
      getTopN({ projectId, event, breakdown, from, to })
    ])
      .then(([seriesData, topNData]) => {
        setSeries(seriesData);
        setTopN(topNData);
      })
      .catch((e) => {
        setError(e.message || 'Unknown error');
        setSeries([]);
        setTopN([]);
      })
      .finally(() => setLoading(false));
  }, [projectId, event, breakdown, from, to]);

  return (
    <div className="dashboard-root">
      <div className="dashboard-sidebar">
        <p className="dashboard-title">
          Dashboard
        </p>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-header">
          <p className="dashboard-header-title">Dashboard</p>
          <button className='logout-button' onClick={() => dispatch(logout())}>Logout</button>
        </div>
        <Filters />
        {error && (
          <div className="dashboard-error">
            <p className="dashboard-error-message">Error: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}
        {!loading && !error && (
          <>
            <TimeSeriesChart data={series} />
            <TopNTable data={topN} />
            {topN.length === 0 && <p className="dashboard-nodata">No data for this filter.</p>}
            <button className='export-button' disabled={!topN.length} onClick={() => exportToCSV(topN)}>
              Export CSV
            </button>
          </>
        )}
      </div>

      {loading && <LoadingOverlay text="Loading data..." />}
    </div>
  );
};

export default Dashboard;
