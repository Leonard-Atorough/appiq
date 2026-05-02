export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello, User!</h1>
      <p className="text-xl text-muted-foreground mt-sm mb-md">
        Welcome to your job application dashboard! Here you can get an overview of your job search
        progress, upcoming interviews, and recent activity.
      </p>
      {/* Add dashboard widgets and components here */}
      {/* Metric cards: Total Applications, Applied this month, Interviews scheduled, offers received, Rejection rate (rejected applications / total applications) */}
        {/* Upcoming interviews: List of next 3 interviews with date, company, position */}
        {/* Recent activity feed: List of recent actions like "Applied to Software Engineer at XYZ", "Interview scheduled with ABC Corp", "Application updated for DEF Inc" */}
        <div>
            <h2 className="text-2xl font-semibold mb-sm">Your Activity</h2>
            <p className="text-md text-muted">No recent activity. Start applying to jobs to see your progress here!</p>
        </div>
      <div className="mt-lg">
        </div>
    </div>
  );
}
