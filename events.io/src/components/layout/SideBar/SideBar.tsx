'use client'

import React from 'react'
import { TextInput, Select } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import classes from './sidebar.module.scss'

export default function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.layout}>
      <div className={classes.sidebar}>
        <h2 className={classes.title}>Events</h2>
        
        {/* Search */}
        <div className={classes.searchContainer}>
          <TextInput
            placeholder="Search"
            leftSection={<IconSearch size={16} color="#999" />}
            classNames={{ root: classes.searchInput }}
            size="md"
          />
        </div>
        
        {/* When Filter */}
        <div className={classes.filterSection}>
          <div className={classes.filterLabel}>When</div>
          <Select
            placeholder="Select When"
            data={[
              { value: 'today', label: 'Today' },
              { value: 'tomorrow', label: 'Tomorrow' },
              { value: 'this-week', label: 'This Week' },
              { value: 'this-month', label: 'This Month' }
            ]}
            classNames={{ root: classes.selectInput }}
            size="md"
          />
        </div>
        
        {/* Event Type Filter */}
        <div className={classes.filterSection}>
          <div className={classes.filterLabel}>Event Type</div>
          <Select
            placeholder="Select Event Type"
            data={[
              { value: 'conference', label: 'Conference' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'seminar', label: 'Seminar' },
              { value: 'networking', label: 'Networking' }
            ]}
            classNames={{ root: classes.selectInput }}
            size="md"
          />
        </div>
        
        {/* Event Categories Filter */}
        <div className={classes.filterSection}>
          <div className={classes.filterLabel}>Event Categories</div>
          <Select
            placeholder="Select Category"
            data={[
              { value: 'technology', label: 'Technology' },
              { value: 'business', label: 'Business' },
              { value: 'education', label: 'Education' },
              { value: 'entertainment', label: 'Entertainment' }
            ]}
            classNames={{ root: classes.selectInput }}
            size="md"
          />
        </div>
        
        {/* Location Filter */}
        <div className={classes.filterSection}>
          <div className={classes.filterLabel}>Location</div>
          <Select
            placeholder="Country"
            data={[
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'ca', label: 'Canada' },
              { value: 'au', label: 'Australia' }
            ]}
            classNames={{ root: classes.selectInput }}
            size="md"
          />
        </div>
        
        {/* State and City */}
        <div className={classes.locationRow}>
          <Select
            placeholder="State"
            data={[
              { value: 'ny', label: 'New York' },
              { value: 'ca', label: 'California' },
              { value: 'tx', label: 'Texas' },
              { value: 'fl', label: 'Florida' }
            ]}
            classNames={{ root: classes.halfWidth }}
            size="md"
          />
          <Select
            placeholder="City"
            data={[
              { value: 'nyc', label: 'New York City' },
              { value: 'la', label: 'Los Angeles' },
              { value: 'chicago', label: 'Chicago' },
              { value: 'houston', label: 'Houston' }
            ]}
            classNames={{ root: classes.halfWidth }}
            size="md"
          />
        </div>
        
        {/* Sort By */}
        <div className={classes.filterSection}>
          <div className={classes.filterLabel}>Sort By</div>
          <Select
            placeholder="Sort By"
            data={[
              { value: 'date-asc', label: 'Date (Ascending)' },
              { value: 'date-desc', label: 'Date (Descending)' },
              { value: 'popularity', label: 'Popularity' },
              { value: 'price-asc', label: 'Price (Low to High)' },
              { value: 'price-desc', label: 'Price (High to Low)' }
            ]}
            classNames={{ root: classes.selectInput }}
            size="md"
          />
        </div>
        
        {/* Event Status Buttons */}
        <a href="#" className={`${classes.eventTypeButton} ${classes.activeButton}`}>
          Upcoming Events
        </a>
        <a href="#" className={classes.eventTypeButton}>
          Attending Events
        </a>
        <a href="#" className={classes.eventTypeButton}>
          Past Events
        </a>
        
        {/* Clear Button */}
        <button className={classes.clearButton}>
          Clear
        </button>
      </div>
      
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}