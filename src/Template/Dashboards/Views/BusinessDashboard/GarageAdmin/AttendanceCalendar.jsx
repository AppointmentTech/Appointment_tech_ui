import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AttendanceCalendar = ({ 
  events = [], 
  height = 500, 
  showToolbar = true,
  onEventClick,
  onDateSelect,
  customToolbar,
  title = "Attendance Calendar"
}) => {
  const theme = useTheme();
  const [calendarView, setCalendarView] = useState(Views.MONTH);
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Calendar events with theme colors
  const calendarEvents = useMemo(() => {
    return events.map(event => ({
      ...event,
      color: event.color || theme.palette.primary.main,
    }));
  }, [events, theme.palette]);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        padding: '2px 5px',
        fontSize: '12px',
        fontWeight: 'bold'
      }
    };
  };

  // Custom calendar toolbar
  const CustomToolbar = (toolbar) => {
    const goToToday = () => {
      setCalendarDate(new Date());
    };

    const goToPrev = () => {
      let newDate;
      if (calendarView === 'month') {
        newDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
      } else if (calendarView === 'week') {
        newDate = new Date(calendarDate);
        newDate.setDate(newDate.getDate() - 7);
      } else if (calendarView === 'day') {
        newDate = new Date(calendarDate);
        newDate.setDate(newDate.getDate() - 1);
      }
      setCalendarDate(newDate);
    };

    const goToNext = () => {
      let newDate;
      if (calendarView === 'month') {
        newDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
      } else if (calendarView === 'week') {
        newDate = new Date(calendarDate);
        newDate.setDate(newDate.getDate() + 7);
      } else if (calendarView === 'day') {
        newDate = new Date(calendarDate);
        newDate.setDate(newDate.getDate() + 1);
      }
      setCalendarDate(newDate);
    };

    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2, 
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px 8px 0 0'
      }}>
        <Stack direction="row" spacing={1}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={goToToday}
            sx={{ 
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light + '20'
              }
            }}
          >
            Today
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={goToPrev}
            sx={{ 
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light + '20'
              }
            }}
          >
            Back
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={goToNext}
            sx={{ 
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light + '20'
              }
            }}
          >
            Next
          </Button>
        </Stack>
        
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          color: theme.palette.text.primary
        }}>
          {toolbar.label}
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Button 
            variant={calendarView === 'month' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => setCalendarView('month')}
            sx={{
              backgroundColor: calendarView === 'month' ? theme.palette.primary.main : 'transparent',
              color: calendarView === 'month' ? theme.palette.primary.contrastText : theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: calendarView === 'month' ? theme.palette.primary.dark : theme.palette.primary.light + '20'
              }
            }}
          >
            Month
          </Button>
          <Button 
            variant={calendarView === 'week' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => setCalendarView('week')}
            sx={{
              backgroundColor: calendarView === 'week' ? theme.palette.primary.main : 'transparent',
              color: calendarView === 'week' ? theme.palette.primary.contrastText : theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: calendarView === 'week' ? theme.palette.primary.dark : theme.palette.primary.light + '20'
              }
            }}
          >
            Week
          </Button>
          <Button 
            variant={calendarView === 'day' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => setCalendarView('day')}
            sx={{
              backgroundColor: calendarView === 'day' ? theme.palette.primary.main : 'transparent',
              color: calendarView === 'day' ? theme.palette.primary.contrastText : theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: calendarView === 'day' ? theme.palette.primary.dark : theme.palette.primary.light + '20'
              }
            }}
          >
            Day
          </Button>
        </Stack>
      </Box>
    );
  };

  // Custom event rendering
  const EventComponent = ({ event }) => {
    if (event.type === 'attendance') {
      return (
        <Tooltip title={`Staff: ${event.resource.staffName}\nStatus: ${event.resource.status}\nPunch In: ${event.resource.punchIn || 'N/A'}\nPunch Out: ${event.resource.punchOut || 'N/A'}\nTotal Hours: ${event.resource.totalHours}`.replace(/\n/g, '\u000A')} placement="top" arrow>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{event.resource.staffName?.charAt(0)}</Avatar>
            <span>{event.title}</span>
          </Stack>
        </Tooltip>
      );
    }
    if (event.type === 'holiday') {
      return (
        <Tooltip title={`Holiday: ${event.title}\n${event.description || ''}`.replace(/\n/g, '\u000A')} placement="top" arrow>
          <Stack direction="row" spacing={1} alignItems="center">
            <span role="img" aria-label="holiday">🎉</span>
            <span>{event.title}</span>
          </Stack>
        </Tooltip>
      );
    }
    return <span>{event.title}</span>;
  };

  return (
    <Paper sx={{ 
      p: 2, 
      height: height,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`
    }}>
      {title && (
        <Typography variant="h6" sx={{ 
          mb: 2, 
          fontWeight: 'bold',
          color: theme.palette.text.primary
        }}>
          {title}
        </Typography>
      )}
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: height - (title ? 80 : 40) }}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        defaultView="month"
        view={calendarView}
        date={calendarDate}
        onView={setCalendarView}
        onNavigate={setCalendarDate}
        onSelectEvent={onEventClick}
        onSelectSlot={onDateSelect}
        selectable
        tooltipAccessor={null}
        components={{
          toolbar: customToolbar || CustomToolbar,
          event: EventComponent
        }}
        sx={{
          '& .rbc-calendar': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
          '& .rbc-header': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          // Force today cell highlight in dark mode
          '& .rbc-today': {
            backgroundColor: theme.palette.mode === 'dark' ? '#ff9800 !important' : theme.palette.action.hover,
            color: theme.palette.mode === 'dark' ? '#fff !important' : 'inherit',
            border: `2px solid ${theme.palette.mode === 'dark' ? '#ffb74d !important' : theme.palette.primary.main}`,
            boxSizing: 'border-box',
            zIndex: 1,
          },
          '& .rbc-off-range-bg': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
          },
          '& .rbc-off-range': {
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
          },
          '& .rbc-event': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: '5px',
            fontWeight: 'bold',
            fontSize: '12px',
          },
          '& .rbc-month-view': theme.palette.mode === 'dark' ? {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[900],
          } : {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-time-view': theme.palette.mode === 'dark' ? {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[900],
          } : {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-day-view': theme.palette.mode === 'dark' ? {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[900],
          } : {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-time-header': {
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
          },
          '& .rbc-time-content': theme.palette.mode === 'dark' ? {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[900],
          } : {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-timeslot-group': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-day-slot .rbc-time-slot': theme.palette.mode === 'dark' ? {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[900],
          } : {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-current-time-indicator': {
            backgroundColor: theme.palette.error.main,
          },
          '& .rbc-show-more': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
          },
          '& .rbc-show-more:hover': {
            backgroundColor: theme.palette.primary.light + '20',
          },
          // Zebra striping for dark mode
          '& .rbc-month-row': theme.palette.mode === 'dark' ? {
            backgroundColor: theme.palette.grey[900],
          } : {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-month-row:nth-of-type(even)': theme.palette.mode === 'dark' ? {
            backgroundColor: theme.palette.grey[800],
          } : {},
          '& .rbc-day-bg': theme.palette.mode === 'dark' ? {
            backgroundColor: theme.palette.grey[900],
          } : {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-day-bg + .rbc-day-bg': {
            borderLeft: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-month-row + .rbc-month-row': {
            borderTop: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-date-cell': theme.palette.mode === 'dark' ? {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.grey[900],
          } : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-date-cell.rbc-off-range': theme.palette.mode === 'dark' ? {
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.grey[900],
          } : {
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.grey[100],
          },
          '& .rbc-date-cell.rbc-now': {
            fontWeight: 'bold',
            color: theme.palette.mode === 'dark' ? '#fff !important' : theme.palette.primary.main,
            backgroundColor: theme.palette.mode === 'dark' ? '#ff9800 !important' : theme.palette.action.selected,
            border: `2px solid ${theme.palette.mode === 'dark' ? '#ffb74d !important' : theme.palette.primary.main}`,
            borderRadius: '6px',
            zIndex: 2,
          },
          '& .rbc-time-view .rbc-header': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          '& .rbc-time-view .rbc-time-header': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
          },
          '& .rbc-time-view .rbc-time-content': theme.palette.mode === 'dark' ? {
            backgroundColor: theme.palette.grey[900],
          } : {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-time-view .rbc-timeslot-group': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-time-view .rbc-day-slot .rbc-time-slot': theme.palette.mode === 'dark' ? {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[900],
          } : {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-time-view .rbc-time-gutter': theme.palette.mode === 'dark' ? {
            backgroundColor: theme.palette.grey[900],
            color: theme.palette.text.primary,
          } : {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
          '& .rbc-time-view .rbc-time-slot': theme.palette.mode === 'dark' ? {
            backgroundColor: theme.palette.grey[900],
          } : {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-time-view .rbc-time-slot.rbc-today': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.action.hover,
            border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.primary.main}`,
            zIndex: 1,
          },
        }}
      />
    </Paper>
  );
};

export default AttendanceCalendar;
