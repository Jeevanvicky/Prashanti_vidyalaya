import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/adminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        'http://localhost:8000/applications',
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (response.status === 200 && Array.isArray(response.data)) {
        setApplications(response.data);
      }
    } catch (err) {
      setError('Failed to load applications. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);

    try {
      const response = await axios.get(
        'http://localhost:8000/applications/export',
        {
          responseType: 'blob',
          headers: {
            'Accept': 'text/csv'
          }
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'applications.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export CSV. Please try again.');
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Applications Dashboard</h1>
          <p>Manage student admissions</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Toolbar */}
        <div className="dashboard-toolbar">
          <div className="toolbar-info">
            <span className="app-count">
              Total Applications: <strong>{applications.length}</strong>
            </span>
          </div>
          <div className="toolbar-actions">
            <button
              className="refresh-btn"
              onClick={fetchApplications}
              disabled={loading}
            >
              ⟳ Refresh
            </button>
            <button
              className="export-btn"
              onClick={handleExportCSV}
              disabled={exporting || applications.length === 0}
            >
              {exporting ? '⬇ Exporting...' : '⬇ Export CSV'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="dashboard-error">{error}</div>}

        {/* Loading State */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications yet</p>
            <span>Applications will appear here as they are submitted</span>
          </div>
        ) : (
          /* Applications Table */
          <div className="table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Parent Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => (
                  <tr key={app.id || idx} className="app-row">
                    <td className="app-name">{app.student_name}</td>
                    <td>{app.parent_name}</td>
                    <td className="app-phone">{app.phone}</td>
                    <td className="app-email">{app.email}</td>
                    <td className="app-class">{app.class_applied}</td>
                    <td>
                      <span className={`status-badge status-${(app.status || 'NEW').toLowerCase()}`}>
                        {app.status || 'NEW'}
                      </span>
                    </td>
                    <td className="app-date">
                      {app.created_at ? new Date(app.created_at).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
