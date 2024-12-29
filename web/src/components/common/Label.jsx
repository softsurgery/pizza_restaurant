import { cn } from "../../lib/tailwind";

export const Label = ({ className, children, ...props }) => {
  return (
    <label className={cn("text-lg font-extrabold", className)} {...props}>
      {children}
    </label>
  );
};
