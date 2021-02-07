import React from 'react'
import Link from 'next/link'

import styles from 'components/sections/styles/HomepageHeroArea.module.scss'
import { Button } from 'components/ui'

const HomepageHeroArea = () => {
  return (
    <section className={styles['hero-area']}>
      <div className={styles['title-container']}>
        <h1 className={styles.title}>This is Planster</h1>
        <h2 className={styles.subtitle}>All-in-one solution for personal organization</h2>
        <Link href="/auth/register">
          <a>
            <Button
              type="primary"
              className="mt-10"
              size="lg">
              Join Now
          </Button>
          </a>
        </Link>
      </div>
    </section>
  )
}

export default HomepageHeroArea
