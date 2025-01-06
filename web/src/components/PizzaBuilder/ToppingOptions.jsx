import { observer } from "mobx-react-lite";
import { ToppingIcon } from "./ToppingIcon";
import customOrderModel from "../../models/CustomOrderModel";

export const ToppingOption = observer(({ className, topping, toppingIcons }) => {

  const handleToppingOptionClick = (selectedTopping) => {
    if (customOrderModel.toppings.includes(selectedTopping)) {
      // Remove topping
     customOrderModel.removeTopping(selectedTopping)
    } else {
      // Add topping
      customOrderModel.addTopping(selectedTopping)
    }
  };

  return (
    <li className={className}>
      <input
        type="checkbox"
        id={topping}
        className="pizza-options__topping-input"
        checked={customOrderModel.toppings.includes(topping)}
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
});
