import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CustomButton } from '../../Button/Button';
import styles from './SPTab.module.scss';

type SeeMoreData = {
  seeMore: boolean;
  handleSeeMore: (value: boolean) => void;
};

const SeeMoreBtns = ({
  seeMore, handleSeeMore
}: SeeMoreData
) => {
  return (
    <div className={styles.see_more_btn}>
      {seeMore ? (
        <CustomButton
          variant="text"
          label="See More"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={() => handleSeeMore(false)}
        />
      ) : (
        <CustomButton
          variant="text"
          label="See Less"
          endIcon={<KeyboardArrowUpIcon />}
          onClick={() => handleSeeMore(true)}
        />
      )}
    </div>
  )
}

export default SeeMoreBtns;
