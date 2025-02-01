import Home from "../Component/Dashboard/Home";
import NavBar from "../Component/Dashboard/NavBar";
const HomePage = () => {
    return (
        <div className="d-flex flex-column px-1 pt-3 pt-lg-5 bg-light">
        <div className="d-none d-md-block">
        <NavBar />
        </div>
        <div className="flex-grow-1 d-lg-flex">
        <Home />
        </div>
        </div>
         );
};
export default HomePage