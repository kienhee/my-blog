import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CmsTaxonomyModule } from "@/components/dashboard/CmsTaxonomyModule";
import { MOCK_CATEGORIES } from "@/lib/mock/cms";

export default function DashboardCategoriesPage() {
  return (
    <DashboardShell title="Categories" description="CRUD categories for posts.">
      <CmsTaxonomyModule moduleName="Category" initialItems={MOCK_CATEGORIES} />
    </DashboardShell>
  );
}
