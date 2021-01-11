import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'react-sweet-progress';
import NumberFormat from 'react-number-format';
import SvgIcon from 'components/common/svgIcon';
import './index.scss';

const CustomProgressBar = ({ total, value }) => {
  const [isTooltipShowed, setTooltipShowed] = useState(false);

  const onShowTooltip = () => {
    setTooltipShowed(true);
  };

  const onHideTooltip = () => {
    setTooltipShowed(false);
  };

  const percent = total === 0 ? 0 : ((value * 100) / total).toFixed(2);

  return (
    <div className="d-flex custom-progress-bar-container">
      <Progress className="custom-progress-bar" percent={percent} />
      <div className="custom-progress-bar-tooltip-container">
        <div onMouseEnter={onShowTooltip} onMouseLeave={onHideTooltip}>
          <SvgIcon name="help" />
        </div>
        {isTooltipShowed && (
          <div className="custom-progress-bar-tooltip">
            <div className="custom-progress-bar-tooltip__label custom-progress-bar-tooltip__label-percentage">
              <div>Percentage</div>
              <div>{`${percent}%`}</div>
            </div>
            <Progress className="custom-progress-bar" percent={percent} />
            <div className="custom-progress-bar-tooltip__label custom-progress-bar-tooltip__label-amount">
              <div>Amount</div>
              <div>
                <span>
                  <NumberFormat value={value} thousandSeparator displayType="text" prefix="$" />
                </span>
                <span>{` of `}</span>
                <span>
                  <NumberFormat value={total} thousandSeparator displayType="text" prefix="$" />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CustomProgressBar.propTypes = {
  total: PropTypes.number,
  value: PropTypes.number,
};

CustomProgressBar.defaultProps = {
  total: 0,
  value: 0,
};

export default CustomProgressBar;
