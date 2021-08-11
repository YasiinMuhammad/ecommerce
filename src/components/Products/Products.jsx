import { Button, Container, Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import Product from "./Product/Product";
import useStyles from "./styles";
import headerImage1 from "../../assets/headerImage1.jpg";
import headerImage2 from "../../assets/headerImage2.jpg";
import headerImage3 from "../../assets/headerImage3.jpg";
import headerImage4 from "../../assets/headerImage4.jpg";

const Products = ({ categories, onAddToCart }) => {
  const classes = useStyles();
  const [selectedProducts, setSelcetedProducts] = useState("Featured Products");

  function getProducts(selectedProducts) {
    if (selectedProducts === selectedProducts) {
      return (
        <>
          {categories.map((category) => {
            return (
              <>
                {category.productsData.map((product) => {
                  if (category.name === selectedProducts) {
                    return (
                      <>
                        <Grid key={product.id} item xs={8} sm={6} md={4} lg={3}>
                          <Product
                            product={product}
                            onAddToCart={onAddToCart}
                          />
                        </Grid>
                      </>
                    );
                  }
                })}
              </>
            );
          })}
        </>
      );
    }
  }

  var items = [
    {
      image: headerImage1,
    },
    {
      image: headerImage2,
    },
    {
      image: headerImage3,
    },
    {
      image: headerImage4,
    },
  ];

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
              <img
                alt=""
                key={item}
                src={item.image}
                className={classes.carouselImage}
              />
            ))}
          </Carousel>
        </Container>
      </Grid>
      <Container alignItems="center" justify="center">
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Button
              type="button"
              className={classes.searchButton}
              variant="outlined"
              onClick={(e) => {
                setSelcetedProducts("Kitchen");
              }}
            >
              KITCHEN
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              className={classes.searchButton}
              variant="outlined"
              onClick={(e) => {
                setSelcetedProducts("Clothing");
              }}
            >
              Clothing
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              className={classes.searchButton}
              variant="outlined"
              onClick={(e) => {
                setSelcetedProducts("Electronics");
              }}
            >
              Electronics
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              className={classes.searchButton}
              variant="outlined"
              onClick={(e) => {
                setSelcetedProducts("Furniture");
              }}
            >
              FURNITURE
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              className={classes.searchButton}
              variant="outlined"
              onClick={(e) => {
                setSelcetedProducts("Bath");
              }}
            >
              Bath
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <br />
        <Divider />
        <br />

        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
        >
        
          {getProducts(selectedProducts)}
        </Grid>
      </Container>
    </main>
  );
};

export default Products;
