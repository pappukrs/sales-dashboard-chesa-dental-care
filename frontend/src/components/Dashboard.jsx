import React, { useState } from 'react';
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Typography, Chip, IconButton, Box, CircularProgress, Alert,
    Stack, useMediaQuery, useTheme, Card, CardContent, Divider
} from '@mui/material';
import { Eye, TrendingUp, Calendar, User, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from '../services/ordersApi';
import Filters from './Filters';

const Dashboard = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        status: 'All',
        from: '',
        to: '',
        search: ''
    });

    const { data, error, isLoading, isFetching } = useGetOrdersQuery(filters);

    const handleChangePage = (event, newPage) => {
        setFilters(prev => ({ ...prev, page: newPage + 1 }));
    };

    const handleChangeRowsPerPage = (event) => {
        setFilters(prev => ({ ...prev, limit: parseInt(event.target.value, 10), page: 1 }));
    };

    const handleReset = () => {
        setFilters({ page: 1, limit: 10, status: 'All', from: '', to: '', search: '' });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'primary';
            case 'Closed': return 'success';
            case 'Canceled': return 'error';
            default: return 'default';
        }
    };

    if (error) return (
        <Alert severity="error" sx={{ borderRadius: 4 }}>
            Error loading orders: {error.message}
        </Alert>
    );

    return (
        <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        Sales Orders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage and track your SAP B1 sales orders for dental clinics and equipment.
                    </Typography>
                </Box>
                <IconButton color="primary" sx={{ bgcolor: 'rgba(0, 209, 255, 0.1)' }}>
                    <TrendingUp size={24} />
                </IconButton>
            </Stack>

            <Filters filters={filters} setFilters={setFilters} onReset={handleReset} />

            <Paper sx={{ overflow: 'hidden', position: 'relative' }}>
                {(isLoading || isFetching) && (
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: 'rgba(5, 5, 5, 0.8)', zIndex: 1,
                        backdropFilter: 'blur(8px)'
                    }}>
                        <CircularProgress thickness={5} size={50} sx={{ color: 'primary.main' }} />
                    </Box>
                )}

                {isMobile ? (
                    <Box sx={{ p: 2 }}>
                        {data?.data.map((order) => (
                            <Card
                                key={order.DocEntry}
                                sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}
                                onClick={() => navigate(`/order/${order.DocEntry}`)}
                            >
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={800}>#{order.DocNum}</Typography>
                                            <Typography variant="caption" color="text.secondary">{order.CardCode}</Typography>
                                        </Box>
                                        <Chip
                                            label={order.DocStatus}
                                            size="small"
                                            color={getStatusColor(order.DocStatus)}
                                            sx={{ fontWeight: 700 }}
                                        />
                                    </Stack>
                                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>{order.CardName}</Typography>
                                    <Divider sx={{ my: 1.5, opacity: 0.1 }} />
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Calendar size={14} style={{ opacity: 0.5 }} />
                                            <Typography variant="caption">{order.DocDate}</Typography>
                                        </Stack>
                                        <Typography variant="subtitle2" color="primary.main" fontWeight={800}>
                                            {order.DocCur} {order.DocTotal.toLocaleString()}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Doc Num</TableCell>
                                    <TableCell>Clinic / Doctor</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Total Amount</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.data.map((order) => (
                                    <TableRow
                                        key={order.DocEntry}
                                        onClick={() => navigate(`/order/${order.DocEntry}`)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell sx={{ fontWeight: 700 }}>
                                            #{order.DocNum}
                                        </TableCell>
                                        <TableCell>
                                            <Stack spacing={0.5}>
                                                <Typography variant="body2" fontWeight={600}>{order.CardName}</Typography>
                                                <Typography variant="caption" color="text.secondary">{order.CardCode}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Calendar size={14} style={{ opacity: 0.5 }} />
                                                <Typography variant="body2">{order.DocDate}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={order.DocStatus}
                                                size="small"
                                                variant="outlined"
                                                color={getStatusColor(order.DocStatus)}
                                                sx={{ fontWeight: 700, borderWidth: 2 }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography sx={{ fontWeight: 800, color: 'primary.main' }}>
                                                {order.DocCur} {order.DocTotal.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(0, 209, 255, 0.05)',
                                                    '&:hover': { bgcolor: 'rgba(0, 209, 255, 0.15)' }
                                                }}
                                            >
                                                <Eye size={18} color={theme.palette.primary.main} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data?.total || 0}
                    rowsPerPage={filters.limit}
                    page={filters.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            fontSize: '0.875rem',
                            opacity: 0.7
                        }
                    }}
                />
            </Paper>
        </Box>
    );
};

export default Dashboard;

