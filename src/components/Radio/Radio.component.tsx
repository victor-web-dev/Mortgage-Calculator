import { ChangeEvent } from "react";

interface props {
  groupName: string;
  handler: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  id: string;
}

export function Radio(props: props) {
  const { groupName, handler, value, label, id } = props;

  return (
    <>
      <div>
        <input
          type="radio"
          name={groupName}
          id={id}
          value={value}
          onChange={handler}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
}
