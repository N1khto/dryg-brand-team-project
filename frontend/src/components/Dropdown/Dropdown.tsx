import React, { useState } from 'react';
import './Dropdown.scss';
import cn from 'classnames';

type Props = {
  defaultOption?: string,
  options: string[],
  currentOption: string,
  setCurrentOption: (option: string) => void,
};

export const Dropdown: React.FC<Props> = ({
  defaultOption,
  options,
  currentOption,
  setCurrentOption,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelectOption = (option: string) => {
    setCurrentOption(option)
    setIsSelectOpen(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (
      event.relatedTarget
      && event.relatedTarget?.className.includes('select-option')
    ) {
      return;
    }

    setIsSelectOpen(false);
  };

  return (
    <div className="Dropdown">
      <button
        id="triger"
        type="button"
        className="Dropdown__triger"
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        onBlur={handleBlur}
      >
        {currentOption ? currentOption : defaultOption}

        <div className={cn('icon icon--arrow-down', {
          icon__rotate: isSelectOpen,
        })}
        />
      </button>

      {isSelectOpen && (
        <div className="Dropdown__select">
          {options.map((option) => (
            <button
              type="button"
              onClick={() => handleSelectOption(option)}
              className="Dropdown__select-option"
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  defaultOption: '',
};
