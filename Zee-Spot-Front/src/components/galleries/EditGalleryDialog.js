import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, TextField, Typography, Slide, Checkbox, FormControlLabel } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GalleryLayoutSelect from '../galleries/GalleryLayoutSelect';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditGalleryDialog({ open, onClose, gallery, onSave }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(dayjs());
  const [disposition, setDisposition] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (gallery) {
      setTitle(gallery.titre);
      setDate(dayjs(gallery.date)); // Properly initialize dayjs object
      setDisposition(gallery.disposition);
      setIsPublic(gallery.public);
    }
  }, [gallery]);

  const handleSave = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedGallery = {
      ...gallery,
      titre: data.get('title'),
      date: date.toISOString(), // Convert to ISO string
      disposition: disposition || gallery.disposition,
      public: isPublic,
    };
    onSave(updatedGallery);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="edit-gallery-dialog-description"
    >
      <Box p={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h1'>Edit Gallery</Typography>
        <form onSubmit={handleSave}>
          <TextField
            margin="normal"
            label="Title"
            variant="outlined"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(dayjs(newValue))}
              renderInput={(params) => <TextField {...params} fullWidth name="date" />}
            />
          </LocalizationProvider>
          
          <GalleryLayoutSelect disposition={disposition} setDisposition={setDisposition} />

          <FormControlLabel
            control={
              <Checkbox
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                name="isPublic"
              />
            }
            label="Public Gallery"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </Box>
    </Dialog>
  );
}
