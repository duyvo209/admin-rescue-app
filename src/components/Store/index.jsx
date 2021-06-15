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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles1 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
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
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Lượt đánh giá',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'rating',
    label: 'Đánh giá',
    minWidth: 170,
    align: 'center',
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

// function createData(name, phone, address, rating, ratingNumber, status, statusNumber ) {
//   return { name, phone, address, rating, ratingNumber, status, statusNumber };
// }

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '100%',
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const classes1 = useStyles1();

  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [rowsTemp, setRowsTemp] = React.useState([]);
  const [data, setData] = React.useState([]);

  const [status, setStatus] = React.useState(2);
  const [rating, setRating] = React.useState(2);



  const handleButton = (status, id) => {
    if(status) 
      return <Button variant="contained" onClick={() => updateStatus(0, id)}>Huỷ kích hoạt</Button>
    else 
      return <Button variant="contained" color="primary" onClick={() => updateStatus(1, id)}>Kích hoạt</Button>
  }

  const handleRating = (rating) => {
    if (rating == 5) {
      return <p>
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
      </p>
    }
    if (rating == 4.5) {
      return <p>
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarHalfIcon style={{color: 'orange'}} />
      </p>
    }
    if (rating == 4) {
      return <p>
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
      </p>
    }
    if (rating == 3.5) {
      return <p>
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarHalfIcon style={{color: 'orange'}} />
      </p>
    }
    if (rating == 3) {
      return <p>
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
      </p>
    }
    if (rating == 2.5) {
      return <p>
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
        <StarHalfIcon style={{color: 'orange'}} />
      </p>
    }
    if (rating == 2) {
      return <p>
        <StarIcon style={{color: 'orange'}} />
        <StarIcon style={{color: 'orange'}} />
      </p>
    }
    if (rating == 1.5) {
      return <p>
        <StarIcon style={{color: 'orange'}} />
        <StarHalfIcon style={{color: 'orange'}} />
      </p>
    }
    if (rating == 1) {
      return <p><StarIcon style={{color: 'orange'}} /></p>
    }
    if (rating == 0.5) {
      return <p><StarHalfIcon style={{color: 'orange'}} /></p>
    }
    if (rating == 0) {
      return <p><StarBorderIcon style={{color: 'orange'}} />
      <StarBorderIcon style={{color: 'orange'}} />
      <StarBorderIcon style={{color: 'orange'}} />
      <StarBorderIcon style={{color: 'orange'}} />
      <StarBorderIcon style={{color: 'orange'}} /></p>
    }
      

  }

  const updateStatus = async (status, id) => {
    // console.log(status, id);
    await db.collection('store').doc(id).update({status: Number(status)});
    getData();
  }


  const getData = async () => {
    await db.collection('store').orderBy('status', 'asc').get().then( snapshot => {
        const user = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            user.push(data);
        });
        setData(user)
        setRows([]);
        setRowsTemp([]);
        user.map(async (item, index) => {
            db.collection('feedback').where('storeId', '==', item.idStore).get()
            .then((snapshot) => {
              const size = snapshot.size;
              let rating = 0;
              snapshot.forEach(doc => {
                rating += doc.data().rating
              })  
                setRows(previous => [
                    ...previous,
                    {
                      name: item.name,
                      phone: item.phone,
                      address: item.address,
                      rating: handleRating(Number(rating)/size ? Number(rating)/size : ''),
                      ratingNumber: Number(rating)/size ? Number(rating)/size : 0,
                      status: handleButton(item.status, item.idStore),
                      statusNumber: item.status,  
                      size: size,               
                    },
                   
                ])
                setRowsTemp(previous => [
                  ...previous,
                  {
                    name: item.name,
                    phone: item.phone,
                    address: item.address,
                    rating: handleRating(Number(rating)/size ? Number(rating)/size : ''),
                    ratingNumber: Number(rating)/size ? Number(rating)/size : 0,
                    status: handleButton(item.status, item.idStore),
                    statusNumber: item.status,
                    size: size,      
                  }
              ])
            })
        })
    });
  }

  React.useEffect(() => {
    getData()
  },[])

  const handleChangeStatus = (event) => {   
    // 0: chua kich hoat
    // 1: kich hoat
    // 2: tat ca
    setStatus(event.target.value);
    setRows([])
    const newData = rowsTemp.filter(item => {
      if(event.target.value == 2) {
        return item
      } else {
        return item.statusNumber == event.target.value
      }
    })
    setRows(newData)
    // newData.map(item => {
    //   setRows(previous => [
    //       ...previous,
    //       createData(item.name, item.phone, item.address, null, handleButton(item.status)),
    //   ])
      
    // })
  };
  

  const handleChangeRating = async (data, value) => {
    setRating(value)
    setRows([])
    if(value == 1) {
      const newData = await data.sort((a, b) => {
        return a.ratingNumber- b.ratingNumber
      })
      console.log(newData);
      setRows(newData)
    } else if(value == 0) {
      const newData = await data.sort((a, b) => {
        return b.ratingNumber - a.ratingNumber
      })
      setRows(newData)
    } else {
      setRows(rowsTemp)
    }
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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormControl className={classes1.formControl}>
          <InputLabel id="demo-simple-select-label">Đánh giá</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rating}
            onChange={(e) => handleChangeRating(rows, e.target.value)}
          >
            <MenuItem value={2}>Tất cả</MenuItem>
            <MenuItem value={1}>Đánh giá tăng dần</MenuItem>
            <MenuItem value={0}>Đánh giá giảm dần</MenuItem>
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

