import React, { useState, useRef } from 'react';
import '../ChipComponent.css';

interface Chip {
  id: number;
  label: string;
}

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Nick Giannopoulos', // Bonus task example
  // Add more items as needed
];

const ChipComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [dataList, setDataList] = useState(items);
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [chipSelected, setChipSelected] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    filterItems(text);
  };

  const filterItems = (text: string) => {
    const filtered = dataList.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemPress = (item: string) => {
    setChips(prevChips => [...prevChips, { id: Date.now(), label: item }]);
    const filteredDataList = dataList.filter(listItem => listItem !== item );
    setDataList(filteredDataList);
    setInputValue('');
    inputRef.current?.focus();
    filterItems(item);
  };

  const handleChipRemove = (chipId: number) => {
    setChips(prevChips => prevChips.filter(chip => chip.id !== chipId));
  };

  const handleBackspacePress = () => {
    if (inputValue === '' && chips.length > 0) {
      // Bonus task: Highlight last chip
      const lastChipId = chips[chips.length - 1].id;
      if(chipSelected) {
      // Handle deletion on backspace press again
      handleChipRemove(lastChipId);
      setChipSelected(null);
      }
      else {
        setChipSelected(lastChipId);
      }
    }
  };

  return (
    <div className="chip-container">
      <div className="chip-list">
        {chips.map(chip => (
          <div key={chip.id} className={"chip " + (chipSelected ===chip.id ? "chipSelected" : null)}>
            <img className='logo' />
            {chip.label}
            <span className="remove-icon" onClick={() => handleChipRemove(chip.id)}>
              X
            </span>
          </div>
        ))}
              <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Backspace' && handleBackspacePress()}
        placeholder="Type to search..."
      />
      </div>

      <ul className="item-list">
        {filteredItems.map(item => (
          <li key={item} onClick={() => handleItemPress(item)}>
            {item}
          </li>
        ))}
      </ul>


    </div>
  );
};

export default ChipComponent;