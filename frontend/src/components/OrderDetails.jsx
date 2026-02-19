import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Paper, Typography, Grid, Button, Chip,
    Divider, CircularProgress, Alert, Stack, Card, CardContent,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { ArrowLeft, Printer, Download, CreditCard, Calendar, User, Info, Package } from 'lucide-react';
import { useGetOrderByIdQuery } from '../services/ordersApi';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: order, error, isLoading } = useGetOrderByIdQuery(id);

    if (isLoading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress thickness={5} size={60} />
        </Box>
    );

    if (error) return (
        <Alert severity="error" sx={{ borderRadius: 4 }}>
            Error loading order details: {error.data?.message || error.message}
        </Alert>
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'primary';
            case 'Closed': return 'success';
            case 'Canceled': return 'error';
            default: return 'default';
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
            <Button
                startIcon={<ArrowLeft size={18} />}
                onClick={() => navigate(-1)}
                className="no-print"
                sx={{ mb: 4, fontWeight: 700 }}
            >
                Back to Dashboard
            </Button>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: { xs: 3, md: 5 }, mb: 4 }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            spacing={2}
                            sx={{ mb: 5 }}
                        >
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Order #{order.DocNum}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Document Entry Ref: <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{order.DocEntry}</span>
                                </Typography>
                            </Box>
                            <Chip
                                label={order.DocStatus}
                                color={getStatusColor(order.DocStatus)}
                                sx={{
                                    px: 2,
                                    height: 40,
                                    fontSize: '0.875rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}
                            />
                        </Stack>

                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, display: 'block', mb: 1.5 }}>
                                            Client Information
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Box sx={{ p: 1.5, bgcolor: 'rgba(0, 209, 255, 0.1)', borderRadius: 2 }}>
                                                <User size={20} color="#00D1FF" />
                                            </Box>
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 700 }}>{order.CardName}</Typography>
                                                <Typography variant="caption" color="text.secondary">{order.CardCode}</Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                    <Box>
                                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, display: 'block', mb: 1 }}>
                                            Chesa Sales Representative
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Employee ID: {order.SalesPersonCode}</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, display: 'block', mb: 1.5 }}>
                                            Logistics Details
                                        </Typography>
                                        <Stack spacing={2}>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Calendar size={18} style={{ color: '#94a3b8' }} />
                                                <Typography variant="body2">Created on: <b>{order.DocDate}</b></Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <CreditCard size={18} style={{ color: '#94a3b8' }} />
                                                <Typography variant="body2">Currency: <b>{order.DocCur}</b></Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 5, opacity: 0.1 }} />

                        <Box sx={{ mb: 4 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                                <Package size={20} color="#00D1FF" />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Items / Services</Typography>
                            </Stack>
                            <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.01)', borderColor: 'rgba(255,255,255,0.05)' }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                                            <TableCell sx={{ fontWeight: 700 }}>Item Code</TableCell>
                                            <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 700 }}>Qty</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 700 }}>Price</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 700 }}>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.DocumentLines?.map((line, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ color: 'primary.light', fontWeight: 600 }}>{line.ItemCode}</TableCell>
                                                <TableCell>{line.Dscription}</TableCell>
                                                <TableCell align="right">{line.Quantity}</TableCell>
                                                <TableCell align="right">{line.Price.toLocaleString()}</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 700 }}>{line.LineTotal.toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>Order Financials</Typography>
                        <Stack spacing={2} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography color="text.secondary">Net Base Amount</Typography>
                                <Typography fontWeight={600}>{order.DocCur} {(order.DocTotal - order.VatSum).toLocaleString()}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography color="text.secondary">Taxable Amount (VAT/GST)</Typography>
                                <Typography fontWeight={600} color="error.light">+{order.DocCur} {order.VatSum.toLocaleString()}</Typography>
                            </Stack>
                            <Divider sx={{ my: 1, opacity: 0.05 }} />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h5" fontWeight={800}>Total Due</Typography>
                                <Typography variant="h5" fontWeight={900} color="primary.main">
                                    {order.DocCur} {order.DocTotal.toLocaleString()}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>


                </Grid>

                <Grid item xs={12} lg={4}>
                    <Stack spacing={3}>
                        <Paper sx={{ p: 4, borderRadius: 4 }}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>Document Actions</Typography>
                            <Stack spacing={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<Printer size={20} />}
                                    fullWidth
                                    size="large"
                                    onClick={handlePrint}
                                    sx={{ py: 1.5, fontWeight: 800 }}
                                >
                                    Print Invoice
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<Download size={20} />}
                                    fullWidth
                                    size="large"
                                    onClick={handlePrint}
                                    sx={{ py: 1.5, fontWeight: 800, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                                >
                                    Download PDF
                                </Button>
                            </Stack>
                        </Paper>

                        <Card sx={{
                            p: 1,
                            background: 'linear-gradient(135deg, rgba(0, 209, 255, 0.05) 0%, rgba(0, 133, 255, 0.05) 100%)',
                            border: '1px solid rgba(0, 209, 255, 0.15)',
                            borderRadius: 4
                        }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                    <Box sx={{ p: 1, bgcolor: 'primary.main', borderRadius: 2, display: 'flex' }}>
                                        <CreditCard size={20} color="black" />
                                    </Box>
                                    <Typography variant="h6" fontWeight={800}>SAP Integrity</Typography>
                                </Stack>
                                <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.5 }}>
                                    This document is digitally verified and synced from the SAP B1 ERP system.
                                    All financial computations are final and immutable.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderDetails;
