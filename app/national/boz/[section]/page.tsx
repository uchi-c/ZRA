"use client";

import { ComingSoonPanel } from "@/components/national/ComingSoonPanel";
import { BOZ_NAV } from "@/lib/nationalNavConfig";
import { useTheme } from "@/lib/theme";

export default function BozSectionPage({ params }: { params: { section: string } }) {
  const { theme } = useTheme();
  const item = BOZ_NAV.find((n) => n.href === `/national/boz/${params.section}`);
  return <ComingSoonPanel theme={theme} title={item?.label ?? "Module"} />;
}
