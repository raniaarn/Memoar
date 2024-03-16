import { FloatingPostForm } from "@/components";
import { ProfileDataSection, OwnPostsSection } from "./sections"
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(
  () => import('@/components/Layout').then(mod => mod.Layout)
);

export const ProfileModule = () => (
  <LayoutComponent metaTitle="Profile" metaDescription="My Profile">
    <div className=" mt-[100px] mb-[48px]">
      <div className="sticky top-[100px] w-[90%] p-4 mx-auto bg-white rounded-[10px] shadow">
        <div className="mb-4">
        <ProfileDataSection />
        </div>
        <FloatingPostForm />
      </div>
      <OwnPostsSection />
    </div>
  </LayoutComponent>
)