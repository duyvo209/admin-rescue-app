import React from "react";
import "./styles.css";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ReactStars from "react-rating-stars-component";
import { db } from "../../firebase";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const columns = [
  { id: 'storeId', label: 'Cửa hàng' }
]

function createData(name) {
  return { name };
}

export default function App() {
  const classes = useStyles();
  const [store, setStore] = React.useState([]);
  const [comment, setComment] = React.useState([]);
  const [activeStore, setActiveStore] = React.useState('');

  const getData = () => {
    db.collection('store').get().then( snapshot => {
      const feedback = []
      snapshot.forEach(doc => {
        const data = doc.data()
        feedback.push(data)
      })
      setStore(feedback);
    })
  }

  const getListFeedback = (id) => {
    setActiveStore(id);
    db.collection('feedback').where('storeId', '==', id).orderBy('time', 'desc').get().then( snapshot => {
      const feedback = []
      snapshot.forEach(doc => {
        const data = doc.data()
        const uid = doc.id
        feedback.push({...data, uid})
      })
      setComment(feedback)
      console.log(feedback);
    })
  }

  const updateComment = async (uid) => {
    await db.collection('feedback').doc(uid).update({comment: 'Nội dung này đã bị ẩn'});
  }

  React.useEffect(() => {
    getData()
  }, [])
  

  return (
      <div className="comment__app">
        <div className="comment__listStore">
          <div className="title__listStore">
            <h1>Cửa hàng</h1>
            <p>Danh sách</p>
          </div>
          <div className="content__listStore">
            {
              store.map(item => (
                (
                  item.idStore == activeStore
                  ?
                  <div className="each-store-area_active"
                    onClick={() => {
                      getListFeedback(item.idStore)
                    }}
                  >
                    <p className="each-storename-area">{item.name}</p>
                  </div>   
                  :
                  <div className="each-store-area"
                    onClick={() => {
                      getListFeedback(item.idStore)
                    }}
                  >
                    <p className="each-storename-area">{item.name}</p>
                  </div>  
                )
              ))
            }     
          </div>
        </div>
        <div className="comment__commentStore">
          <div className="title__listStore">
            <h1>Bình luận</h1>
            <p>Danh sách</p>
          </div>
          <div className="content__commentStore">
            {comment.map((item) => (
              <div className="content__area">
                <img src={item.user_info.image} />

                <div className="content">
                  <div className="nameUser">
                    <h3>{item.user_info.name}</h3>
                  </div>
                  <div className="commentUser">
                    <div className="__dateAndCancel">
                      <p>{item.time.toString().substring(0, 10).split('-').reverse().join('/')}</p>
                      <CloseIcon
                        style={{ "font-size": "16px", cursor: "pointer" }}
                        onClick={() => updateComment(item.uid)}
                      />
                    </div>
                    <div className="__rating">
                      <ReactStars
                        {...{
                          size: 25,
                          value: item.rating,
                          edit: false,
                          isHalf: true
                        }}
                      />
                    </div>
                    <div className="__comment">
                      {
                        item.comment == 'Nội dung này đã bị ẩn'
                        ? <p style={{color: 'red'}}>{item.comment}</p>
                        : <p>{item.comment}</p>        
                      }                                
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
