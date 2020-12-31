import React from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

import './index.scss';

const override = css`
  margin: 0 auto;
`;

const CustomLoading = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="loading-container">
      <ClipLoader css={override} size={50} color="#44d7b6" loading={loading} />
    </div>
  );
};

CustomLoading.propTypes = {
  loading: PropTypes.bool,
};

CustomLoading.defaultProps = {
  loading: false,
};

export default CustomLoading;
