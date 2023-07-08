type LoaderProps = {
  className?: string;
};

export const Loader = ({ className = "", ...rest }: LoaderProps) => {
  return (
    <div
      className={`absolute left-[50%] top-[50%] ${className}`}
      style={{
        transform: "translate(-50%, -50%)",
      }}
      {...rest}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
