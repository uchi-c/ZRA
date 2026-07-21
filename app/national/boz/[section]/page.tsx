import { ComingSoonPanel } from "@/components/national/ComingSoonPanel";
import { BOZ_NAV } from "@/lib/nationalNavConfig";

export default function BozSectionPage({ params }: { params: { section: string } }) {
  const item = BOZ_NAV.find((n) => n.href === `/national/boz/${params.section}`);
  return <ComingSoonPanel theme="dark" title={item?.label ?? "Module"} />;
}
