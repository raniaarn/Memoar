import { ProfileDataSection } from "./sections"
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(
  () => import('@/components/Layout').then(mod => mod.Layout)
);

export const ProfileModule = () => (
  <LayoutComponent>
    <section>
      <ProfileDataSection />
    </section>
  </LayoutComponent>
)