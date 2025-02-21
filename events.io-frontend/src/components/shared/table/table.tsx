'use client';
import React, { FC, useState } from 'react';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import styles from './table.module.scss';
import CheckIcon from '../icons/check';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import UserPlusIcon from '../icons/userPlus';
import TrashTimesIcon from '../icons/trashTimes';
import UserEditIcon from '../icons/userEdit';

interface IRowData {
  name: string;
  email: string;
  role: string;
  lastActive: string;
}

interface props {
  rowData: IRowData[];
}

export const Table: FC<props> = ({ rowData }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: 0 }}>
              <Typography className={styles.cellText}>Name</Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: 0 }}>
              <Typography className={styles.cellText}>Email</Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: 0 }}>
              <Typography className={styles.cellText}>Role</Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: 0 }} align="center">
              <Typography className={styles.cellText}>Last Active</Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: 0 }}>
              <Typography className={styles.cellText}>Settings</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Typography className={styles.cellText}>
                    {item.name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography className={styles.cellText}>
                  {item.email}
                </Typography>
              </TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <InputLabel
                    id="custom-select-label"
                    className={styles.baseText}
                  >
                    Employee
                  </InputLabel>
                  <Select
                    id="custom-select-label"
                    label="Employee"
                    className={styles.select}
                    MenuProps={{
                      PaperProps: {
                        className: styles.selectPaper,
                      },
                    }}
                  >
                    <MenuItem divider>
                      <Box display="block" py={2} px={2}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            color="#110C22"
                            fontSize="14px"
                            fontWeight={500}
                            lineHeight="20px"
                            gutterBottom
                          >
                            Employee
                          </Typography>
                          {item.role === 'employee' && <CheckIcon />}
                        </Stack>

                        <Typography
                          color="#110C22"
                          fontSize="10px"
                          fontWeight={400}
                          lineHeight="20px"
                          style={{ whiteSpace: 'pre-line' }}
                        >
                          Access to the dashboard and pages are given permission
                          to
                        </Typography>
                      </Box>
                    </MenuItem>

                    <MenuItem divider>
                      <Box display="block" py={2} px={2}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            color="#110C22"
                            fontSize="14px"
                            fontWeight={500}
                            lineHeight="20px"
                            gutterBottom
                          >
                            Recruiter/HR
                          </Typography>
                          {item.role === 'recruiter' && <CheckIcon />}
                        </Stack>

                        <Typography
                          color="#110C22"
                          fontSize="10px"
                          fontWeight={400}
                          lineHeight="20px"
                          style={{ whiteSpace: 'pre-line' }}
                        >
                          Can create positions and Find Candidates
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem divider>
                      <Box display="block" py={2} px={2}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            color="#110C22"
                            fontSize="14px"
                            fontWeight={500}
                            lineHeight="20px"
                            gutterBottom
                          >
                            Admin
                          </Typography>
                          {item.role === 'admin' && <CheckIcon />}
                        </Stack>

                        <Typography
                          color="#110C22"
                          fontSize="10px"
                          fontWeight={400}
                          lineHeight="20px"
                          style={{ whiteSpace: 'pre-line' }}
                        >
                          Manage positions, groups, billing, a employer settings
                        </Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Typography className={styles.cellText} align="center">
                  {item.lastActive}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
            width: '250px',
          },
        }}
      >
        <MenuItem onClick={handleClose} divider sx={{ px: 2, py: 3 }}>
          <ListItemIcon>
            <UserPlusIcon />
          </ListItemIcon>
          <ListItemText className={styles.baseText}>Set as Admin</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ px: 2, py: 3 }} divider>
          <ListItemIcon>
            <UserEditIcon />
          </ListItemIcon>
          <ListItemText className={styles.baseText}>
            Convert to Employee
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ px: 2, py: 3 }} divider>
          <ListItemIcon>
            <TrashTimesIcon />
          </ListItemIcon>
          <ListItemText className={styles.baseText}>Remove</ListItemText>
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};
