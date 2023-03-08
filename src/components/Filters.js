import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  render() {
    const {
      searchName,
      onInputChange,
      selectRare,
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
        <label>
          Selecione a Raridade:
          <select
            data-testid="rare-filter"
            name="selectRare"
            value={ selectRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
      </div>
    );
  }
}

Filters.propTypes = {
  searchName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  selectRare: PropTypes.string.isRequired,
};

export default Filters;
