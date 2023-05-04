import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

import { Grid, } from '@mui/material';


const InfoTitle = styled(Typography)({
    fontWeight: 'bold',
});

const MedicalRecordList = styled('ul')({
    listStyleType: 'none',
    padding: 0,
    margin: 0,
});

const MedicalRecordItem = styled('li')({
    margin: '0.5rem 0',
});

export default function ConfirmDialog({ open, handleClose, handleConfirm, currentPatient, provider, facility }) {
    const [checked, setChecked] = React.useState(false);
    const [fileUploaded, setFileUploaded] = React.useState(false);
    const [consentFile, setConsentFile] = React.useState(null);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileUploaded(true);
            setConsentFile(event.target.files[0]);
        } else {
            setFileUploaded(false);
            setConsentFile(null);
        }
    };

    const handleConfirmClick = () => {
        if (checked && fileUploaded) {
            handleConfirm(consentFile);
            handleClose();
        }
    };



    return (
        <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
            <DialogTitle>Confirm Sending Medical Records</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please review the medical records for{' '}
                    <Typography component="span" fontWeight="bold">
                        {currentPatient.name}
                    </Typography>{' '}
                    that will be sent to{' '}
                    <Typography component="span" fontWeight="bold">
                        {provider.name}
                    </Typography>
                    . Please attest and upload patient consent form.
                </DialogContentText>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <InfoTitle variant="h6">Patient Information:</InfoTitle>
                        <Card variant="outlined" sx={{ minWidth: 275 }}>

                            <CardContent>
                                <Typography>
                                    Name: {currentPatient.name}
                                    <br />
                                    {currentPatient.medicalRecords && (
                                        <>
                                            <MedicalRecordList>
                                                {currentPatient.medicalRecords.map((record) => (
                                                    <MedicalRecordItem key={record.id}>
                                                        <strong>{record.title} ({record.date})</strong>
                                                    </MedicalRecordItem>
                                                ))}
                                            </MedicalRecordList>
                                        </>
                                    )}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoTitle variant="h6">Provider Information:</InfoTitle>
                        <Card variant="outlined" sx={{ minWidth: 275 }}>

                            <CardContent>
                                <Typography>
                                    Name: {provider.name}
                                    <br />
                                    Phone: {provider.contactInfo.phone}
                                    <br />
                                    Email: {provider.contactInfo.email}
                                    <br />
                                    Address: {facility.address}
                                    <br />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                    label="I attest that I have reviewed and confirmed that I am sending the right information."
                />

                <Box display="flex" alignItems="center">
                    <Button variant="contained" component="label">
                        Upload Patient Consent Form
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {fileUploaded && (
                        <Typography variant="body2" sx={{ ml: 2 }}>
                            {consentFile.name}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirmClick} disabled={!checked || !fileUploaded}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>

    );
}
