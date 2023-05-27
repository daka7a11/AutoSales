import styles from "./Container.module.css";

const Main = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Main;
