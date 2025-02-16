import Logo from '@/components/auth/shared/icons/logo';
import styles from './logoTopBar.module.scss';

export const LogoTopBar = () => {
  return (
    <div className={styles.header_top}>
      <div className={styles.header_conatiner}>
        <div className={styles.logo}>
          <Logo />
        </div>
      </div>
    </div>
  )
}
