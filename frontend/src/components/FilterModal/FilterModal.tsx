import { useState } from 'react';
import { COLORS, SIZES, SORT_BY } from '../../helpers/constants';
import './FilterModal.scss';
import { SmallButton } from '../SmallButton';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/Categories';

type Props = {
  onClose: (value: boolean) => void,
}

export const FilterModal: React.FC<Props> = ({ onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedColors, setCheckedColors] = useState<string[]>([]);
  const [checkedSizes, setCheckedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');

  const isColorChecked = (currentColor: string) => checkedColors.includes(currentColor);
  const isSizeChecked = (currentSize: string) => checkedSizes.includes(currentSize);

  const handleToggleColor = (currentColor: string) => {
    if (isColorChecked(currentColor)) {
      setCheckedColors(prev => prev.filter(color => color !== currentColor))
    } else {
      setCheckedColors(prev => [...prev, currentColor])
    }
  }

  const handleToggleSize = (currentSize: string) => {
    if (isSizeChecked(currentSize)) {
      setCheckedSizes(prev => prev.filter(size => size !== currentSize))
    } else {
      setCheckedSizes(prev => [...prev, currentSize])
    }
  }

  const clearAll = () => {
    setCheckedColors([]);
    setCheckedSizes([]);
    setSortBy('');
  }

  const handleDone = () => {
    setSearchParams(getSearchWith({
      [SearchParams.Sort]: sortBy || null,
      [SearchParams.Color]: checkedColors,
      [SearchParams.Size]: checkedSizes,
      [SearchParams.Page]: null,
    }, searchParams))
    onClose(false)
  }

  return (
    <div className="FilterModal">
      <div className="FilterModal__container">
        <div className="FilterModal__header">
          <h2 className="FilterModal__title">Filter</h2>
          <button type="button" onClick={() =>onClose(false)}>
            <div className="icon icon--close"/>
          </button>
        </div>

        <div className="FilterModal__content">
          <ul className="FilterModal__sort">
            {Object.entries(SORT_BY).map(([key, value]) => (
              <li 
                className="FilterModal__sort-item checkbox checkbox--radio" 
                key={key} 
                onClick={() => setSortBy(key)}
              >
                <input 
                  id={key} 
                  type="checkbox" 
                  className="FilterModal__sort-input" 
                  checked={sortBy === key}
                  onChange={() =>setSortBy(key)}
                />

                <button className="wrapper" onClick={() => setSortBy(key)}>
                  <span className="knob"></span>
                </button>

                <span className="FilterModal__label">
                  {value}
                </span>
              </li>
            ))}
          </ul>

          <div className="FilterModal__wrapper">
          <ul className="FilterModal__color">
            <li className="FilterModal__color-item">Color</li>
            {Object.entries(COLORS).map(([key, value]) => (
              <li 
                className="FilterModal__color-item checkbox" 
                key={key} 
                onClick={() => handleToggleColor(value)}
              >
                <input 
                  id={value} 
                  type="checkbox" 
                  className="FilterModal__color-input" 
                  checked={isColorChecked(value)}
                  onChange={() =>handleToggleColor(value)}
                />              
                <button className="wrapper">
                  <span className="knob"></span>
                </button>

                <span className="FilterModal__label">
                  {key}
                </span>
              </li>
            ))}          
          </ul>
          
          <ul className="FilterModal__size">
            <li className="FilterModal__size-item">Size</li>
            {Object.entries(SIZES).map(([key, value]) => (
              <li 
                className="FilterModal__size-item checkbox" 
                key={key} 
                onClick={() => handleToggleSize(value)}
              >
                <input 
                  id={value} 
                  type="checkbox" 
                  className="FilterModal__size-input" 
                  checked={isSizeChecked(value)}
                  onChange={() =>handleToggleSize(value)}
                />

                <button className="wrapper">
                  <span className="knob"></span>
                </button>

                <span className="FilterModal__label">
                  {key}
                </span>
              </li>
            ))}
          </ul>
          </div>
          
        </div>

        <div className="FilterModal__buttons">
          <SmallButton text="clear all" onClick={clearAll} />
          <SmallButton text="done" onClick={handleDone} />
        </div>
      </div>      
    </div>
  )
}