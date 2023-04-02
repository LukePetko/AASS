const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Dashboard content</p>
      <button type="button" onClick={() => localStorage.removeItem("userId")}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
