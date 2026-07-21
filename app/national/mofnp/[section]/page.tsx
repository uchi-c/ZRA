import { ComingSoonPanel } from "@/components/national/ComingSoonPanel";
import { MOFNP_NAV } from "@/lib/nationalNavConfig";

export default function MofnpSectionPage({ params }: { params: { section: string } }) {
  const item = MOFNP_NAV.find((n) => n.href === `/national/mofnp/${params.section}`);
  return <ComingSoonPanel theme="dark" title={item?.label ?? "Module"} />;
}
