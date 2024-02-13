import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Filter.scss';

import { SIZES, SORT_BY } from '../../contants/others';
import { SmallButton } from '../SmallButton';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/Categories';
import { PRODUCT_HEX } from '../../contants/colors';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

type Props = {
  onClose: (value: boolean) => void;
};

export const Filter: React.FC<Props> = React.memo(({ onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedColors, setCheckedColors] = useState<string[]>([]);
  const [checkedSizes, setCheckedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isColorChecked = (currentColor: string) =>
    checkedColors.includes(currentColor);
  const isSizeChecked = (currentSize: string) =>
    checkedSizes.includes(currentSize);

  const handleToggleColor = (currentColor: string) => {
    if (isColorChecked(currentColor)) {
      setCheckedColors((prev) =>
        prev.filter((color) => color !== currentColor)
      );
    } else {
      setCheckedColors((prev) => [...prev, currentColor]);
    }
  };

  const handleToggleSize = (currentSize: string) => {
    if (isSizeChecked(currentSize)) {
      setCheckedSizes((prev) => prev.filter((size) => size !== currentSize));
    } else {
      setCheckedSizes((prev) => [...prev, currentSize]);
    }
  };

  const clearAll = () => {
    setCheckedColors([]);
    setCheckedSizes([]);
    setSortBy('');
  };

  const handleDone = () => {
    setSearchParams(
      getSearchWith(
        {
          [SearchParams.Sort]: sortBy || null,
          [SearchParams.Color]: checkedColors,
          [SearchParams.Size]: checkedSizes,
          [SearchParams.Page]: null,
          [SearchParams.Search]: null
        },
        searchParams
      )
    );
    onClose(false);
  };

  return (
    <div className="Filter">
      <div className="Filter__header">
        <h2 className="Filter__title">Filter</h2>
        <button type="button" onClick={() => onClose(false)}>
          <div className="icon icon--close" />
        </button>
      </div>

      <div className="Filter__content">
        <ul className="Filter__sort">
          {Object.entries(SORT_BY).map(([key, value]) => (
            <li
              className="Filter__sort-item checkbox checkbox--radio"
              key={key}
              onClick={() => setSortBy(key)}
            >
              <input
                id={key}
                type="checkbox"
                className="Filter__sort-input"
                checked={sortBy === key}
                onChange={() => setSortBy(key)}
              />

              <button
                className="Filter__sort-checkbox wrapper"
                onClick={() => setSortBy(key)}
              >
                <span className="Filter__sort-knob knob" />
              </button>

              <span className="Filter__label">{value}</span>
            </li>
          ))}
        </ul>

        <ul className="Filter__color">
          <li className="Filter__color-item Filter__item-title">Color</li>
          {Object.keys(PRODUCT_HEX).map((key) => (
            <li
              className="Filter__color-item checkbox"
              key={key}
              onClick={() => handleToggleColor(key)}
            >
              <input
                id={key}
                type="checkbox"
                className="Filter__color-input"
                checked={isColorChecked(key)}
                onChange={() => handleToggleColor(key)}
              />
              <button className="Filter__color-checkbox wrapper">
                <span
                  className="Filter__color-knob knob"
                  style={{
                    backgroundColor: PRODUCT_HEX[key]
                  }}
                />
              </button>

              <span className="Filter__label">{key}</span>
            </li>
          ))}
        </ul>

        <ul className="Filter__size">
          <li className="Filter__size-item Filter__item-title">Size</li>
          {Object.entries(SIZES).map(([key, value]) => (
            <li
              className="Filter__size-item checkbox"
              key={key}
              onClick={() => handleToggleSize(value)}
            >
              <input
                id={value}
                type="checkbox"
                className="Filter__size-input"
                checked={isSizeChecked(value)}
                onChange={() => handleToggleSize(value)}
              />

              <button className="Filter__size-checkbox wrapper">
                <span className="Filter__size-knob knob" />
              </button>

              <span className="Filter__label">{key}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="Filter__buttons">
        <SmallButton
          text="clear all"
          onClick={clearAll}
          className={'secondary'}
        />
        <SmallButton text="done" onClick={handleDone} />
      </div>
    </div>
  );
});

export default ModalWrapper(Filter);
