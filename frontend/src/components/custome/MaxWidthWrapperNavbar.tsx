import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

const MaxWidthWrapperNavbar = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "h-full  w-full px-2.5 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapperNavbar;
