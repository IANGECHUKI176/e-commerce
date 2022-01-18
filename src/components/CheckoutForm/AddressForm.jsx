import { useForm, FormProvider } from "react-hook-form";
import {
  Grid,
  Typography,
  Button,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import {Link} from 'react-router-dom'
import FormInput from "./CustomTextField";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import useStyles from './styles'
const AddressForm = ({ checkoutToken ,next}) => {
  const classes=useStyles()
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const option = await commerce.checkout.getShippingOptions(checkoutTokenId, {
      country,
      region,
    });
    setShippingOptions(option);
    setShippingOption(option[0].id);
  };
  const countries = Object.entries(shippingCountries).map(
    ([code, country]) => ({ id: code, label: country })
  );
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, country]) => ({ id: code, label: country })
  );
  const options = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - ${option.price.formatted_with_symbol}`,
  }));
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);
  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);
  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    }
  }, [shippingSubdivision]);
  return (
    <>
      <Typography>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            (data) =>
              next({
                ...data,
            shippingCountry,
            shippingSubdivision,
            shippingOption,
            }),
           
          )}
        >
          <Grid container spacing={3}>
            <FormInput name='firstName' label='First name' />
            <FormInput name='lastName' label='Last name' />
            <FormInput name='address1' label='Address' />
            <FormInput name='email' label='Email' />
            <FormInput name='city' label='City' />
            <FormInput name='zip' label='ZIP/Postal Code' />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div className={classes.buttons}>
            <Button
              component={Link}
              to='/'
              variant='outlined'
              className={classes.button}
            >
              Back to cart
            </Button>

            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
