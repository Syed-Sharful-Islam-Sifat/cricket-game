import React from "react";
import styles from "../game-start/game.module.css";
import Link from "next/link";
const Game = () => {
  return (
    <div className={styles.play}>
      <div className={styles.title}>
        <h2 className={styles.title_text}>Virtual Cricket Game 2023</h2>
        <Link href={"/teamselect"}>
          <button>Play</button>
        </Link>
      </div>
    </div>
  );
};

export default Game;
