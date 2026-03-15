import { useAuth } from '../context/AuthContext';
import './Pages.css';
import './Admin.css';

export default function UserManagement() {
    const { users, manageUser } = useAuth();

    return (
        <div className="page-container admin-page container animate-fade-in">
            <header className="admin-header">
                <div>
                    <h1>User Management</h1>
                    <p>Manage member statuses, roles, and administrative access.</p>
                </div>
                <div className="admin-actions">
                    <button className="btn-primary">Add New User</button>
                </div>
            </header>

            <section className="admin-section">
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        <div className="user-info-cell">
                                            <div className="user-avatar">{(u.name || (u.email ? u.email.charAt(0) : '?'))}</div>
                                            <strong>{u.name || (u.email ? u.email.split('@')[0] : 'Unknown')}</strong>
                                        </div>
                                    </td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span className={`role-badge ${u.role}`}>
                                            {u.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${u.status || 'active'}`}>
                                            {(u.status || 'Active').toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {u.role !== 'admin' ? (
                                                <button
                                                    className="btn-text"
                                                    onClick={() => manageUser(u.id, { role: 'admin' })}
                                                >
                                                    Make Admin
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn-text"
                                                    onClick={() => manageUser(u.id, { role: 'user' })}
                                                    disabled={u.email === 'naheed.miah@gmail.com' || u.email === 'anas.arif786@adfoods.co.uk'}
                                                >
                                                    Revoke Admin
                                                </button>
                                            )}
                                            <button className="btn-text danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
