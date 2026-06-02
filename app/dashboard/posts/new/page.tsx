import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PostForm } from "@/components/dashboard/PostForm";
import { MOCK_CATEGORIES, MOCK_HASHTAGS } from "@/lib/mock/cms";

export default function NewPostPage() {
  return (
    <DashboardShell title="New Post" description="Create a new post (UI only).">
      <PostForm mode="create" hashtags={MOCK_HASHTAGS} categories={MOCK_CATEGORIES} />
    </DashboardShell>
  );
}
