import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { auth, db } from '../../firebase';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles1 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const columns = [
  { id: 'name', label: 'Tên', minWidth: 170 },
  { id: 'phone', label: 'Số điện thoại', minWidth: 100 },
  {
    id: 'address',
    label: 'Địa chỉ',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'rating',
    label: 'Đánh giá',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  }
];

function createData(name, phone, address, rating, status) {
  return { name, phone, address, rating, status };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const classes1 = useStyles1();

  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [data, setData] = React.useState([]);

  const [status, setStatus] = React.useState(2);
  const [rating, setRating] = React.useState('');



  const handleButton = (status, id) => {
    if(status) 
      return <Button variant="contained" onClick={() => updateStatus(0, id)}>Huỷ kích hoạt</Button>
    else 
      return <Button variant="contained" color="primary" onClick={() => updateStatus(1, id)}>Kích hoạt</Button>
  }

  const updateStatus = async (status, id) => {
    // console.log(status, id);
    await db.collection('store').doc(id).update({status: Number(status)});
    getData()
  }

  const getData = () => {
    db.collection('store').get().then( snapshot => {
        const user = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            user.push(data);
        });
        setData(user)
        const rowsData = [];
        user.map(item => {
            rowsData.push(createData(item.name, item.phone, item.address, null, handleButton(item.status, item.idStore)))
        })
        console.log(rowsData);
        setRows(rowsData);
    });
  }

  React.useEffect(() => {
    getData()
  },[])

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setRows([])
    const newData = data.filter(item => {
      if(event.target.value == 2) {
        return item
      } else {
        return item.status == event.target.value
      }
    })
    newData.map(item => {
      setRows(previous => [
          ...previous,
          createData(item.name, item.phone, item.address, null, handleButton(item.status)),
      ])
    })
    
  };
  

  const handleChangeRating = (event) => {
      setRating(event.target.value);
  }

  const HandlerSelector = () => {  
    return(
      <div>
        <FormControl className={classes1.formControl}>
          <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={handleChangeStatus}
          >
            <MenuItem value={2}>Tất cả</MenuItem>
            <MenuItem value={1}>Kích hoạt</MenuItem>
            <MenuItem value={0}>Chưa kích hoạt</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes1.formControl}>
          <InputLabel id="demo-simple-select-label">Đánh giá</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rating}
            onChange={handleChangeRating}
          >
            <MenuItem value={10}>Tất cả</MenuItem>
            <MenuItem value={20}>Đánh giá tăng dần</MenuItem>
            <MenuItem value={30}>Đánh giá giảm dần</MenuItem>
          </Select>
        </FormControl>
      
      </div>
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <HandlerSelector />
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}

