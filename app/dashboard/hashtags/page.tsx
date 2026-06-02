import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CmsTaxonomyModule } from "@/components/dashboard/CmsTaxonomyModule";
import { MOCK_HASHTAGS } from "@/lib/mock/cms";

export default function DashboardHashtagsPage() {
  return (
    <DashboardShell title="Hashtags" description="CRUD hashtags for posts.">
      <CmsTaxonomyModule moduleName="Hashtag" initialItems={MOCK_HASHTAGS} />
    </DashboardShell>
  );
}
