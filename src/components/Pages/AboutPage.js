import React, { useRef } from "react";
import classes from '../AddMovie.module.css'

const AboutPage = () => {
  const NameRef = useRef();
  const EmailRef = useRef();
  const PhoneRef = useRef();

  const onSaveDetails = async (e) => {
    e.preventDefault();

    const UserDetails = {
      name: NameRef.current.value,
      email: EmailRef.current.value,
      phone: PhoneRef.current.value,
    };
    if (UserDetails.name && UserDetails.email && UserDetails.phone) {
      const res = await fetch(
        "https://sending-http-78534-default-rtdb.asia-southeast1.firebasedatabase.app/aboutPage.json",
        {
          method:'POST',
          body: JSON.stringify(UserDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const details = await res.json();
      NameRef.current.value='';
      EmailRef.current.value='';
      PhoneRef.current.value='';
      console.log(details);
    }
  };

  return (
    <section>
      <h3>Contact Us </h3>
    <form onSubmit={onSaveDetails}>
      <div className={classes.control}>
        <label htmlFor="name">UserName</label>
        <input type="text" id="name" ref={NameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="email">UserEmail</label>
        <input type="email" id="email" ref={EmailRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="phone">UserPhone</label>
        <input type="tel" id="phone" ref={PhoneRef} />
      </div>

      <button type="submit">Submit</button>
    </form>
    </section>
  );
};

export default AboutPage;
