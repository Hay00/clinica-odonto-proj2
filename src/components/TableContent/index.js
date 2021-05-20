import React from 'react';

import PropTypes from 'prop-types';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Componentes
import Loading from '../Loading';

import { Message } from './styles';

function TableContent(props) {
  const { columns, body, data, hasActions } = props;

  if (data === null) {
    return <Message>Nenhum agendamento encontrado!</Message>;
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
            {hasActions && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>{body}</TableBody>
      </Table>
    );
  }

  return <Loading />;
}

TableContent.defaultProps = {
  hasActions: false,
};

TableContent.prototype = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  body: PropTypes.element.isRequired,
  data: PropTypes.array.isRequired,
  hasActions: PropTypes.bool,
};

export default TableContent;
