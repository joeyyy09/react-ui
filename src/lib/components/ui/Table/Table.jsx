import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import styles from './Table.scss';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeaderCell = this.renderHeaderCell.bind(this);

    this.sortCellStyle = {
      backgroundColor: 'lightgray',
    };
  }

  renderHeaderCell(column) {
    const { sort } = this.props;
    const sortDirection = sort && column.name === sort.column ? sort.direction : 'asc';
    const isSortingActive = sort && column.name === sort.column;

    return (
      <th
        key={column.name}
        className={isSortingActive ? styles.isTableHeadCellSortingActive : styles.tableHeadCell}
      >
        {sort && column.isSortable && (
          <div className={styles.sortButton}>
            <Button
              clickHandler={() => sort.changeHandler(column.name, sortDirection)}
              icon={sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
              label={sortDirection}
              labelVisibility="none"
              priority="flat"
            />
          </div>
        )}
        {column.label}
      </th>
    );
  }

  renderBodyCell(column, row) {
    const { sort } = this.props;
    const isSortingActive = sort && column.name === sort.column;

    if (column.format) {
      return (
        <td
          key={`${row.id}-${column.name}`}
          className={isSortingActive ? styles.isTableCellSortingActive : styles.tableCell}
        >
          {column.format(row)}
        </td>
      );
    }

    return (
      <td
        key={`${row.id}-${column.name}`}
        className={isSortingActive ? styles.isTableCellSortingActive : styles.tableCell}
      >
        {row[column.name]}
      </td>
    );
  }

  render() {
    const {
      columns,
      rows,
    } = this.props;

    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              {columns.map(this.renderHeaderCell)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={styles.tableRow}>
                {columns.map((column) => this.renderBodyCell(column, row))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.defaultProps = {
  sort: null,
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    format: PropTypes.func,
    isSortable: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  })).isRequired,
  sort: PropTypes.shape({
    changeHandler: PropTypes.func.isRequired,
    column: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
  }),
};

export default Table;