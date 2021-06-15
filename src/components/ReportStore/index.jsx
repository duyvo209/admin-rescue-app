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

export default function App() {
  const classes = useStyles();
  const [report, setReport] = React.useState([]);

  const getListReport = () => {
    db.collection('report').orderBy('time', 'desc').get().then( snapshot => {
      const report = []
      snapshot.forEach(doc => {
        const data = doc.data()
        const uid = doc.id
        report.push({...data, uid})
      })
      setReport(report)
      console.log(report);
    })
  }

  const deleteReport = async (uid) => {
    await db.collection('report').doc(uid).delete()
  }

  React.useEffect(() => {
    getListReport()
  }, [])
  

  return (
      <div className="comment__app">
        <div className="comment__commentStore">
          <div className="title__listStore">
            <h1>Báo cáo cửa hàng vi phạm</h1>
            <p>Danh sách</p>
          </div>
          <div className="content__commentStore">
            {report.map((item) => (
              item.report != null ? 
              <div className="content__area">
                <img  src={'./user.png'} />

                <div className="content">
                  <div className="nameUser">
                    <h3 style={{color: "red"}}>Báo cáo ẩn danh</h3>
                  </div>
                  <div className="commentUser">
                    <div className="__dateAndCancel">
                      <p>{item.time.toString().substring(0, 10).split('-').reverse().join('/')}</p>
                      <CloseIcon
                        style={{ "font-size": "16px", cursor: "pointer" }}
                        onClick={() => deleteReport(item.uid)}
                      />
                    </div>
                    <div className="__rating">
                    <br/>
                    <p>Cửa hàng: {item.store_name}</p>
                    </div>
                    <div className="__comment">
                        <p>Nội dung báo cáo: {item.report}</p>
                    </div>
                  </div>
                </div>
              </div>
              : <div></div>
            ))}
          </div>
        </div>
      </div>
  );
}
