import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    login: {
        backgroundColor: "",
        height: '100vh',
        display: 'flex',
      
        alignItems: 'center',
        margin: "22px"
      },
    
    loginLogo: {
        marginTop: '20px',
        object_fit: 'contain',
        width: '100%',
        marginRight: '100px',
        marginLeft: '-25px',

      },
      
     loginContainer: {
        width: '300px',
        height: 'fitcontent',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
        border: '1px solid lightgray',
        padding: '20px',
      },
      
     loginContainerH1: {
        fontWeight: '400',
        marginBottom: '20px',
   
        
      },
      
    loginContainerh5: {
        marginBottom: '5px',
      },
      
     inputBox: {
        height: '30px',
        marginBottom: '10px',
        backgroundcolor: 'white',
        width: '98%',
      },
      
    p: {
        marginTop: '15px',
        fontsize: '12px',
      },
      
     loginSignInButton: {
        background: '#f0c14b',
        borderradius: '2px',
        width: '100%',
        height: '30px',
        border: '1px solid',
        marginTop: '10px',
        bordercolor: '#a88734 #9c7e31 #846a29',
      },
      
     loginRegisterButton: {
        borderradius: '2px',
        width: '100%',
        height: '30px',
        border: '1px solid',
        bordercolor: 'darkgray',
      },
}))