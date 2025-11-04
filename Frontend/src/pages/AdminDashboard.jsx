import { useState, useEffect } from 'react';
import { adminAPI } from '../api';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    membershipRevenue: 0,
    activeMembers: [],
    popularSessions: [],
    totalSessions: 0,
    activeCoupons: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [membershipRevenueRes, activeMembersRes, popularSessionsRes, sessionsRes, couponsRes] = await Promise.all([
        adminAPI.getTotalMembershipRevenue(),
        adminAPI.getActiveMembers(),
        adminAPI.getPopularSessions(),
        adminAPI.getSessions(),
        adminAPI.getCoupons()
      ]);

      setStats({
        membershipRevenue: membershipRevenueRes.data.total_revenue,
        activeMembers: activeMembersRes.data,
        popularSessions: popularSessionsRes.data,
        totalSessions: sessionsRes.data.length,
        activeCoupons: couponsRes.data.filter(c => c.is_active && new Date(c.valid_to) >= new Date()).length
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      alert('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  const totalRevenue = stats.membershipRevenue;
  const totalActiveMembers = stats.activeMembers.length;
  const totalPopularSessions = stats.popularSessions.reduce((sum, item) => sum + parseInt(item.total_bookings || 0), 0);

  if (loading) {
    return (
      <div className="admin-dashboard" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <div style={{textAlign: 'center'}}>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your fitness center operations</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-value">{formatCurrency(totalRevenue)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Active Members</h3>
            <p className="stat-value">{totalActiveMembers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Total Bookings</h3>
            <p className="stat-value">{totalPopularSessions}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-info">
            <h3>Total Sessions</h3>
            <p className="stat-value">{stats.totalSessions}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎟️</div>
          <div className="stat-info">
            <h3>Active Coupons</h3>
            <p className="stat-value">{stats.activeCoupons}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/branches" className="action-card">
            <div className="action-icon">🏢</div>
            <h3>Manage Branches</h3>
            <p>Add, edit, or remove</p>
          </Link>

          <Link to="/admin/studios" className="action-card">
            <div className="action-icon">🏋️</div>
            <h3>Manage Studios</h3>
            <p>Configure spaces</p>
          </Link>

          <Link to="/admin/sessions" className="action-card">
            <div className="action-icon">📋</div>
            <h3>Manage Sessions</h3>
            <p>Schedule sessions</p>
          </Link>

          <Link to="/admin/coupons" className="action-card">
            <div className="action-icon">✨</div>
            <h3>Manage Coupons</h3>
            <p>Create discounts</p>
          </Link>

          <Link to="/admin/reports" className="action-card">
            <div className="action-icon">📊</div>
            <h3>View Reports</h3>
            <p>Detailed analytics</p>
          </Link>
        </div>
      </div>

      {/* Popular Sessions Table */}
      <div className="section">
        <h2>Popular Sessions</h2>
        <p style={{color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '20px'}}>Most booked training sessions</p>
        <div className="table-container">
          {stats.popularSessions.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Activity</th>
                  <th>Total Bookings</th>
                </tr>
              </thead>
              <tbody>
                {stats.popularSessions.slice(0, 10).map((session, index) => (
                  <tr key={index}>
                    <td>{session.session_name}</td>
                    <td>
                      <span className="activity-badge">{session.activity_type}</span>
                    </td>
                    <td><strong>{session.total_bookings}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-message">
              <p>No session data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
