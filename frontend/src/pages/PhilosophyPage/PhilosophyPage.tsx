import React from 'react';
import './PhilosophyPage.scss';

export const PhilosophyPage = React.memo(() => {
  return (
    <div className="PhilosophyPage">
      <div className="PhilosophyPage__content">
        <div className="PhilosophyPage__main">
          <p className="PhilosophyPage__main-text">
            The philosophy of Dryg begins in childhood, as it is during those
            early years that we feel the shoulder of a friend who leads us into
            crazy adventures and begs us not to tell our moms.
          </p>
          <p className="PhilosophyPage__main-text">
            It is then that a special connection and understanding begin to
            emerge, where you truly become yourself.
          </p>
          <p className="PhilosophyPage__main-text">
            It is during those times that the first secrets appear, and memories
            are born that will warm the heart throughout life.
          </p>
          <p className="PhilosophyPage__main-text">
            As you grow older, priorities change, but the emphasis always
            remains on what truly matters — people who stand by you in any
            circumstance, weather, and passage of time.
          </p>
        </div>
        <p className="PhilosophyPage__moto">
          THESE ARE YOUR FRIENDS. APPRECIATE THEM AND REMEMBER THAT FRIENDSHIP
          NEVER GOES OUT OF STYLE.
        </p>
        <p className="PhilosophyPage__message">
          With love, the founders of the brand, Alexander and Mari
        </p>
        <div className="PhilosophyPage__logo"></div>
      </div>

      <div className="PhilosophyPage__photo"></div>
    </div>
  );
});
