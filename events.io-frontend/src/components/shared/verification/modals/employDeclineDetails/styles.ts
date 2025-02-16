export const declineStyles = {
  wrapperStyle: {
    justifyContent: { xs: 'flex-start', lg: 'flex-end' },
    padding: { xs: '12px 12px', lg: '24px 24px' },
    backgroundColor: { xs: 'white', lg: 'unset' },
    marginBottom: { xs: '20px', lg: '0px' },
  },
  submitStyle: (input) => ({
    position: { xs: 'fixed', lg: 'static' },
    width: { xs: '100%', lg: '160px' },
    borderRadius: { xs: '0px', lg: '12px' },
    backgroundColor: input === '' ? '#E2E2E4' : '#0C27BE',
    color: input === '' ? '#B3B1B8' : 'white',
  }),
  modalViewStyle: (declineDetailsOpen) => ({
    display: { xs: 'flex', lg: 'none' },
    transform: declineDetailsOpen ? 'translateY(0)' : 'translateY(100vh)',
    transition: 'transform 0.5s',
  }),
};
