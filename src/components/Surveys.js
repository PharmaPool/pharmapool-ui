import * as React from "react";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Switch from "@mui/joy/Switch";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";

import data from "../data/productGalleryData";

export default function Surveys() {
  const [layout, setLayout] = React.useState(undefined);
  const [scroll, setScroll] = React.useState(true);

  // State to track user selections
  const [selectedBrands, setSelectedBrands] = React.useState({});

  // Handle brand selection
  const handleBrandSelection = (drugClass, drug, brand) => {
    setSelectedBrands((prevSelections) => ({
      ...prevSelections,
      [drugClass]: { [drug]: brand },
    }));
  };
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout("fullscreen");
          }}
        >
          Click to take a survey of your favorite brands
        </Button>
      </Stack>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}>
          <ModalClose />
          <DialogTitle>
            Take a survey of the brands that work for you best in each category
          </DialogTitle>
          <List
            sx={[
              {
                mx: "calc(-1 * var(--ModalDialog-padding))",
                px: "var(--ModalDialog-padding)",
              },
              scroll ? { overflow: "scroll" } : { overflow: "initial" },
            ]}
          >
            {data.map((drugClass, i) => (
              <ul>
                <h4>{drugClass.classOfDrug}</h4>
                {drugClass.drugs.map((drug) => (
                  <li>
                    <h6>{drug.drug}</h6>
                    {drug.brands.map((brand, i) => (
                      <ListItem key={i}>
                        I&apos;m in a scrollable area.
                      </ListItem>
                    ))}
                  </li>
                ))}
              </ul>
            ))}

            {/* {[...Array(100)].map((item, index) => (
              <ListItem key={index}>I&apos;m in a scrollable area.</ListItem>
            ))} */}
          </List>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
