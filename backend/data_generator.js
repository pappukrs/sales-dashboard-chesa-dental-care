const fs = require('fs');
const path = require('path');

const statuses = ['Open', 'Closed', 'Canceled'];

const products = [
    { code: 'CH-ONX-PRM', name: 'Chesa Onyx Premium Dental Chair', price: 125000 },
    { code: 'CH-PRST-HF', name: 'Chesa Prestige Hasteflex Chair', price: 95000 },
    { code: 'CH-CRMA-AIR', name: 'Chesa Croma Air Dental Chair', price: 75000 },
    { code: 'GN-S500', name: 'Chesa Gnatus S500 Treatment Center', price: 210000 },
    { code: 'RAD-RS-ALP', name: 'Rayscan Alpha Plus CBCT Machine', price: 4500000 },
    { code: 'RAD-OPG-RS', name: 'OPG-Ray Scan Alpha Radiology', price: 1200000 },
    { code: 'RAD-NR-PORT', name: 'Nanoray Portable X-Ray', price: 150000 },
    { code: 'STR-TANDA-B', name: 'Tanda B Class Autoclave (18L)', price: 85000 },
    { code: 'STR-DOLP-N', name: 'Dolphin N Class Autoclave (23L)', price: 65000 },
    { code: 'ACC-LUB-HP', name: 'Lub Handpiece Lubricator', price: 12000 },
    { code: 'ACC-COMP-2HP', name: 'Chesa Oil Free Compressor 2HP', price: 35000 },
    { code: 'INS-IMP-KIT', name: 'Chesa Premium Implant Surgery Kit', price: 45000 },
    { code: 'ACC-SUCT-M1', name: 'Dental Suction Motor - High Power', price: 28000 }
];

const clinics = [
    { code: 'CL-APL-DNT', name: 'Apollo Dental Clinic Whitefield' },
    { code: 'CL-SML-STD', name: 'Smile Dental Studio & Orthodontics' },
    { code: 'CL-PRL-HSP', name: 'Pearl Dental Hospital' },
    { code: 'DR-SHR-ORTH', name: 'Dr. Sharma\'s Advanced Orthodontics' },
    { code: 'CL-CTY-CARE', name: 'City Dental Care Center' },
    { code: 'CL-GRN-PARK', name: 'Green Park Dental & Maxillofacial' },
    { code: 'DR-RED-IMP', name: 'Dr. Reddy\'s Implant Center' },
    { code: 'CL-ELT-DNT', name: 'Elite Dental & Cosmetic Clinic' },
    { code: 'CL-MOD-DNT', name: 'Modern Dental Solutions' },
    { code: 'CL-HLT-SML', name: 'Healthy Smile Family Dentistry' }
];

const generateMockData = (count = 250) => {
    const orders = [];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');

    for (let i = 1; i <= count; i++) {
        const clinic = clinics[Math.floor(Math.random() * clinics.length)];
        const docDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

        // Generate 1-4 random line items
        const lineCount = Math.floor(Math.random() * 4) + 1;
        const documentLines = [];
        let runningTotal = 0;

        for (let j = 1; j <= lineCount; j++) {
            const product = products[Math.floor(Math.random() * products.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            const lineTotal = product.price * quantity;

            documentLines.push({
                LineNum: j - 1,
                ItemCode: product.code,
                Dscription: product.name,
                Quantity: quantity,
                Price: product.price,
                LineTotal: lineTotal,
                Currency: 'INR'
            });
            runningTotal += lineTotal;
        }

        const vatSum = Math.round(runningTotal * 0.18); // 18% GST standard in India
        const docTotal = runningTotal + vatSum;

        orders.push({
            DocEntry: i,
            DocNum: 20000 + i,
            CardCode: clinic.code,
            CardName: clinic.name,
            DocDate: docDate.toISOString().split('T')[0],
            DocStatus: statuses[Math.floor(Math.random() * statuses.length)],
            DocTotal: docTotal,
            VatSum: vatSum,
            DocCur: 'INR',
            Comments: `Order for ${clinic.name} - ${documentLines[0].Dscription}${lineCount > 1 ? ` and ${lineCount - 1} other items` : ''}`,
            SalesPersonCode: Math.floor(Math.random() * 15) + 1,
            DocumentLines: documentLines
        });
    }

    // Sort by date descending
    orders.sort((a, b) => new Date(b.DocDate) - new Date(a.DocDate));

    fs.writeFileSync(
        path.join(__dirname, 'salesOrders.json'),
        JSON.stringify(orders, null, 2)
    );
    console.log(`Generated ${count} domain-specific orders in salesOrders.json`);
};

generateMockData();
