import pic from "./user.png";
import { Link } from "react-router-dom";
import List from "./List";
import "./rightbar.css";
function Rightbar() {
  const datas = [
    {
      id: 1,
      name: "Abhishek",
      image:"https://miro.medium.com/max/600/1*PiHoomzwh9Plr9_GA26JcA.png",
    },
    {
      id: 2,
      name: "Abhay",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU",
    },
    {
      id: 3,
      name: "Manjeet",
      image:
        "https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg",
    },
    {
      id: 4,
      name: "Aysuh",
      image: "https://miro.medium.com/max/600/1*PiHoomzwh9Plr9_GA26JcA.png",
    },
    {
      id: 5,
      name: "Aaksh",
      image: "https://miro.medium.com/max/600/1*PiHoomzwh9Plr9_GA26JcA.png",
    },
    
    
  ];
  return (
    <div className="rightBar right" style={{ height: "500px" }}>
      <div className="Card" style={{ height: "auto" }}>
        <div class="topnav">
          <input type="text" className="search" placeholder="Search Friends..." />
        </div>

        <div>
          {datas.map((data) => {
            return <List data={data} key={data.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
