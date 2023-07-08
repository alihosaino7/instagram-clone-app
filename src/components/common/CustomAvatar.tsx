import defaultImage from "../../../public/images/default.webp";
import ImageLoader from "../ImageLoader";

type CustomAvatarProps = {
  img: string | undefined;
  size?: number;
  className?: string;
  loading?: boolean;
};

const CustomAvatar = ({ img, size, className, loading }: CustomAvatarProps) => {
  return (
    <div className={`w-[${size}px] h-[${size}px] relative ${className}`}>
      <img
        src={img || defaultImage}
        className="w-full h-full rounded-full object-cover object-center"
      />
      {loading && (
        <>
          <div className="w-full h-full rounded-full absolute z-[50] bg-black opacity-20 left-0 top-0"></div>
          <div
            className="absolute z-[100] left-[50%] top-[50%]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <ImageLoader />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomAvatar;
