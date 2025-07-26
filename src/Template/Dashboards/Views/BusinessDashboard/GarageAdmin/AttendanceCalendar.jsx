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
      toolbar.onNavigate('TODAY');
    };

    const goToPrev = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
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
            variant={toolbar.view === 'month' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => toolbar.onView('month')}
            sx={{
              backgroundColor: toolbar.view === 'month' ? theme.palette.primary.main : 'transparent',
              color: toolbar.view === 'month' ? theme.palette.primary.contrastText : theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: toolbar.view === 'month' ? theme.palette.primary.dark : theme.palette.primary.light + '20'
              }
            }}
          >
            Month
          </Button>
          <Button 
            variant={toolbar.view === 'week' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => toolbar.onView('week')}
            sx={{
              backgroundColor: toolbar.view === 'week' ? theme.palette.primary.main : 'transparent',
              color: toolbar.view === 'week' ? theme.palette.primary.contrastText : theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: toolbar.view === 'week' ? theme.palette.primary.dark : theme.palette.primary.light + '20'
              }
            }}
          >
            Week
          </Button>
          <Button 
            variant={toolbar.view === 'day' ? 'contained' : 'outlined'} 
            size="small" 
            onClick={() => toolbar.onView('day')}
            sx={{
              backgroundColor: toolbar.view === 'day' ? theme.palette.primary.main : 'transparent',
              color: toolbar.view === 'day' ? theme.palette.primary.contrastText : theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: toolbar.view === 'day' ? theme.palette.primary.dark : theme.palette.primary.light + '20'
              }
            }}
          >
            Day
          </Button>
        </Stack>
      </Box>
    );
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
        onView={(view) => setCalendarView(view)}
        onSelectEvent={onEventClick}
        onSelectSlot={onDateSelect}
        selectable
        tooltipAccessor={(event) => {
          if (event.type === 'attendance') {
            return `${event.title}\nPunch In: ${event.punchIn || 'N/A'}\nPunch Out: ${event.punchOut || 'N/A'}\nTotal Hours: ${event.totalHours}`;
          }
          return event.title;
        }}
        components={{
          toolbar: customToolbar || CustomToolbar
        }}
        sx={{
          '& .rbc-calendar': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
          '& .rbc-header': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-today': {
            backgroundColor: theme.palette.action.hover,
          },
          '& .rbc-off-range-bg': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          '& .rbc-off-range': {
            color: theme.palette.text.disabled,
          },
          '& .rbc-event': {
            backgroundColor: theme.palette.primary.main,
          },
          '& .rbc-month-view': {
            border: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-time-view': {
            border: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-day-view': {
            border: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-time-header': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-time-content': {
            borderTop: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-timeslot-group': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-day-slot .rbc-time-slot': {
            borderTop: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-current-time-indicator': {
            backgroundColor: theme.palette.error.main,
          },
          '& .rbc-show-more': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
          },
          '& .rbc-show-more:hover': {
            backgroundColor: theme.palette.primary.light + '20',
          },
          // Fix for dark mode column colors
          '& .rbc-month-row': {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-day-bg': {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-day-bg + .rbc-day-bg': {
            borderLeft: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-month-row + .rbc-month-row': {
            borderTop: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-date-cell': {
            color: theme.palette.text.primary,
          },
          '& .rbc-date-cell.rbc-off-range': {
            color: theme.palette.text.disabled,
          },
          '& .rbc-date-cell.rbc-now': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
          },
          '& .rbc-time-view .rbc-header': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          '& .rbc-time-view .rbc-time-header': {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-time-view .rbc-time-content': {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-time-view .rbc-timeslot-group': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-time-view .rbc-day-slot .rbc-time-slot': {
            borderTop: `1px solid ${theme.palette.divider}`,
          },
          '& .rbc-time-view .rbc-time-gutter': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
          '& .rbc-time-view .rbc-time-slot': {
            backgroundColor: theme.palette.background.paper,
          },
          '& .rbc-time-view .rbc-time-slot.rbc-today': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      />
    </Paper>
  );
};

export default AttendanceCalendar;
