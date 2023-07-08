import SkeletonElement from "./SkeletonElement";

const ProfileInfoSkeleton = () => {
  return (
    <div className="flex items-center relative py-4 mb-4 lg:py-8 lg:mb-8">
      <div className="w-[32%] text-center">
        <div className="w-[70px] sm:w-[130px] h-[70px] sm:h-[130px] mx-auto relative">
          <SkeletonElement type="avatar" />
        </div>
      </div>
      <div className="ml-2 flex-1 gap-4">
        <SkeletonElement type="text" overrideClassName="!md:h-[16px]" />
        <SkeletonElement type="text" overrideClassName="!md:h-[16px]" />
        <SkeletonElement type="text" overrideClassName="!md:h-[16px]" />
      </div>
    </div>
  );
};

export default ProfileInfoSkeleton;
