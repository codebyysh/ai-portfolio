import { AdminPanel } from "@/components/workspace/admin-panel";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage projects, blog posts, prompts, learning paths, and content.
        </p>
      </div>
      <AdminPanel />
    </div>
  );
}
