import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PostForm } from "@/components/dashboard/PostForm";
import { MOCK_CATEGORIES, MOCK_HASHTAGS, MOCK_POSTS } from "@/lib/mock/cms";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = MOCK_POSTS.find((item) => item.id === id);

  return (
    <DashboardShell title={`Edit Post: ${id}`} description="Edit post details (UI only).">
      <PostForm
        mode="edit"
        postId={id}
        hashtags={MOCK_HASHTAGS}
        categories={MOCK_CATEGORIES}
        initialValues={
          post
            ? {
                cover: post.cover,
                title: post.title,
                slug: post.slug,
                description: post.description,
                content: post.content,
                status: post.status,
                hashtagIds: post.hashtagIds,
                categoryIds: post.categoryIds,
              }
            : undefined
        }
      />
    </DashboardShell>
  );
}
