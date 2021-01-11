import React from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

import './index.scss';

const override = css`
  margin: 0 auto;
`;

const CircleLoading = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="circle-loading-container">
      <ClipLoader css={override} size={22} color="#ffffff" loading={loading} />
    </div>
  );
};

CircleLoading.propTypes = {
  loading: PropTypes.bool,
};

CircleLoading.defaultProps = {
  loading: false,
};

export default CircleLoading;
