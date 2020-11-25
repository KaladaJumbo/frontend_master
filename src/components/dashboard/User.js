import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


// Generate Order Data
function createData(id, tag, tip) {
  return { id, tag, tip };
}


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();

  const rows = [
    createData(0, 'chords', 'Good job keep it up'),
    createData(1, 'scales', 'Good job keep it up'),
    createData(2, 'guac', 'Good job keep it up'),
    createData(3, 'money', 'Good job keep it up'),
    createData(4, 'stuff', 'Good job keep it up'),
  ];

  return (
    <React.Fragment>
      <Typography
        style={{ fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%" }}
        className={classes.title} variant="h3"
      >
        Kalada - 500 points
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>Tips and Tricks</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: '10%' }}>{row.tag}</TableCell>
              <TableCell>{row.tip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}