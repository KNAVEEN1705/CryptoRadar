import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../..//src/CryptoContext'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

const Carousel = () => {
  const [trending, setTrending] = useState([])
  const { currency, symbol } = CryptoState()

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0

    return (
      <Link 
      to={`/coins/${coin.id}`} 
      key={coin.id} 
      style=
      {{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
        <img 
        src={coin?.image} 
        alt={coin?.name} 
        height="80" 
        style={{ marginBottom: 10 }} />
        <span>{coin?.symbol.toUpperCase()} &nbsp;
          <span style={{ color: profit ? 'rgb(14, 203, 129)' : 'red', fontWeight: 500 }}>
            {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {Number(coin?.current_price).toLocaleString()}
        </span>
      </Link>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  }

  return (
    <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  )
}

export default Carousel
