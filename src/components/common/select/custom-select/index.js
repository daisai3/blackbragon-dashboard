import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/common/svgIcon';
import { useOnClickOutside } from 'utils';
import './index.scss';

function CustomSelect({ label, value, name, items, onSelect }) {
  const [opened, setOpened] = React.useState(false);
  const ref = useRef();

  const onToggle = () => {
    setOpened(!opened);
  };

  useOnClickOutside(ref, () => {
    setOpened(false);
  });

  const onSelectItem = (item) => {
    onSelect(name, item.value);
    setOpened(false);
  };

  const activeItem = items.find((item) => item.value.toString() === value.toString());

  return (
    <div className="custom-select" ref={ref}>
      {label.length > 0 && <label htmlFor="custom-input">{label}</label>}
      <div className={`custom-select__origin ${opened ? 'custom-select__origin--opened' : ''}`}>
        <div className="select-icon-wrapper vertical-center">
          <SvgIcon name="arrowDown" />
        </div>
        <button type="button" onClick={onToggle}>
          {activeItem && activeItem.name}
        </button>
      </div>
      {opened && (
        <div className="custom-select__expanded">
          <div className="custom-select__expanded-menu">
            {items.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`custom-select__expanded-menu__item ${
                  activeItem.value === item.value
                    ? 'custom-select__expanded-menu__item--active'
                    : ''
                }`}
                onClick={() => onSelectItem(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape),
  onSelect: PropTypes.func,
};

CustomSelect.defaultProps = {
  label: '',
  value: '',
  name: '',
  items: [],
  onSelect: () => {},
};

export default CustomSelect;
