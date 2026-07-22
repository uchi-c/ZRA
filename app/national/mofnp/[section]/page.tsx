"use client";

import { ComingSoonPanel } from "@/components/national/ComingSoonPanel";
import { MOFNP_NAV } from "@/lib/nationalNavConfig";
import { useTheme } from "@/lib/theme";

export default function MofnpSectionPage({ params }: { params: { section: string } }) {
  const { theme } = useTheme();
  const item = MOFNP_NAV.find((n) => n.href === `/national/mofnp/${params.section}`);
  return <ComingSoonPanel theme={theme} title={item?.label ?? "Module"} />;
}
