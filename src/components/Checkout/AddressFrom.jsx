import {
  Grid,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  Button,
  
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { commerece} from "../../lib/commerce";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";

const AddressFrom = ({ checkoutToken , next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();
   
    const fetchShippingCountries = async (checkoutToken) => {
      const { countries } = await commerece.services.localeListShippingCountries(checkoutToken);
  
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    };
  
    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerece.services.localeListSubdivisions(countryCode);
  
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    };
  
    const fetchShippingOptions = async (checkoutToken, country, stateProvince = null) => {
      const options = await commerece.checkout.getShippingOptions(checkoutToken, { country, region: stateProvince });
  
      setShippingOptions(options);
      setShippingOption(options[0].id);
    };
  
    useEffect(() => {
      fetchShippingCountries(checkoutToken.id);
    });
  
    useEffect(() => {
      if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);
  
    useEffect(() => {
      if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);
  
    return (
      <>
        <Typography variant="h6" gutterBottom>Shipping address</Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
            <Grid container spacing={3}>
              <FormInput required name="firstName" label="First name" type="text"/>
              <FormInput required name="lastName" label="Last name" type="text" />
              <FormInput required name="address1" label="Address line 1" type="text"/>
              <FormInput required name="email" label="Email" type="text"/>
              <FormInput required name="city" label="City" type="text"/>
              <FormInput required name="zip" label="Zip / Postal code" type="text"/>
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                  {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Subdivision</InputLabel>
                <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                  {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Options</InputLabel>
                <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                  {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
              <Button type="submit" variant="contained" color="primary">Next</Button>
            </div>
          </form>
        </FormProvider>
      </>
    );
  };


export default AddressFrom;
