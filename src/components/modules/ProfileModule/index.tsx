import { ProfileDataSection, OwnPostsSection } from "./sections"
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(
  () => import('@/components/Layout').then(mod => mod.Layout)
);

export const ProfileModule = () => (
  <LayoutComponent metaTitle="Profile" metaDescription="My Profile">
    <div className="mx-auto flex flex-col justify-center items-center">
      <div className="mt-[120px] mb-[48px]">
      <ProfileDataSection />
      </div>
      <OwnPostsSection />
    </div>
  </LayoutComponent>
)