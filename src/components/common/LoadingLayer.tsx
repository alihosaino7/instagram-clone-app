import { Loader } from "..";

const LoadingLayer = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="bg-white opacity-80 absolute w-full h-full z-10" />
      <Loader className="z-10" />
    </div>
  );
};

export default LoadingLayer;
