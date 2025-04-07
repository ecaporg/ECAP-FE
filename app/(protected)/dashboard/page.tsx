import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the ECAP System dashboard.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>Total registered students</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">20</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
            <CardDescription>Active classes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
            <CardDescription>Faculty members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>System activity in the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-md border p-4">
              <div className="flex-1">
                <p className="font-medium">New assignment created</p>
                <p className="text-sm text-muted-foreground">
                  Teacher One created "Math Homework 1" for Mathematics 101
                </p>
              </div>
              <div className="text-sm text-muted-foreground">2 days ago</div>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <div className="flex-1">
                <p className="font-medium">Grades updated</p>
                <p className="text-sm text-muted-foreground">
                  Teacher Two updated grades for "Biology Research Paper"
                </p>
              </div>
              <div className="text-sm text-muted-foreground">3 days ago</div>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <div className="flex-1">
                <p className="font-medium">New student registered</p>
                <p className="text-sm text-muted-foreground">
                  Student20 Lastname20 was added to Chemistry 101
                </p>
              </div>
              <div className="text-sm text-muted-foreground">5 days ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
