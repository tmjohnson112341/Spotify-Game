
import React from 'react'
import styles from "./Win.module.css";
import { Link } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

const Win =  ({setIsOpen}) => {

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          </div>
          <div className={styles.modalContent}>
            <h1>YOU WIN!</h1>
           Do you want to play again?
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.winButton} onClick={() => window.location.reload()}>
                Yes
              </button>
              <Link to="/">
              <button className={styles.winButton}>
                New Game
              </button>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Win