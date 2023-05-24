import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  Container,
  Option,
  OptionBadge,
  Options,
  RemoveButton,
  Value,
} from "./ComponentStyled";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  variant: "gray" | "white";
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({
  variant = "white",
  multiple,
  value,
  onChange,
  options,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedindex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // function clearOptions() {
  //   multiple ? onChange([]) : onChange(undefined);
  // }

  const selectOption = useCallback(
    (option: SelectOption) => {
      if (multiple) {
        if (value?.includes(option)) {
          onChange(value.filter((v) => v !== option));
        } else {
          onChange([...value, option]);
        }
      } else {
        if (option !== value) onChange(option);
      }
    },
    [multiple, onChange, value]
  );

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) {
      setHighlightedindex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;

        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedindex(newValue);
          }
          break;
        }

        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    const container = containerRef?.current;
    container?.addEventListener("keydown", handler);

    return () => {
      container?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options, selectOption]);

  return (
    <Container
      color={variant}
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
    >
      <Value>
        {multiple
          ? value.map((v) => (
              <OptionBadge
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                key={v.value}
                color={variant}
              >
                {v.label}
                <RemoveButton id="RB" className="remove-btn">
                  &times;
                </RemoveButton>
              </OptionBadge>
            ))
          : value?.label}
      </Value>
      <ChevronDown size={20} style={{ marginBottom: "0.05em" }} />
      <Options color={variant} className={`${isOpen && "show"}`}>
        {options.map((option, index) => (
          <Option
            color={variant}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedindex(index)}
            className={` ${index === highlightedIndex && "highlighted"}`}
            key={option.value}
          >
            <div>
              <Check
                style={{ paddingTop: "0.25em" }}
                size={15}
                opacity={isOptionSelected(option) ? 1 : 0}
              />
            </div>

            {option.label}
          </Option>
        ))}
      </Options>
    </Container>
  );
}
