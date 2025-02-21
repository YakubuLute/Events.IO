export const tableStyles = {
  table: {
    '& .MuiTableCell-root': {
      border: 'none',
    },
  },
  tableHead: { borderBottom: '2px solid #ECECED' },
  firstName: {
    head: {
      fontSize: { xs: '11px', lg: '14px' },
      textTransform: { xs: 'uppercase', lg: 'unset' },
    },
    body: {
      color: {
        xs: 'blue !important',
        md: '#110c22 !important',
      },
    },
  },
  lastName: {
    head: {
      fontSize: { xs: '11px', lg: '14px' },
      textTransform: { xs: 'uppercase', lg: 'unset' },
    },
    body: {
      color: {
        xs: 'blue !important',
        md: '#110c22 !important',
      },
    },
  },
  employeeId: {
    head: {
      display: {
        xs: 'none',
        md: 'table-cell',
      },
      fontSize: { xs: '11px', lg: '14px' },
      textTransform: { xs: 'uppercase', lg: 'unset' },
    },
    body: {
      display: {
        xs: 'none',
        md: 'table-cell',
      },
    },
  },
  duration: {
    head: {
      display: {
        xs: 'none',
        md: 'table-cell',
        lg: 'table-cell',
        xl: 'table-cell',
      },
      fontSize: { xs: '11px', lg: '14px' },
      textTransform: { xs: 'uppercase', lg: 'unset' },
    },
    body: {
      display: {
        xs: 'none',
        md: 'table-cell',
        lg: 'table-cell',
        xl: 'table-cell',
      },
    },
  },
  position: {
    head: {
      fontSize: { xs: '11px', lg: '14px' },
      textTransform: { xs: 'uppercase', lg: 'unset' },
    },
  },
  status: {
    head: {
      display: {
        xs: 'none',
        sm: 'table-cell',
      },
      fontSize: { xs: '11px', lg: '14px' },
      textTransform: { xs: 'uppercase', lg: 'unset' },
    },
    body: {
      display: {
        xs: 'none',
        sm: 'table-cell',
      },
    },
  },
  decline: {
    body: {
      display: {
        xs: 'table-cell',
        sm: 'none',
      },
    },
  },
};
