import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import UserContext from '../../context/UserContext';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  title: {
    textTransform: "Capitalize",
    color: theme.palette.secondary.main
  },
  container: {
    width: "100%",
    height: "25vh",
    overflowY: "scrollable"
  },
  tableTitles: {
    textTransform: "Capitalize",
    color: theme.palette.secondary.roseGold
  }
}));

export default function Orders() {
  const classes = useStyles();

  const {user} = useContext(UserContext) 

  return (
    <React.Fragment>
      <Typography
        style={{ fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%" }}
        className={classes.title} variant="h3"
      >
        {user.username} - {user.points}
      </Typography>
      <Container className={classes.container}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell>Tips and Tricks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell style={{ width: '10%' }}><span className={classes.tableTitles}>{tag.name}</span></TableCell>
                <TableCell><span>{tag.tip}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </React.Fragment>
  );
}