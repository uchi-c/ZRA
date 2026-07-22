"use client";

import { ComingSoonPanel } from "@/components/national/ComingSoonPanel";
import { TSA_NAV } from "@/lib/nationalNavConfig";
import { useTheme } from "@/lib/theme";

export default function TsaSectionPage({ params }: { params: { section: string } }) {
  const { theme } = useTheme();
  const item = TSA_NAV.find((n) => n.href === `/national/tsa/${params.section}`);
  return <ComingSoonPanel theme={theme} title={item?.label ?? "Module"} />;
}
