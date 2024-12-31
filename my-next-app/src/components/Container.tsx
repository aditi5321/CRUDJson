import clsx from "clsx";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx(`${className} max-w-5xl mx-auto py-10 px-4`)}>
      {children}
    </div>
  );
};

export default Container;
