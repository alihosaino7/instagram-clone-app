import { IParent } from "../../types/types";
import { useEffect } from "react";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center fixed z-[2000] px-4 bg-[rgba(0,0,0,.7)]">
      {children}
    </div>
  );
};

const Box = ({ children, className }: IParent) => {
  return (
    <div
      className={`relative bg-white rounded-lg overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

const Header = ({ children, ...rest }: IParent) => {
  return <header {...rest}>{children}</header>;
};

const Body = ({ children, ...rest }: IParent) => {
  return <main {...rest}>{children}</main>;
};

const Footer = ({ children, ...rest }: IParent) => {
  return <footer {...rest}>{children}</footer>;
};

Modal.Box = Box;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
