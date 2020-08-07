import React, { Fragment } from 'react';
import acorn from './../assets/acorn.png';

const Header = () => {
  return (
    <Fragment>
      <div style={styles.navbar}>
        <img style={styles.img} src={acorn} alt="acorn" />
        <p style={styles.text}>Acorn Stairlifts</p>
        <p style={styles.text}>Admin</p>
      </div>
    </Fragment>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#3ec4ff",
    height: "200px",
    overflow: "hidden"
  },
  text: {
    margin:"0",
    color: "white",
    fontSize: "40px"
  },
  img: {
    height:"100px",
    margin: "0"
  }
};

export default Header;