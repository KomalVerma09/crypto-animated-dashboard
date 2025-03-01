import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import Title from "../components/Title";
import { section10Content } from "../utils/content";

const { SOCIALS } = section10Content;

const Section10 = () => {
  return (
    <Container maxWidth="md" sx={{ my: { xs: 10, md: 20, lg: 25 } }}>
      <Title
        variant={{ xs: "h3", md: "h2" }}
        sx={{ textAlign: "center", mb: { xs: 5 } }}
      >
        Join us
      </Title> 

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ px: { xs: 0, md: 5, lg: 8 } }}
      >
        {SOCIALS.map(({ name, image }, index) => (
          <Grid
            item
            xs={6}
            md={3}
            key={name}
            component={motion.div} // Motion wrapper
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.2 }} // Triggers every time it comes into view
            sx={{
              cursor: "pointer",
              "&:hover": {
                "& img": {
                  transform: "scale(1.2)",
                  transition: "transform .3s",
                },
                "& p": { color: "text.primary", transition: "all .3s ease-in" },
              },
            }}
          >
            <Stack alignItems="center">
              <motion.img
                src={image}
                style={{ width: "120px", objectFit: "contain" }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: false, amount: 0.2 }} // Ensures it animates every scroll
              />

              <Typography variant="body2" color="text.secondary">
                {name}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section10;
