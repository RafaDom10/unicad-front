// ----------------------------------------------------------------------

export default function Paper(_theme: any) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 0,
          '&:focus-visible': { outline:'none' }
        }
      }
    }
  };
}
