import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import Title from "../components/Title";
import { section2Content } from "../utils/content";
import { motion } from "framer-motion";

const { items } = section2Content;

const CustomCounter = ({
  before = "",
  after = "",
  counter,
  subtitle,
  decimals = false,
}) => (
  <Stack spacing={{ xs: 1, md: 2 }} alignItems="center">
    <CountUp prefix={before} suffix={after} end={counter} decimals={decimals}>
      {({ countUpRef }) => (
        <Title variant={{ xs: "h4", md: "h2" }} sx={{ fontWeight: 400 }}>
          <span ref={countUpRef} />
        </Title>
      )}
    </CountUp>

    <Typography variant="body2" color="text.secondary">
      {subtitle}
    </Typography>
  </Stack>
);
const MotionGrid = motion(Grid);
const Section2 = () => {
  return (
    <Container sx={{ mt: -10 }}>
      <Box
        sx={(theme) => ({
          position: "relative",
          py: 5,
          bgcolor: "background.default",
          borderRadius: "50px",
          [theme.breakpoints.up("sm")]: {
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              border: "2px solid #9d8a57",
              borderRadius: "50px",
              background: "rgba(17, 24, 39, 0.5)",
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exlude",
            },
          },
        })}
      >
        <MotionGrid
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          container
          spacing={3}
          justifyContent="space-between"
        >
          {items.map((item) => (
            <MotionGrid
            initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }} 
            item xs={6} md={3} key={item.subtitle}>
              <CustomCounter {...item} />
            </MotionGrid>
          ))}
        </MotionGrid>
      </Box>
    </Container>
  );
};

export default Section2;
