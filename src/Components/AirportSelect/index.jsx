import { useEffect, useState } from "react";
import { useCombobox } from "downshift";
import cx from "classnames";

import { getMinAirports } from "../../api/airports";
import useDebounce from "../../hooks/useDebounce";
import css from "./AirportSelect.module.scss";

const airportsList = [
  { value: "WAW", label: "Warsaw Chopin" },
  { value: "WMI", label: "Warsaw Modlin" },
];

function AirportSelect({ value, onChange }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [items, setItems] = useState(airportsList);

  useEffect(() => {
    let isCancelled = false;

    if (debouncedQuery.length) {
      getMinAirports(debouncedQuery)
        .then((data) => {
          if (!isCancelled) {
            setItems(data.map((e) => ({ value: e.code, label: e.name })));
          }
        })
        .catch((error) => console.error(error));
    } else {
      setItems(airportsList);
    }

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setQuery(inputValue);
    },
    items,
    itemToString(item) {
      return item ? item.label : "";
    },
    onSelectedItemChange({ selectedItem }) {
      onChange({ target: { value: selectedItem.value } });
    },
  });

  return (
    <div className={css.wrapper}>
      <label className="w-fit" {...getLabelProps()}>
        Origin
      </label>
      <div className={css.inputWrapper}>
        <input
          placeholder="Departure airport"
          className={css.input}
          {...getInputProps()}
        />
        <button
          aria-label="toggle menu"
          className={css.toggleButton}
          type="button"
          {...getToggleButtonProps()}
        >
          {isOpen ? <>&#8593;</> : <>&#8595;</>}
        </button>
      </div>
      <ul
        className={cx(css.dropdown, {
          [css.hidden]: !(isOpen && items.length),
        })}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={cx(css.dropdownItem, {
                [css.highlighted]: highlightedIndex === index,
                [css.selected]: selectedItem === item,
              })}
              key={item.value}
              {...getItemProps({ item, index })}
            >
              {item.label} ({item.value})
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AirportSelect;
