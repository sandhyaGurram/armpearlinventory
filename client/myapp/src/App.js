import './App.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Routing from './Routing';
import 'datatables.net-dt/css/dataTables.dataTables.css'
import 'datatables.net-dt/js/dataTables.dataTables.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  return (
    <div className="App">
      <Header />
      <Routing />
      <Footer />
    </div>
  );
}

export default App;
