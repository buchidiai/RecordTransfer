import * as React from 'react';
import Button from '@mui/material/Button';
import ConfirmDialog from './ConfirmDialog';

export default function SendRecordsButton({ provider, currentPatient, facility }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = (consentFile) => {
    console.log('Sending medical records to provider', provider.name, 'with consent file', consentFile);
  };

  const handleButtonClick = () => {
    setDialogOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={currentPatient.medicalRecords? false: true}>
        Send Records
      </Button>
      <ConfirmDialog currentPatient={currentPatient} provider={provider} facility={facility} open={dialogOpen} handleClose={handleDialogClose} handleConfirm={handleDialogConfirm} />
    </div>
  );
}
