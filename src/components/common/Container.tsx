import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({
  children,
  className = "",
  ...rest
}: ContainerProps) => {
  return (
    <div
      className={`container lg:w-[850px]${className && " " + className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
