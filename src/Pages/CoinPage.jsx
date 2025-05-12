import { Box, Typography, LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../utils/Hepler";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 2,
        alignItems: { xs: "center", md: "initial" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 3,
          borderRight: { md: "2px solid grey" },
          padding: 2,
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="160"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Montserrat",
            textAlign: "justify",
            lineHeight: 1.6,
          }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>

        <Box sx={{ width: "100%", mt: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Rank:{" "}
            <Typography component="span" variant="h5">
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
            Current Price:{" "}
            <Typography component="span" variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
            Market Cap:{" "}
            <Typography component="span" variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </Typography>
        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
