import React from 'react';
import bannerImage from '../../assets/banner2.jpg';
import { Container, Box, Typography } from '@mui/material';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: 400, md: 500 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: { xs: 3, md: 6 },
        textAlign: { xs: 'center', md: 'center' },
      }}
    >
      <Container>
        <Box
          sx={{
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
    
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Crypto Radar 💹
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: 'darkgray',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Stay Informed. Stay Invested. Stay Ahead in Crypto. 🚀
          </Typography>
        </Box>

        <Carousel />
      </Container>
    </Box>
  );
};

export default Banner;
