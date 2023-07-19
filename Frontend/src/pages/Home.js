import React from "react";



const Home = () => {
    const user = localStorage.getItem('userName');

    return user ? (
      <div className="pt-5">
        <h1 className="text-center">Welcome {user}, to TO-DO list App</h1>
      </div>
    ) : (
      <div className="pt-5">
        <h1 className="text-center">Welcome User, to TO-DO list App</h1>
      </div>
    );
    
};

export default Home;
