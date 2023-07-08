import SkeletonElement from "./SkeletonElement";

export const ExpandedPostSkeleton = () => {
  return (
    <div className="flex h-[500px] w-full bg-white">
      <div className="p-4 h-full basis-[60%]">
        <SkeletonElement type="thumbnail" />
      </div>
      <div className="basis-[40%] flex flex-col">
        <header className="flex items-center justify-beween p-4">
          <div className="w-[40px] h-[40px]">
            <SkeletonElement type="avatar" />
          </div>
          <div className="w-[120px] ml-4">
            <SkeletonElement type="text" />
          </div>
        </header>
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px]">
              <SkeletonElement type="avatar" />
            </div>
            <div className="ml-4 flex-1">
              <SkeletonElement type="text" />
            </div>
          </div>
          <div className="mt-4">
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedPostSkeleton;
