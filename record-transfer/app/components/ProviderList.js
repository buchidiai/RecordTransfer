import * as React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Typography
} from '@mui/material';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export const ProviderList = ({ providers }) => {
    const [expandedFacility, setExpandedFacility] = React.useState(null);

    const handleSendRecords = (providerId) => () => {
        console.log(`Sending records to provider ${providerId}`);
    };

 
    const handleFacilityAccordionChange = (index) => {
      setExpandedFacility(expandedFacility === providers[index].id ? null : providers[index].id);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        {providers.map((facility, index) => (
          <Accordion
            key={facility.id}
            expanded={expandedFacility === facility.id}
            onChange={()=>handleFacilityAccordionChange(index)}
          >
            <AccordionSummary
              sx={{ backgroundColor: '#f5f5f5' }}  
              onChange={ ()=>setExpandedFacility(expandedFacility === facility.id ? null : facility.id)}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              {facility.name}
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%', backgroundColor: '#e0e0e0' }}>
                {facility.medicalProviders.map((provider) => (
                  <Card key={provider.id} variant="outlined" sx={{ minWidth: 275 , marginY: 1}}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h5" component="div">
                        {provider.name}
                      </Typography>
                      <div style={{ flexGrow: 1 }} />
                      <CardActions>
                        <Button variant="contained" color="primary" onClick={ ()=>handleSendRecords(provider)}>
                          Send Records
                        </Button>
                      </CardActions>
                    </CardContent>
                    <CardContent>
                      <Typography  color="text.secondary">
                        Specialty: {provider.specialty}
                      </Typography>
                      <Typography variant="body2">
                        Phone: {provider.contactInfo.phone}
                        <br />
                        Email: {provider.contactInfo.email}
                        <br />
                        Address: {provider.contactInfo.address}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };
