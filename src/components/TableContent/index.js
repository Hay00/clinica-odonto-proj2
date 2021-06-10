import React from 'react';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

// Componentes
import Loading from '../Loading';

import { Message } from './styles';

function TableContent(props) {
  const { columns, actions, data } = props;

  /**
   * Renderiza uma linha
   * @returns JSX
   */
  function renderRow(value) {
    if (typeof value === 'boolean') {
      return (
        <p style={{ color: value ? 'green' : 'red' }}>
          {value ? 'Concluída' : 'Pendente'}
        </p>
      );
    }
    return value;
  }

  /**
   * Renderiza o corpo da tabela
   * @returns JSX
   */
  function renderBody() {
    if (!data) return null;
    return data.map((obj, index) => (
      <TableRow key={obj.id} hover role="checkbox">
        <>
          {Object.entries(obj).flatMap(([key, value]) =>
            key === 'id' ? (
              []
            ) : (
              <TableCell key={key}>{renderRow(value)}</TableCell>
            )
          )}
          {actions && <TableCell>{actions[index]}</TableCell>}
        </>
      </TableRow>
    ));
  }

  if (data === null) {
    return <Message>Nenhum dado encontrado!</Message>;
  }

  if (data.length > 0) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((item, key) => (
              <TableCell key={key}>
                <b>{item}</b>
              </TableCell>
            ))}
            {actions && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>{renderBody()}</TableBody>
      </Table>
    );
  }

  return <Loading />;
}

TableContent.prototype = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.array,
};

export default TableContent;
