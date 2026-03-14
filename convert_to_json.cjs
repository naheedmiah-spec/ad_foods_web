const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

function normalizeName(raw) {
    let s = (raw || '').trim();
    if (!s) return '';
    return s.split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w).join(' ');
}

function mapCategory(cat, sub, name) {
    const c = (cat || '').toLowerCase();
    const s = (sub || '').toLowerCase();
    const n = (name || '').toLowerCase();

    // Beverages/Drinks
    if (c.includes('drink') || s.includes('drink') || c.includes('water') || s.includes('water') ||
        c.includes('juice') || s.includes('juice') || c.includes('off-licence') || s.includes('beer') ||
        s.includes('wine') || s.includes('alcohol') || s.includes('mixer') || n.includes('drink')) return 'Beverages/Drinks';

    // Biscuits/Cookies
    if (c.includes('biscuit') || s.includes('biscuit') || c.includes('cookie') || s.includes('cookie') ||
        c.includes('bakery') || s.includes('bakery') || c.includes('cake') || s.includes('cake')) return 'Biscuits/Cookies';

    // Chilled Foods
    if (c.includes('chilled') || s.includes('chilled') || c.includes('dairy') || s.includes('dairy') ||
        c.includes('milk') || s.includes('milk') || s.includes('cheese') || s.includes('bacon') || s.includes('ham')) return 'Chilled Foods';

    // Confectionery
    if (s.includes('treat') || s.includes('confectionery') || s.includes('sweet') || s.includes('chocolate') || s.includes('candy') ||
        c.includes('confectionery') || c.includes('sweet') || c.includes('chocolate') || c.includes('candy') ||
        n.includes('chocolate') || n.includes('hershey') || n.includes('patch') || n.includes('ike') || n.includes('candy')) return 'Confectionery';

    // Instant Meals
    if (c.includes('frozen') || s.includes('frozen') || c.includes('ready meal') || s.includes('ready meal') ||
        c.includes('instant meal') || s.includes('instant meal') || s.includes('microwave') || n.includes('ready meal')) return 'Instant Meals';

    // Noodles
    if (c.includes('noodle') || s.includes('noodle') || c.includes('pasta') || s.includes('pasta') || n.includes('noodle')) return 'Noodles';

    // Snacks
    if (s.includes('snack') || s.includes('crisp') || s.includes('nut') || s.includes('popcorn') ||
        c.includes('snack') || c.includes('crisp') || c.includes('nut') ||
        n.includes('crisp') || n.includes('doritos') || n.includes('pringle')) return 'Snacks';

    // Groceries (Broadest food category - catch remaining)
    return 'Groceries';
}

function run() {
    const excelPath = 'C:\\Users\\nahee\\Downloads\\Phone Link\\A D Food & Wine Missing Prices.xlsx';
    const outputPath = path.join(__dirname, 'src', 'data', 'products.json');

    console.log(`Reading Excel from: ${excelPath}`);
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const dataRows = data.slice(1);
    console.log(`Found ${dataRows.length} product rows. Converting…`);

    const products = [];
    let skipped = 0;
    let ignoredVapeCig = 0;
    let withPrice = 0;

    dataRows.forEach((row, index) => {
        try {
            const barcode = (row[0] ?? '').toString().trim();
            const category = (row[1] ?? '').toString().trim();
            const subcategory = (row[2] ?? '').toString().trim();
            const brand = (row[3] ?? '').toString().trim();
            const rawName = (row[4] ?? '').toString().trim();
            const sellingPrice = parseFloat(row[5]) || 0;

            const lowerCat = category.toLowerCase();
            const lowerSub = subcategory.toLowerCase();
            const lowerBrand = brand.toLowerCase();
            const lowerName = rawName.toLowerCase();

            // Strict Filter
            if (lowerCat.includes('vape') || lowerCat.includes('cig') || lowerCat.includes('tobacco') ||
                lowerSub.includes('vape') || lowerSub.includes('cig') || lowerSub.includes('tobacco') ||
                lowerBrand.includes('vape') || lowerBrand.includes('cig') ||
                lowerName.includes('vape') || lowerName.includes('cig')) {
                ignoredVapeCig++;
                return;
            }

            const name = normalizeName(rawName);
            if (!name) {
                skipped++;
                return;
            }

            if (sellingPrice > 0) withPrice++;

            products.push({
                id: `prod_${index}_${Math.random().toString(36).slice(2, 5)}`,
                name,
                barcode,
                category: mapCategory(category, subcategory, rawName),
                description: subcategory ? `${brand ? brand + ' - ' : ''}${subcategory}` : brand || '',
                sellingPrice,
                costPrice: 0,
                applyVat: false,
                quantity: 1,
                supplierName: 'N/A'
            });
        } catch (e) {
            console.error(`Row ${index + 2} failed: ${e.message}`);
        }
    });

    fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
    console.log(`\n✅ Conversion complete!\n   JSON saved to: ${outputPath}\n   Products added: ${products.length}\n   With Price: ${withPrice}\n   Ignored (Vape/Cig): ${ignoredVapeCig}\n   Skipped: ${skipped}\n`);
}

try {
    run();
} catch (e) {
    console.error('Fatal:', e);
    process.exit(1);
}
