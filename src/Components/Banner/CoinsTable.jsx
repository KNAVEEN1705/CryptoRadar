import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../../config/api';
import { CryptoState } from '../../..//src/CryptoContext';
import { ThemeProvider } from '@emotion/react';
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../../..//src/App.css";
import { numberWithCommas } from '../../utils/Hepler';

const CoinsTable = () => {
  const [coins, setCoins] = useState([""]);
  const [loading, setLoading] = useState();
  const { currency, symbol } = CryptoState();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);
  const naviagate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter((coin) =>
      (coin.name && coin.name.toLowerCase().includes(search.toLowerCase())) ||
      (coin.symbol && coin.symbol.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const Darkthem = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={Darkthem}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Top Cryptocurrencies by Market Capitalization
        </Typography>

        <TextField
          label="Start Typing to Discover Coins...🔎"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            marginBottom: 2,
            width: "100%",
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontFamily: "Montserrat",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((pagination - 1) * 10, (pagination - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row?.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => naviagate(`/coins/${row.id}`)}
                        key={row.id}
                        className="row"
                      >
                        <TableCell
                          sx={{ display: "flex", gap: 3 }}
                          component="th"
                          scope="row"
                        >
                          <img
                            src={row?.image}
                            alt={row?.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              color: "white",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row?.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row?.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align="right" sx={{ color: "white" }}>
                          {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right" sx={{ color: "white" }}>
                          {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(handleSearch()?.length / 10)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
          }}
          onChange={(_, value) => {
            setPagination(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
