import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

let isStatus = 10;

export default function SimpleSelect() {
  const classes = useStyles();
  const [status, setStatus] = React.useState('');
  const [rating, setRating] = React.useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    isStatus = event.target.value
  };
  

  const handleChangeRating = (event) => {
      setRating(event.target.value);
  }

  const changeStatus = () => {
      db.collection('store').where('status', '==', 1).get().then(snapshot => {
          const status = [];
          snapshot.forEach(doc => {
              const data = doc.data();
              status.push(data);
          });
          console.log(status);
      });
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          onChange={handleChangeStatus}
        >
          <MenuItem value={10}>Tất cả</MenuItem>
          <MenuItem value={20}>Kích hoạt</MenuItem>
          <MenuItem value={30}>Chưa kích hoạt</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
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

export {isStatus}
