import { ProfileDataSection } from "./sections"
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(
  () => import('@/components/Layout').then(mod => mod.Layout)
);

export const ProfileModule = () => (
  <LayoutComponent>
    <div className="mx-auto my-auto h-screen flex flex-col justify-center items-center">

      <section>
        <ProfileDataSection />
      </section>
    </div>
  </LayoutComponent>
)