import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

function LoadingTableSkeleton() {
  const rows = Array.from(Array(50).keys()); // Number of rows in your table
  const dataCol = [1, 2, 3, 4, 5, 6, 7, 8]; // Number of rows in your table


  return (

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row}>
              {dataCol.map(col => 
                (<TableCell key={col+row}>
                <Skeleton animation="wave" />
              </TableCell>)
              )}
            </TableRow>
          ))}
        </TableBody>
  );
}

export default LoadingTableSkeleton;
