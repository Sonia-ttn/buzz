import pic from "./user.png";
import { useEffect ,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import List from "./List";
import "./rightbar.css";
function Rightbar() {
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    try {
      const url = "http://localhost:5000/getallusers";
      const head = "12 " + localStorage.getItem("token");
      const  user  = await axios.get(url, {
        headers: {
          tokn: head,
        },
      });

    //  console.log(post);
      
      setData(user.data)
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAllUsers();
    
  }, []);
  
  return (
    <div className="rightBar right" style={{ height: "auto" }}>
      <div className="Card" style={{ height: "auto" }}>
        <div class="topnav">
          <input type="text" className="search" placeholder="Search Friends..." />
        </div>

        <div>
          {data.map((item) => {
            return <List item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
