
import * as React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const PatientList = ({ patients, setCurrentPatient, currentPatient }) => {
    const [patientChecked, setPatientChecked] = React.useState(new Set());
    const [currentPatientAccordion, setCurrentPatientAccordion] = React.useState(-1);
    const [expandedPatient, setExpandedPatient] = React.useState(null);

    const handleAccordionChange = (index) => (event, isExpanded) => {
        const patient = patients[index]
        const { id, name } = patient
        setCurrentPatient({ id, name })
        if (isExpanded) {
            // Check if another patient accordion is already expanded
            if (expandedPatient !== null && expandedPatient !== index) {
                // Uncheck all items of the previously expanded patient
                setPatientChecked(new Set());
            }
            // Set the currently expanded patient accordion index
            setCurrentPatientAccordion(index);
            // Set the currently expanded patient id
            setExpandedPatient(patient.id);
        } else {
            // If the accordion is closed, clear the checked items
            setPatientChecked(new Set());
            setCurrentPatientAccordion(-1);
            setExpandedPatient(null);
            setCurrentPatient({})
        }
    };

    const handlePatientCheckboxChange = (patient, record) => () => {
        const newChecked = new Set(patientChecked);
        if (patientChecked.has(record.id)) {
            newChecked.delete(record.id);

            // If the current patient's id matches the patient id associated with the record,
            // delete the record from the current patient's medicalRecords array and set the updated array in state.
            if (currentPatient.id === patient.id) {
                const updatedMedicalRecords = currentPatient.medicalRecords.filter((r) => r.id !== record.id);
                const updatedPatient = {
                    ...currentPatient,
                    medicalRecords: updatedMedicalRecords,
                };
                setCurrentPatient(updatedPatient);
            }
        } else {
            newChecked.add(record.id);

            // If the current patient's id matches the patient id associated with the record,
            // append the record to a new array and set the current patient's medicalRecords to the new array.
            if (currentPatient.id === patient.id) {

                const updatedMedicalRecords = currentPatient.medicalRecords ? [...currentPatient.medicalRecords, record] : [record];

                const updatedPatient = {
                    ...currentPatient,
                    medicalRecords: updatedMedicalRecords,
                };
                setCurrentPatient(updatedPatient);
            }
        }
        setPatientChecked(newChecked);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {patients.map((patient, index) => (
                <Accordion
                    key={patient.id}
                    expanded={expandedPatient === patient.id}
                    onChange={handleAccordionChange(index)}
                >
                    <AccordionSummary
                        sx={{ backgroundColor: '#f5f5f5' }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        onChange={() =>
                            setExpandedPatient(expandedPatient === patient.id ? null : patient.id)
                        }
                    >
                        {patient.name}
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#e0e0e0' }}>
                        {patient.medicalRecords.map((record) => (
                            <div key={record.id}>
                                <Checkbox
                                    checked={patientChecked.has(record.id)}
                                    onChange={handlePatientCheckboxChange(patient, record)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                {record.title} ({record.date})
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};
