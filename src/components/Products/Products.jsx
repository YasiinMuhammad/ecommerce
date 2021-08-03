import React from "react";
import { Grid, TextField, Button, Container } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  const [productSearch, setProductSearch] = useState("");

  var items = [
    {
      url: "https://m.media-amazon.com/images/G/01/AMAZON_FASHION/2021/SITE_FLIPS/SPR_1/SND/desktop/Deals_Header_DT._CB656338822_.jpg",
    },
    {
      url: "https://m.media-amazon.com/images/G/01/AMAZON_FASHION/2021/CVP_SUM/BROWSE-HEADER/DT_BROWSE_Feature-Card_CML_GENERIC_2._CB1198675309_.jpg",
    },
    {
      url: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/CVP_SUM/BROWSE-HEADER/DT_BROWSE_Feature-Card_CML_Home-Kitchen_2.jpg",
    },
    {
      url: "https://m.media-amazon.com/images/G/01/AMAZON_FASHION/2021/CVP_SUM/BROWSE-HEADER/DT_BROWSE_Feature-Card_CML_Active_W_1.jpg",
    },
  ];

  // products.map((item) => {
  //   console.log(item.media.source);
  //   return item.media.source;
  // });

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container direction="row" alignContent="center">
        <Container className={classes.carouselContainer}>
          <Carousel
            className={classes.carousel}
            indicatorIconButtonProps={{
              style: {
                color: "transparent",
              },
            }}
          >
            {items.map((item, i) => (
              <img alt="" key={i} src={item.url} className={classes.carouselImage} />
            ))}
          </Carousel>
        </Container>
      </Grid>
      <Container>
        <Grid
          container
          direction="row"
          justify="center"
        
        >
          <Grid item xs>
            <Button className={classes.searchButton} variant="outlined">
              KITCHEN
            </Button>
          </Grid>
          <Grid item xs>
            <Button className={classes.searchButton} variant="outlined">
              BED
            </Button>
          </Grid>
          <Grid item xs>
            <Button className={classes.searchButton} variant="outlined">
              BATH
            </Button>
          </Grid>
          <Grid item xs>
            <Button className={classes.searchButton} variant="outlined">
              FURNITURE
            </Button>
          </Grid>
          <Grid item xs>
            <Button className={classes.searchButton} variant="outlined">
              HOME DECOR
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Grid
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <form className={classes.searchBar} noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="outlined-full-width"
            style={{ margin: 8 }}
            placeholder="Search"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            datalist="#products"
            onChange={(e) => {
              setProductSearch(e.target.value);
            }}
          />
        </form>
      </Grid>
      <br />

      <Grid container justify="center" spacing={4}>
        {products
          .filter((value) => {
            if (productSearch === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(productSearch.toLowerCase())
            ) {
              return value.name;
            }
          })
          .map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default Products;
