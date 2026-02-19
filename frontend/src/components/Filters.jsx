import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Select, FormControl, InputLabel, Button, Stack, InputAdornment, Typography } from '@mui/material';
import { Search, FilterX, Filter, Calendar } from 'lucide-react';

const statuses = ['All', 'Open', 'Closed', 'Canceled'];

const Filters = ({ filters, setFilters, onReset }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== filters.search) {
                setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, setFilters, filters.search]);

    useEffect(() => {
        setSearchTerm(filters.search);
    }, [filters.search]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleOtherChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
    };

    const handleClear = () => {
        setSearchTerm('');
        onReset();
    };

    return (
        <Box
            className="glass-effect"
            sx={{
                mb: 4,
                p: { xs: 2.5, md: 3.5 },
                borderRadius: 5,
                background: 'rgba(10, 10, 10, 0.9)',
                border: '1px solid rgba(0, 209, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
            }}
        >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                <Box sx={{ p: 1, bgcolor: 'rgba(0, 209, 255, 0.1)', borderRadius: 2, display: 'flex' }}>
                    <Filter size={18} color="#00D1FF" />
                </Box>
                <Typography variant="subtitle2" fontWeight={800} color="primary.light" sx={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Filter Dashboard
                </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2.5} alignItems="stretch">
                <TextField
                    label="Search Orders"
                    name="search"
                    variant="outlined"
                    size="small"
                    placeholder="Search by Doc Num, Clinic, or Doctor..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={18} style={{ color: '#00D1FF', opacity: 0.8 }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ flexGrow: 1 }}>
                    <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 150 } }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={filters.status}
                            label="Status"
                            onChange={handleOtherChange}
                            sx={{ fontWeight: 600 }}
                        >
                            {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <TextField
                        label="From Date"
                        name="from"
                        type="date"
                        size="small"
                        value={filters.from}
                        onChange={handleOtherChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: { xs: '100%', md: 170 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Calendar size={16} color="#00D1FF" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="To Date"
                        name="to"
                        type="date"
                        size="small"
                        value={filters.to}
                        onChange={handleOtherChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: { xs: '100%', md: 170 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Calendar size={16} color="#00D1FF" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClear}
                    startIcon={<FilterX size={18} />}
                    sx={{
                        px: 3,
                        borderColor: 'rgba(0, 209, 255, 0.3)',
                        '&:hover': { borderColor: '#00D1FF', bgcolor: 'rgba(0, 209, 255, 0.05)' },
                        minWidth: { xs: '100%', lg: 'auto' },
                        fontWeight: 800
                    }}
                >
                    Clear Filters
                </Button>
            </Stack>
        </Box>
    );
};

export default Filters;
