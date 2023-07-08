import SkeletonElement from "./SkeletonElement";

export default function RightSideSkeleton() {
  return (
    <div className="hidden md:flex flex-col basis-[30%] ml-8">
      <div className="flex gap-2 items-center">
        <div className="w-[50px] h-[50px]">
          <SkeletonElement type="avatar" />
        </div>

        <div className="w-[100px]">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
      </div>

      <div className="my-5">
        <SkeletonElement type="text" />
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <div className="flex gap-4 items-center">
          <div className="w-[30px] h-[30px]">
            <SkeletonElement type="avatar" />
          </div>

          <div className="flex-1">
            <SkeletonElement type="text" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-[30px] h-[30px]">
            <SkeletonElement type="avatar" />
          </div>

          <div className="flex-1">
            <SkeletonElement type="text" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-[30px] h-[30px]">
            <SkeletonElement type="avatar" />
          </div>

          <div className="flex-1">
            <SkeletonElement type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}
