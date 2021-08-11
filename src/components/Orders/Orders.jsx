import {
  Divider,
  ListItemText,
  Grid,
  Typography,
  Paper,
  ButtonBase,
  Box,
  Button,
  Icon,
} from "@material-ui/core";
import { AddShoppingCart, ClearTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import "./style.css";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Orders = ({ onAddToCart }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser?.uid)
        .collection("products")
        .onSnapshot((snapshot) => {
          const orderData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(orderData);
        });
    }
  }, [currentUser]);

  const deleteOrder = (deleteOrder, checkoutId) => {
    console.log(checkoutId);
    if (orders) {
      const docRef = db
        .collection("users")
        .doc(currentUser?.uid)
        .collection("products");

      docRef
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            snapshot.forEach((doc) => {
              // console.log(doc.id, "=>", doc.data());
              // doc is a DocumentSnapshot with actual data
              // const data = doc.data();÷
              const results = doc
                .data()
                .billingDetails.filter(
                  (order) =>
                    order.id !== deleteOrder || doc.data().id !== checkoutId
                );
              // const deleteDoc =  db.collection("users")
              // .doc(currentUser?.uid).collection('products').doc(doc.id).delete()
              // console.log(deleteDoc);

              db.collection("users")
                .doc(currentUser?.uid)
                .collection("products")
                .doc(doc.id)
                .update({
                  billingDetails: results,
                });
            });
          }
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    }
  };

  let orderName = [];

  if (orders && orders.length > 0) {
    orderName = orders.map((order) => {
      let billingOrders = order.billingDetails.map((items) => ({
        id: items.id,
        name: items.name,
        price: items.line_total.formatted_with_symbol,
        media: items.media.source,
        quanitity: items.quantity,
        checkoutTotal: order.total,
        date: order.date,
        productId: items.product_id,
        checkoutId: order.id,
      }));

      return (
        <>
          <div className={classes.root}>
            {billingOrders.map((order) => (
              <Paper className={classes.paper} style={{ margin: "25px" }}>
                <Grid className={classes.root}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item xs={6}>
                      <Box>
                        <Typography key={order.name}>{order.name} </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={5}>
                      <Box item textAlign="right">
                        <Grid item textAlign="right">
                          <Icon
                            onClick={() =>
                              deleteOrder(order.id, order.checkoutId)
                            }
                          >
                            <ClearTwoTone />
                          </Icon>
                        </Grid>
                        <Grid item>
                          <ListItemText
                            className="orderIdText"
                            key={order.id}
                            secondary={" ORDER # " + order.id}
                          />
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Box pt={2}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase className={classes.image}>
                          <img
                            alt="Product"
                            key={order.media}
                            src={order.media}
                            className={classes.img}
                          />
                        </ButtonBase>
                      </Grid>

                      <Grid item xs={12} sm container>
                        <Box className={classes.orderBox}>
                          <ListItemText
                            className="orderNameText"
                            key={order.date}
                            primary="ORDER PLACED"
                            secondary={order.date}
                          />
                          <ListItemText
                            className="orderNameText"
                            key={order.quanitity}
                            primary="QTY"
                            secondary={order.quanitity}
                          />
                          <Grid item>
                            <ListItemText
                              className="orderNameText"
                              key={order.price}
                              primary="TOTAL"
                              secondary={order.price}
                            />
                          </Grid>
                          <Box>
                            <Grid item>
                              <Button
                                className={classes.buyAgainBtn}
                                variant="outlined"
                                aria-label="Add to Cart"
                                key={order.productId}
                                onClick={() => onAddToCart(order.productId, 1)}
                                startIcon={<AddShoppingCart />}
                              >
                                Buy it Again
                              </Button>
                            </Grid>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Paper>
            ))}
          </div>
        </>
      );
    });
  }

  return (
    <div style={{ marginTop: "125px" }}>
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Orders
      </Typography>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        {orderName}
      </Grid>
    </div>
  );
};

export default Orders;
