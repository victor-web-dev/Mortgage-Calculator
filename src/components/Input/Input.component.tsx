import { ChangeEvent, HTMLInputTypeAttribute } from "react";
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
  const inputRef = useRef(null);
  const { type, handler, value, symbol, symbolPos, name, label } = props;

  const symbolPosHandler = useCallback(() => {
    if (symbolPos) {
      return symbolPos === "right" ? s.symbol_right : s.symbol;
    } else {
      return s.symbol;
    }
  }, [symbolPos]);

  const symbolFocusHandler = () => {
    if (symbolRef.current) {
      symbolRef.current.classList.add(s.symbol_focus);
    }
  };

  const symbolRemoveFocus = () => {
    if (symbolRef.current) {
      symbolRef.current.classList.remove(s.symbol_focus);
    }
  };

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
            onChange={handler}
            value={value}
          />
        </div>
      </div>
    </div>
  );
}
