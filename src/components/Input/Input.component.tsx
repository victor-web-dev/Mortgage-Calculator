import { ChangeEvent, HTMLInputTypeAttribute, useEffect } from "react";
import { useRef, useCallback } from "react";
import s from "./Input.style.module.css";

interface props {
  type: HTMLInputTypeAttribute;
  name: string;
  handler: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  symbol: string;
  symbolPos?: "right" | "left";
  label?: string;
}

export function Input(props: props) {
  const symbolRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { type, handler, value, symbol, symbolPos, name, label } = props;

  // Check position selected for the Symbol and apply the appropriate css
  const symbolPosHandler = useCallback(() => {
    if (symbolPos) {
      return symbolPos === "right" ? s.symbol_right : s.symbol;
    } else {
      return s.symbol;
    }
  }, [symbolPos]);

  // Change background color when focused
  const symbolFocusHandler = () => {
    if (symbolRef.current) {
      symbolRef.current.classList.add(s.symbol_focus);
    }
  };
  // Remove background color when out of focus
  const symbolRemoveFocus = () => {
    if (symbolRef.current) {
      symbolRef.current.classList.remove(s.symbol_focus);
    }
  };

  // Limit length in the input
  const limitInputSize = (
    event: ChangeEvent<HTMLInputElement>,
    callback: (event: ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { value } = event.target;
    if (value.length >= 0 && value.length <= 9) callback(event);
  };

  useEffect(() => {
    // Adjust padding accordingly to symbol width
    const reactiveInputPadding = () => {
      if (symbolRef.current && inputRef.current) {
        const symWidth = symbolRef.current.offsetWidth;
        inputRef.current.style.paddingLeft = `${symWidth + 5}px`;
      }
    };
    reactiveInputPadding();
  });

  return (
    <div
      className={s.container}
      onFocus={symbolFocusHandler}
      onBlur={symbolRemoveFocus}
    >
      {!label ? (
        ""
      ) : (
        <div className={s.label_container}>
          <label>{label}</label>
        </div>
      )}
      <div className={s.input_container}>
        <div ref={symbolRef} className={symbolPosHandler()}>
          {symbol}
        </div>
        <div>
          <input
            ref={inputRef}
            className={s.input}
            type={type}
            name={name}
            onChange={(event) => limitInputSize(event, handler)}
            value={value}
          />
        </div>
      </div>
    </div>
  );
}
