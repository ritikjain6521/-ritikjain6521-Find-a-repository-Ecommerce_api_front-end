import React, { useContext, useMemo, useState } from "react";
import Appcontext from "../context/Appcontext";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import * as XLSX from "xlsx";

// ── Helpers ────────────────────────────────────────────────────────────────────

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);

const fmtDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const COLORS = ["#a855f7", "#7c3aed", "#ec4899", "#06b6d4", "#f59e0b", "#10b981", "#ef4444", "#3b82f6"];

// ── Export helpers ─────────────────────────────────────────────────────────────

const exportCSV = (rows, filename) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent =
    [headers.join(","), ...rows.map((r) => headers.map((h) => `"${r[h] ?? ""}"`).join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const exportExcel = (rows, filename, sheetName = "Sheet1") => {
  if (!rows.length) return;
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
};

// ── Component ──────────────────────────────────────────────────────────────────

const AdminReports = () => {
  const { allOrder = [], allUsers = [] } = useContext(Appcontext);
  const [activeTab, setActiveTab] = useState("overview"); // overview | users | charts

  // Build a userId → name map from allUsers
  const userMap = useMemo(() => {
    const map = {};
    if (Array.isArray(allUsers?.users)) {
      allUsers.users.forEach((u) => { map[u._id] = u.name || u.email || u._id; });
    } else if (Array.isArray(allUsers)) {
      allUsers.forEach((u) => { map[u._id] = u.name || u.email || u._id; });
    }
    return map;
  }, [allUsers]);

  const orders = Array.isArray(allOrder) ? allOrder : [];

  // ── Stat Totals ──────────────────────────────────────────────────────────────
  const totalRevenue = orders.reduce((s, o) => s + (Number(o.amount) || 0), 0);
  const totalOrders = orders.length;
  const uniqueUsers = new Set(orders.map((o) => o.userid)).size;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // ── Per-User Table Data ───────────────────────────────────────────────────────
  const userStats = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const uid = o.userid || "unknown";
      if (!map[uid]) {
        map[uid] = {
          userId: uid,
          name: userMap[uid] || o.userShipping?.fullname || uid.slice(-6),
          totalOrders: 0,
          totalSpend: 0,
          lastOrder: null,
          status: o.payStatus,
        };
      }
      map[uid].totalOrders += 1;
      map[uid].totalSpend += Number(o.amount) || 0;
      const oDate = new Date(o.orderDate);
      if (!map[uid].lastOrder || oDate > new Date(map[uid].lastOrder)) {
        map[uid].lastOrder = o.orderDate;
        map[uid].status = o.payStatus;
      }
    });
    return Object.values(map).sort((a, b) => b.totalSpend - a.totalSpend);
  }, [orders, userMap]);

  // ── Revenue by Day (last 14 days) ─────────────────────────────────────────────
  const revenueByDay = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const d = o.orderDate ? new Date(o.orderDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "Unknown";
      map[d] = (map[d] || 0) + (Number(o.amount) || 0);
    });
    return Object.entries(map)
      .map(([date, revenue]) => ({ date, revenue }))
      .slice(-14);
  }, [orders]);

  // ── Orders by Category (from orderitems) ──────────────────────────────────────
  const byCategory = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      (o.orderitems || []).forEach((item) => {
        const cat = item.category || "Other";
        map[cat] = (map[cat] || 0) + 1;
      });
    });
    if (!Object.keys(map).length) return [{ name: "No Data", value: 1 }];
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // ── Order Trend by Month ───────────────────────────────────────────────────────
  const orderTrend = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const m = o.orderDate
        ? new Date(o.orderDate).toLocaleDateString("en-IN", { month: "short", year: "2-digit" })
        : "Unknown";
      map[m] = (map[m] || 0) + 1;
    });
    return Object.entries(map).map(([month, orders]) => ({ month, orders }));
  }, [orders]);

  // ── Export handlers ───────────────────────────────────────────────────────────
  const exportUserCSV = () => {
    const rows = userStats.map((u) => ({
      "User Name": u.name,
      "User ID": u.userId,
      "Total Orders": u.totalOrders,
      "Total Spend (INR)": u.totalSpend,
      "Last Order Date": fmtDate(u.lastOrder),
      "Payment Status": u.status,
    }));
    exportCSV(rows, "admin_user_orders_report.csv");
  };

  const exportUserExcel = () => {
    const rows = userStats.map((u) => ({
      "User Name": u.name,
      "User ID": u.userId,
      "Total Orders": u.totalOrders,
      "Total Spend (INR)": u.totalSpend,
      "Last Order Date": fmtDate(u.lastOrder),
      "Payment Status": u.status,
    }));
    exportExcel(rows, "admin_user_orders_report.xlsx", "User Orders");
  };

  const exportAllOrdersCSV = () => {
    const rows = orders.map((o) => ({
      "Order ID": o.orderId,
      "Payment ID": o.paymentId,
      "User ID": o.userid,
      "Customer Name": o.userShipping?.fullname || "—",
      "Amount (INR)": o.amount,
      "Status": o.payStatus,
      "Date": fmtDate(o.orderDate),
    }));
    exportCSV(rows, "admin_all_orders_report.csv");
  };

  const exportAllOrdersExcel = () => {
    const rows = orders.map((o) => ({
      "Order ID": o.orderId,
      "Payment ID": o.paymentId,
      "User ID": o.userid,
      "Customer Name": o.userShipping?.fullname || "—",
      "Amount (INR)": o.amount,
      "Status": o.payStatus,
      "Date": fmtDate(o.orderDate),
    }));
    exportExcel(rows, "admin_all_orders_report.xlsx", "All Orders");
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="reports-page">
      {/* Header */}
      <div className="reports-header">
        <div>
          <h1 className="reports-title">📊 Reports & Analytics</h1>
          <p className="reports-subtitle">Order and payment analysis for all users</p>
        </div>
        <Link to="/admin" className="btn btn-outline-light btn-sm reports-back-btn">
          ← Back to Admin
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="reports-stats-grid">
        <div className="stat-card stat-card--revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">{fmt(totalRevenue)}</div>
        </div>
        <div className="stat-card stat-card--orders">
          <div className="stat-icon">📦</div>
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{totalOrders}</div>
        </div>
        <div className="stat-card stat-card--users">
          <div className="stat-icon">👥</div>
          <div className="stat-label">Users with Orders</div>
          <div className="stat-value">{uniqueUsers}</div>
        </div>
        <div className="stat-card stat-card--avg">
          <div className="stat-icon">📈</div>
          <div className="stat-label">Avg Order Value</div>
          <div className="stat-value">{fmt(avgOrderValue)}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="reports-tabs">
        {["overview", "users", "charts"].map((tab) => (
          <button
            key={tab}
            className={`reports-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "overview" ? "📋 All Orders" : tab === "users" ? "👤 By User" : "📈 Charts"}
          </button>
        ))}
      </div>

      {/* ── Tab: All Orders ── */}
      {activeTab === "overview" && (
        <div className="reports-section">
          <div className="reports-section-header">
            <h2 className="reports-section-title">All Orders</h2>
            <div className="reports-export-btns">
              <button className="export-btn export-btn--csv" onClick={exportAllOrdersCSV}>⬇ CSV</button>
              <button className="export-btn export-btn--excel" onClick={exportAllOrdersExcel}>⬇ Excel</button>
            </div>
          </div>
          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={6} className="reports-empty">No orders found</td></tr>
                ) : (
                  orders.map((o, i) => (
                    <tr key={o._id || i}>
                      <td>{i + 1}</td>
                      <td>{o.userShipping?.fullname || userMap[o.userid] || "—"}</td>
                      <td className="reports-mono">{o.orderId?.slice(-10) || "—"}</td>
                      <td className="reports-amount">{fmt(o.amount)}</td>
                      <td>
                        <span className={`reports-badge ${o.payStatus === "paid" ? "badge--paid" : "badge--pending"}`}>
                          {o.payStatus || "unknown"}
                        </span>
                      </td>
                      <td>{fmtDate(o.orderDate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: By User ── */}
      {activeTab === "users" && (
        <div className="reports-section">
          <div className="reports-section-header">
            <h2 className="reports-section-title">Orders by User</h2>
            <div className="reports-export-btns">
              <button className="export-btn export-btn--csv" onClick={exportUserCSV}>⬇ CSV</button>
              <button className="export-btn export-btn--excel" onClick={exportUserExcel}>⬇ Excel</button>
            </div>
          </div>
          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Total Orders</th>
                  <th>Total Spend</th>
                  <th>Last Order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userStats.length === 0 ? (
                  <tr><td colSpan={6} className="reports-empty">No data available</td></tr>
                ) : (
                  userStats.map((u, i) => (
                    <tr key={u.userId}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="reports-user-name">
                          <div className="reports-avatar">{(u.name?.[0] || "?").toUpperCase()}</div>
                          {u.name}
                        </div>
                      </td>
                      <td>
                        <span className="reports-order-count">{u.totalOrders}</span>
                      </td>
                      <td className="reports-amount">{fmt(u.totalSpend)}</td>
                      <td>{fmtDate(u.lastOrder)}</td>
                      <td>
                        <span className={`reports-badge ${u.status === "paid" ? "badge--paid" : "badge--pending"}`}>
                          {u.status || "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Charts ── */}
      {activeTab === "charts" && (
        <div className="reports-charts-grid">
          {/* Revenue Bar Chart */}
          <div className="chart-card">
            <h3 className="chart-title">💰 Revenue by Date</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueByDay} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="date" tick={{ fill: "#c4b5fd", fontSize: 11 }} angle={-35} textAnchor="end" />
                <YAxis tick={{ fill: "#c4b5fd", fontSize: 11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a0a2e", border: "1px solid #7c3aed", borderRadius: 8 }}
                  labelStyle={{ color: "#e9d5ff" }}
                  formatter={(v) => [fmt(v), "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="chart-card">
            <h3 className="chart-title">🏷️ Orders by Category</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={byCategory} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: "#c4b5fd" }}>
                  {byCategory.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a0a2e", border: "1px solid #7c3aed", borderRadius: 8 }}
                  labelStyle={{ color: "#e9d5ff" }}
                />
                <Legend wrapperStyle={{ color: "#c4b5fd", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Order Trend Line Chart */}
          <div className="chart-card chart-card--full">
            <h3 className="chart-title">📈 Order Trend by Month</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={orderTrend} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" tick={{ fill: "#c4b5fd", fontSize: 12 }} />
                <YAxis tick={{ fill: "#c4b5fd", fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a0a2e", border: "1px solid #7c3aed", borderRadius: 8 }}
                  labelStyle={{ color: "#e9d5ff" }}
                />
                <Legend wrapperStyle={{ color: "#c4b5fd", fontSize: 12 }} />
                <Line type="monotone" dataKey="orders" stroke="#a855f7" strokeWidth={2.5} dot={{ fill: "#a855f7", r: 5 }} activeDot={{ r: 7, fill: "#ec4899" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
