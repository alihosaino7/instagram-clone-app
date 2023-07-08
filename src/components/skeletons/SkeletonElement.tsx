type SkeletonElementProps = {
  type: "title" | "avatar" | "thumbnail" | "text";
  overrideClassName?: string;
};

const SkeletonElement = ({
  type,
  overrideClassName = "",
}: SkeletonElementProps) => {
  const classes = `skeleton skeleton-${type} ${overrideClassName}`;
  return <div className={classes}></div>;
};

export default SkeletonElement;
