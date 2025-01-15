import { AccountDetails } from "../components/Account/AccountDetails";
import { cn } from "../lib/tailwind";

export default function Account({ className }) {
  return (
    <div className={cn("flex flex-col flex-1 overflow-hidden", className)}>
      <div className="prose border-b max-w-full">
        <h1>👤 Account</h1>
        <p className="mb-5">
          Manage your account details, track your orders, and explore your favorite pizzas all in one place. 
          Stay connected and make the most of your pizza experience with our personalized account features.
        </p>
      </div>

      <AccountDetails className={"flex-1 overflow-auto p-4"} />
    </div>
  );
}
