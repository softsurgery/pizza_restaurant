import { usePizzaContext } from "./PizzaContext";
import { ToppingIcon } from "./ToppingIcon";

export const ToppingOption = ({ className, topping, toppingIcons }) => {
  const { selectedToppings, setSelectedToppings } = usePizzaContext();

  const handleToppingOptionClick = (selectedTopping) => {
    if (selectedToppings.includes(selectedTopping)) {
      // Remove topping
      setSelectedToppings((prevSelectedToppings) =>
        prevSelectedToppings.filter((topping) => topping !== selectedTopping)
      );
    } else {
      // Add topping
      setSelectedToppings((prevSelectedToppings) => [
        ...prevSelectedToppings,
        selectedTopping,
      ]);
    }
  };

  return (
    <li className={className}>
      <input
        type="checkbox"
        id={topping}
        className="pizza-options__topping-input"
        checked={selectedToppings.includes(topping)}
        onChange={(e) => handleToppingOptionClick(e.target.id)}
      />
      <label
        className="pizza-options__topping-label"
        htmlFor={topping}
        aria-label={`${topping} (${toppingIcons.map((icon) => icon)})`}
      >
        <div className="pizza-options__topping-image">
          <div className={`${topping} topping-image-item`}></div>
        </div>
        <span className="pizza-options__topping-label-content">
          <span className="pizza-options__topping-label-text">{topping}</span>
          <span className="pizza-options__topping-label-icons">
            {toppingIcons.map((icon) => (
              <ToppingIcon key={`${topping} ${icon}`} iconType={icon} />
            ))}
          </span>
        </span>
      </label>
    </li>
  );
};
