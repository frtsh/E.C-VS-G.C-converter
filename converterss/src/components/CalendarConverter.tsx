import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { DateTime } from 'luxon';
import {
  convertToEthiopian,
  convertToGregorian,
  formatEthiopianDate,
  formatGregorianDate,
  getCurrentEthiopianDate,
  getEthiopianMonthName
} from '../utils/calendarConverter';

console.log('CalendarConverter component loaded');

const CalendarConverter: React.FC = () => {
  console.log('CalendarConverter rendering...');
  
  const theme = useTheme();
  console.log('Theme loaded:', theme);
  
  const [gcDate, setGcDate] = useState<DateTime>(DateTime.now());
  const [ecDate, setEcDate] = useState(getCurrentEthiopianDate());

  useEffect(() => {
    console.log('Current GC Date:', gcDate.toISO());
    console.log('Current EC Date:', ecDate);
  }, [gcDate, ecDate]);

  const handleGCDateChange = (date: string) => {
    console.log('GC Date changed to:', date);
    const newDate = DateTime.fromISO(date);
    if (newDate.isValid) {
      setGcDate(newDate);
      setEcDate(convertToEthiopian({
        year: newDate.year,
        month: newDate.month,
        day: newDate.day
      }));
    }
  };

  const handleECDateChange = (field: 'year' | 'month' | 'day', value: number) => {
    console.log('EC Date field changed:', field, value);
    const newEcDate = { ...ecDate, [field]: value };
    setEcDate(newEcDate);
    const gcResult = convertToGregorian(newEcDate);
    setGcDate(DateTime.local(gcResult.year, gcResult.month, gcResult.day));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Calendar Converter
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="textSecondary">
          Ethiopian Calendar ↔ Gregorian Calendar
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Gregorian Calendar Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Gregorian Calendar (G.C)
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={gcDate.toFormat('yyyy-MM-dd')}
                onChange={(e) => handleGCDateChange(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {formatGregorianDate({
                  year: gcDate.year,
                  month: gcDate.month,
                  day: gcDate.day
                })}
              </Typography>
            </Box>
          </Grid>

          {/* Ethiopian Calendar Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Ethiopian Calendar (E.C)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Year"
                    type="number"
                    value={ecDate.year}
                    onChange={(e) => handleECDateChange('year', parseInt(e.target.value))}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Month</InputLabel>
                    <Select
                      value={ecDate.month}
                      label="Month"
                      onChange={(e: SelectChangeEvent<number>) => 
                        handleECDateChange('month', e.target.value as number)
                      }
                    >
                      {Array.from({ length: 13 }, (_, i) => i + 1).map((month) => (
                        <MenuItem key={month} value={month}>
                          {getEthiopianMonthName(month)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Day"
                    type="number"
                    value={ecDate.day}
                    onChange={(e) => handleECDateChange('day', parseInt(e.target.value))}
                    inputProps={{ min: 1, max: ecDate.month === 13 ? 6 : 30 }}
                  />
                </Grid>
              </Grid>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {formatEthiopianDate(ecDate)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* System Time Information */}
        <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            System Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                System Time Zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                Current Time: {DateTime.now().toLocaleString(DateTime.DATETIME_FULL)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CalendarConverter; 