import { cn } from "../../lib/tailwind";
import { Label } from "../common/Label";
import { usePizzaContext } from "./PizzaContext";
import { ToppingIcon } from "./ToppingIcon";
import { ToppingOption } from "./ToppingOptions";

export const PizzaOptions = ({ className, sizeOptions, toppingOptions }) => {
  const { selectedSize, setSelectedSize, selectedToppings } = usePizzaContext();
  console.log(selectedToppings);
  return (
    <section className={cn(className)}>
      <Label className={"my-1"}>Size</Label>
      <div>
        <select
          className="select select-bordered w-full max-w-xs my-4"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option disabled selected>
            Pizza Size
          </option>
          {Object.keys(sizeOptions).map((size) => (
            <option
              key={size}
              value={size}
            >{`${size} (${sizeOptions[size].inches}")`}</option>
          ))}
        </select>
        <svg
          className="pizza-options__size-icon"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            stroke="#0e4  47a"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 7l6 6 6-6"
          ></path>
        </svg>
      </div>
      <Label>Toppings</Label>
      <ul className="my-4">
        <li>
          <ToppingIcon iconType={"vegetarian"} /> Vegetarian
        </li>
        <li>
          <ToppingIcon iconType={"gluten free"} /> Gluten Free
        </li>
        <li>
          <ToppingIcon iconType={"hot"} /> Hot & Spicy
        </li>
      </ul>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(toppingOptions).map((topping) => {
          return (
            <ToppingOption
              className={cn(
                'rounded-lg',
                selectedToppings.find((t) => t === topping[0]) &&
                  "bg-slate-800"
              )}
              key={topping[0]}
              topping={topping[0]}
              toppingIcons={topping[1].icons}
            />
          );
        })}
      </ul>
    </section>
  );
};
