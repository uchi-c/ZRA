import { ComingSoonPanel } from "@/components/national/ComingSoonPanel";
import { TSA_NAV } from "@/lib/nationalNavConfig";

export default function TsaSectionPage({ params }: { params: { section: string } }) {
  const item = TSA_NAV.find((n) => n.href === `/national/tsa/${params.section}`);
  return <ComingSoonPanel theme="light" title={item?.label ?? "Module"} />;
}
