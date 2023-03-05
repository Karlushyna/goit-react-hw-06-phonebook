import { useDispatch, useSelector } from "react-redux";
import { getFilter } from "redux/selectors";
import { setFilter } from "redux/actions";

import styles from "./filter.module.css";

export const Filter = () => {
const dispatch = useDispatch();
const filter = useSelector(getFilter);

const handleChange = e => {
  dispatch(setFilter(e.target.value));
};
return (
  <div>
    <label className={styles.filterLabel}>Find contacts by Name </label>
    <input
        className={styles.filterName}
        type="text"
        name="filter"
        placeholder="Enter filter"
        value={filter}
        onChange={handleChange}
    />
  </div>
)


}


// export const Filter = ({ filter, handleChange }) => (
//     <div>
//     <label className={styles.filterLabel}>Find contacts by Name </label>
//     <input
//         className={styles.filterName}
//         type="text"
//         name="filter"
//         placeholder="Enter filter"
//         value={filter}
//         onChange={handleChange}
//     />
//   </div>
// );

// Filter.propTypes = {
//   filter: propTypes.string.isRequired,
//   handleChange: propTypes.func.isRequired,
// };