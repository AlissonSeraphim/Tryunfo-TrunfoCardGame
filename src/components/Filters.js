import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  render() {
    const {
      searchName,
      onInputChange,
    } = this.props;

    return (
      <div>
        <label>
          Pesquise pelo Nome:
          <input
            type="text"
            data-testid="name-filter"
            name="searchName"
            value={ searchName }
            onChange={ onInputChange }
          />
        </label>
      </div>
    );
  }
}

Filters.propTypes = {
  searchName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Filters;
