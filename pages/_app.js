import '../styles/globals.css'

//Internal import 

import {ToDoListProvider} from '../context/ToDoListApp';

const MyApp = ({ Component, pageProps }) => (

  <ToDoListProvider>
    <div>
       <Component {...pageProps} />
    </div>   
  </ToDoListProvider>
);


export default MyApp
