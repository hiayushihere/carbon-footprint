import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import AddActivity from "../components/AddActivity";
import AIRecommendations from "../components/AIRecommendations";
import ActivityList from "../components/ActivityList";
import ComparisonCards from "../components/ComparisonCards";

// Charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// API
import api from "../api/axios";

// Styles
import "../styles/Dashboard.css";

const COLORS = ["#0ea5a4", "#38bdf8", "#fbbf24"];

export default function Dashboard() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshAll = async () => {
    try {
      setLoading(true);
      const [a, s, t] = await Promise.all([
        api.get("/activities"),
        api.get("/analytics/summary?period=monthly"),
        api.get("/analytics/trend"),
      ]);
      setActivities(a.data);
      setSummary(s.data);
      setTrend(t.data);
    } catch (err) {
      console.error("Dashboard refresh failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const monthlyCarbon = summary?.totalCarbon || 0;

  const pieData =
    summary?.breakdown?.map((item) => ({
      name: item._id,
      value: item.totalCarbon,
    })) || [];

  const lineData =
    trend?.map((item) => ({
      date: item._id,
      value: item.totalCarbon,
    })) || [];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1>Carbon Footprint Overview</h1>
            <p>
              Monitor emissions, analyze trends, and make informed
              sustainability decisions.
            </p>
          </div>

          <button
            className="profile-btn"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </header>

        {/* KPI */}
        <section className="kpi-grid">
          <KpiCard title="Monthly CO₂ Emissions" value={monthlyCarbon} />
        </section>

        {/* Comparisons */}
        <section className="dashboard-section">
          <ComparisonCards />
        </section>

        {/* AI */}
        <section className="dashboard-section">
          <AIRecommendations />
        </section>

        {/* Charts */}
        <section className="charts-grid">
          <div className="chart-card">
            <h3>Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Emission Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5a4"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Add Activity */}
        <section className="dashboard-section">
          <AddActivity onActivityAdded={refreshAll} />
        </section>

        {/* Activity List */}
        <section className="dashboard-section">
          <ActivityList
            activities={activities}
            onRefresh={refreshAll}
            loading={loading}
          />
        </section>

      </div>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="kpi-card">
      <div>
        <h4>{title}</h4>
        <p>{value.toFixed(2)} kg</p>
      </div>
    </div>
  );
}
