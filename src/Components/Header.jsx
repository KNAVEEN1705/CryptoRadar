import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { CryptoState } from '../CryptoContext';
import { DarkTheme } from '../utils/Theme';

const useStyles = makeStyles(() => ({
  title: {
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
    flex: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={DarkTheme}>
      <AppBar color="transparent" position="static">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 1, sm: 2 },
              paddingY: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              onClick={() => navigate('/')}
              sx={{
                color: 'gold',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                width: '100%',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Crypto Radar 🤑
            </Typography>

            <Box
              sx={{
                marginLeft: { xs: 0, sm: 'auto' },
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-end' },
              }}
            >
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  width: 100,
                  height: 40,
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                }}
              >
                <MenuItem value={'INR'}>INR</MenuItem>
                <MenuItem value={'USD'}>USD</MenuItem>
              </Select>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
