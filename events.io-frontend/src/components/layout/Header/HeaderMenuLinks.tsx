import React from 'react';
import Link from 'next/link'

import styles from './Header.module.scss';

interface HeaderMenuLinksProps {
  links: Link[];
}

interface Link {
  name: string;
  url: string;
}

const HeaderMenuLinks: React.FC<HeaderMenuLinksProps> = (props) => {
  const { links = [] } = props;
  return (
    <div className={styles.headerMenuLinksContainer}>
      <ul className={styles.headerMenuLinks}>
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.url} prefetch={true} className=''>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderMenuLinks;
