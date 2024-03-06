import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";

import "../rightToLeftField.css";
import * as Style from "./BodyStyle";

const AddPersonDialog = ({
  addPersonOpen,
  setAddPersonOpen,
  addPersonToData,
  setPage,
}) => {
  const [newPerson, setNewPerson] = useState({ name: "", age: "", city: "" });
  const [nameError, setNameError] = useState(false);

  const handleAddPerson = () => {
    if (!newPerson.name) {
      setNameError(true);
      return;
    }
    setNewPerson({ name: "", age: "", city: "" });
    setAddPersonOpen(false);
    addPersonToData(newPerson);
    setPage(1);
  };

  const handleCloseWithoutAdding = () => {
    setAddPersonOpen(false);
  };

  return (
    <Dialog dir="rtl" open={addPersonOpen} onClose={handleCloseWithoutAdding}>
      <DialogTitle style={Style.addPersonDialogTitle}>להדלקת נר</DialogTitle>
      <DialogContent style={Style.addPersonDialogContent}>
        <TextField
          InputProps={{
            style: { font: "inherit" },
            dir: "rtl",
          }}
          InputLabelProps={{
            style: {
              font: "inherit",
            },
            dir: "rtl",
          }}
          dir="rtl"
          label="שם ושם משפחה"
          variant="standard"
          required
          id="standard-basic"
          name="name"
          type="text"
          fullWidth
          onChange={(event) => {
            setNameError(false);
            setNewPerson((person) => ({
              ...person,
              name: event.target.value,
            }));
          }}
          error={nameError}
        />
        <TextField
          InputProps={{
            style: { font: "inherit" },
          }}
          InputLabelProps={{
            style: {
              font: "inherit",
            },
          }}
          variant="standard"
          margin="dense"
          id="age"
          name="age"
          label="גיל פטירה"
          type="text"
          fullWidth
          onChange={(event) => {
            setNewPerson((person) => ({
              ...person,
              age: event.target.value,
            }));
          }}
        />
        <TextField
          dir="rtl"
          InputProps={{
            style: { font: "inherit" },
          }}
          InputLabelProps={{
            style: {
              font: "inherit",
            },
          }}
          variant="standard"
          margin="dense"
          id="city"
          name="city"
          label="מקום מגורים"
          type="text"
          fullWidth
          onChange={(event) => {
            setNewPerson((person) => ({
              ...person,
              city: event.target.value,
            }));
          }}
        />
      </DialogContent>
      <div style={Style.addPersomDialogButtonDiv}>
        <Button
          style={Style.addPersonDialogButton}
          type="submit"
          onClick={handleAddPerson}
        >
          להדלקה
        </Button>
      </div>
    </Dialog>
  );
};

export default AddPersonDialog;
