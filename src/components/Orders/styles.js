
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: "600px",
    maxHeight: '675px'
  },image: {
    width: 'auto',
    height: '200px',
  },
  img: {
    
    maxWidth: '100%',
    maxHeight: '100%',
  },
  buyAgainBtn: {
    backgroundColor: "#f6f6f6",
    color: 'black',
    width: '200px',
    marginTop: '15px'
  },
  orderBox:{
    height: "200px"
  }

}));
