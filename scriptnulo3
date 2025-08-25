document.addEventListener("DOMContentLoaded", function() {
    // --- ELEMENTOS DO DOM ---
    const districtTableBody = document.querySelector("#districtTable tbody");
    const ubsTableBody = document.querySelector("#ubsTable tbody");
    const censusTableBody = document.querySelector("#censusTable tbody");
    const censusTableSearch = document.getElementById("censusTableSearch");

    Chart.register(ChartDataLabels);

    // ===================================================================================
    // MULTI-SELECT FUNCTIONALITY
    // ===================================================================================
    
    // Variáveis globais para armazenar seleções
    let selectedFilters = {
        ubs: [],
        vulnerability: [],
        ageGroup: [],
        district: []
    };

    // Função para alternar dropdown
    function toggleMultiSelect(filterId) {
        const dropdown = document.getElementById(filterId + 'Dropdown');
        const header = dropdown.previousElementSibling;
        
        // Fechar outros dropdowns
        document.querySelectorAll('.multi-select-dropdown').forEach(dd => {
            if (dd !== dropdown) {
                dd.classList.remove('show');
                dd.previousElementSibling.classList.remove('active');
            }
        });
        
        // Alternar dropdown atual
        dropdown.classList.toggle('show');
        header.classList.toggle('active');
    }

    // Função para lidar com "Selecionar Todos"
    function handleSelectAll(filterType) {
        const allCheckbox = document.getElementById(filterType + '_all');
        const otherCheckboxes = document.querySelectorAll(`input[onchange="handleOptionChange('${filterType}')"]`);
        
        if (allCheckbox.checked) {
            // Desmarcar todas as outras opções
            otherCheckboxes.forEach(cb => cb.checked = false);
            selectedFilters[filterType] = [];
        }
        
        updateSelectedText(filterType);
        renderDashboard();
    }

    // Função para lidar com mudanças nas opções
    function handleOptionChange(filterType) {
        const allCheckbox = document.getElementById(filterType + '_all');
        const otherCheckboxes = document.querySelectorAll(`input[onchange="handleOptionChange('${filterType}')"]`);
        const checkedBoxes = Array.from(otherCheckboxes).filter(cb => cb.checked);
        
        if (checkedBoxes.length > 0) {
            // Se alguma opção específica foi selecionada, desmarcar "Todos"
            allCheckbox.checked = false;
            selectedFilters[filterType] = checkedBoxes.map(cb => cb.value);
        } else {
            // Se nenhuma opção específica está selecionada, marcar "Todos"
            allCheckbox.checked = true;
            selectedFilters[filterType] = [];
        }
        
        updateSelectedText(filterType);
        renderDashboard();
    }

    // Função para atualizar o texto selecionado
    function updateSelectedText(filterType) {
        const selectedTextElement = document.getElementById(filterType + 'SelectedText');
        const allCheckbox = document.getElementById(filterType + '_all');
        
        if (allCheckbox.checked || selectedFilters[filterType].length === 0) {
            switch(filterType) {
                case 'ubs':
                    selectedTextElement.textContent = 'Todas as Unidades';
                    break;
                case 'vulnerability':
                    selectedTextElement.textContent = 'Todos os Índices';
                    break;
                case 'ageGroup':
                    selectedTextElement.textContent = 'Todas as Faixas';
                    break;
                case 'district':
                    selectedTextElement.textContent = 'Todos os Distritos';
                    break;
            }
        } else {
            const count = selectedFilters[filterType].length;
            if (count === 1) {
                selectedTextElement.textContent = selectedFilters[filterType][0];
            } else {
                selectedTextElement.textContent = `${count} selecionados`;
            }
        }
    }

    // Função para limpar filtros
    function clearFilters() {
        // Resetar todas as seleções
        selectedFilters = {
            ubs: [],
            vulnerability: [],
            ageGroup: [],
            district: []
        };
        
        // Marcar todos os checkboxes "Todos" e desmarcar os outros
        ['ubs', 'vulnerability', 'ageGroup', 'district'].forEach(filterType => {
            document.getElementById(filterType + '_all').checked = true;
            document.querySelectorAll(`input[onchange="handleOptionChange('${filterType}')"]`).forEach(cb => {
                cb.checked = false;
            });
            updateSelectedText(filterType);
        });
        
        // Fechar todos os dropdowns
        document.querySelectorAll('.multi-select-dropdown').forEach(dd => {
            dd.classList.remove('show');
            dd.previousElementSibling.classList.remove('active');
        });
        
        renderDashboard();
    }

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.multi-select-container')) {
            document.querySelectorAll('.multi-select-dropdown').forEach(dd => {
                dd.classList.remove('show');
                dd.previousElementSibling.classList.remove('active');
            });
        }
    });

    // Expor funções globalmente
    window.toggleMultiSelect = toggleMultiSelect;
    window.handleSelectAll = handleSelectAll;
    window.handleOptionChange = handleOptionChange;
    window.clearFilters = clearFilters;

    // ===================================================================================
    // NOVOS DADOS DO CENSO 2021 POR DISTRITO E FAIXA ETÁRIA
    // ===================================================================================
    const censusData2021 = [
        { "FAIXA_ETARIA": "00 - MENOR DE 1 ANO", "ELDORADO": 1304, "INDUSTRIAL": 882, "NACIONAL": 875, "PETROLANDIA": 564, "RESSACA": 1348, "RIACHO": 840, "SEDE": 1243, "VARGEM_DAS_FLORES": 823, "Total": 7879 },
        { "FAIXA_ETARIA": "01 ANO", "ELDORADO": 1379, "INDUSTRIAL": 941, "NACIONAL": 835, "PETROLANDIA": 606, "RESSACA": 1264, "RIACHO": 868, "SEDE": 1172, "VARGEM_DAS_FLORES": 818, "Total": 7883 },
        { "FAIXA_ETARIA": "02 ANOS", "ELDORADO": 1290, "INDUSTRIAL": 891, "NACIONAL": 878, "PETROLANDIA": 645, "RESSACA": 1357, "RIACHO": 872, "SEDE": 1221, "VARGEM_DAS_FLORES": 842, "Total": 7996 },
        { "FAIXA_ETARIA": "03 ANOS", "ELDORADO": 1334, "INDUSTRIAL": 996, "NACIONAL": 807, "PETROLANDIA": 562, "RESSACA": 1255, "RIACHO": 885, "SEDE": 1167, "VARGEM_DAS_FLORES": 822, "Total": 7828 },
        { "FAIXA_ETARIA": "04 ANOS", "ELDORADO": 1375, "INDUSTRIAL": 990, "NACIONAL": 876, "PETROLANDIA": 601, "RESSACA": 1404, "RIACHO": 866, "SEDE": 1221, "VARGEM_DAS_FLORES": 804, "Total": 8137 },
        { "FAIXA_ETARIA": "05 ANOS", "ELDORADO": 1410, "INDUSTRIAL": 912, "NACIONAL": 921, "PETROLANDIA": 618, "RESSACA": 1354, "RIACHO": 869, "SEDE": 1180, "VARGEM_DAS_FLORES": 812, "Total": 8076 },
        { "FAIXA_ETARIA": "06 ANOS", "ELDORADO": 1351, "INDUSTRIAL": 938, "NACIONAL": 898, "PETROLANDIA": 640, "RESSACA": 1286, "RIACHO": 890, "SEDE": 1170, "VARGEM_DAS_FLORES": 809, "Total": 7982 },
        { "FAIXA_ETARIA": "07 ANOS", "ELDORADO": 1382, "INDUSTRIAL": 1014, "NACIONAL": 878, "PETROLANDIA": 643, "RESSACA": 1422, "RIACHO": 901, "SEDE": 1274, "VARGEM_DAS_FLORES": 830, "Total": 8344 },
        { "FAIXA_ETARIA": "08 ANOS", "ELDORADO": 1455, "INDUSTRIAL": 1058, "NACIONAL": 966, "PETROLANDIA": 672, "RESSACA": 1400, "RIACHO": 892, "SEDE": 1318, "VARGEM_DAS_FLORES": 894, "Total": 8655 },
        { "FAIXA_ETARIA": "09 ANOS", "ELDORADO": 1600, "INDUSTRIAL": 1109, "NACIONAL": 1043, "PETROLANDIA": 721, "RESSACA": 1548, "RIACHO": 983, "SEDE": 1413, "VARGEM_DAS_FLORES": 922, "Total": 9339 },
        { "FAIXA_ETARIA": "10 ANOS", "ELDORADO": 1676, "INDUSTRIAL": 1163, "NACIONAL": 1070, "PETROLANDIA": 816, "RESSACA": 1587, "RIACHO": 1054, "SEDE": 1532, "VARGEM_DAS_FLORES": 1108, "Total": 10006 },
        { "FAIXA_ETARIA": "11 ANOS", "ELDORADO": 1786, "INDUSTRIAL": 1151, "NACIONAL": 1059, "PETROLANDIA": 799, "RESSACA": 1591, "RIACHO": 1074, "SEDE": 1501, "VARGEM_DAS_FLORES": 1046, "Total": 10007 },
        { "FAIXA_ETARIA": "12 A 14 ANOS", "ELDORADO": 5016, "INDUSTRIAL": 3529, "NACIONAL": 3267, "PETROLANDIA": 2299, "RESSACA": 4853, "RIACHO": 3275, "SEDE": 4404, "VARGEM_DAS_FLORES": 3101, "Total": 29744 },
        { "FAIXA_ETARIA": "15 A 17 ANOS", "ELDORADO": 5444, "INDUSTRIAL": 3662, "NACIONAL": 3414, "PETROLANDIA": 2216, "RESSACA": 4990, "RIACHO": 3360, "SEDE": 4595, "VARGEM_DAS_FLORES": 3076, "Total": 30757 },
        { "FAIXA_ETARIA": "18 A 19 ANOS", "ELDORADO": 3856, "INDUSTRIAL": 2546, "NACIONAL": 2233, "PETROLANDIA": 1509, "RESSACA": 3257, "RIACHO": 2395, "SEDE": 3142, "VARGEM_DAS_FLORES": 1816, "Total": 20754 },
        { "FAIXA_ETARIA": "20 A 24 ANOS", "ELDORADO": 11059, "INDUSTRIAL": 7186, "NACIONAL": 6110, "PETROLANDIA": 4128, "RESSACA": 9174, "RIACHO": 6668, "SEDE": 8473, "VARGEM_DAS_FLORES": 4621, "Total": 57419 },
        { "FAIXA_ETARIA": "25 A 29 ANOS", "ELDORADO": 11796, "INDUSTRIAL": 7469, "NACIONAL": 5849, "PETROLANDIA": 4177, "RESSACA": 9815, "RIACHO": 7717, "SEDE": 9300, "VARGEM_DAS_FLORES": 4623, "Total": 60746 },
        { "FAIXA_ETARIA": "30 A 39 ANOS", "ELDORADO": 20347, "INDUSTRIAL": 12693, "NACIONAL": 10045, "PETROLANDIA": 7292, "RESSACA": 17049, "RIACHO": 13732, "SEDE": 16539, "VARGEM_DAS_FLORES": 8006, "Total": 105703 },
        { "FAIXA_ETARIA": "40 A 49 ANOS", "ELDORADO": 17362, "INDUSTRIAL": 10878, "NACIONAL": 8621, "PETROLANDIA": 5939, "RESSACA": 12830, "RIACHO": 11070, "SEDE": 13534, "VARGEM_DAS_FLORES": 5821, "Total": 86055 },
        { "FAIXA_ETARIA": "50 A 59 ANOS", "ELDORADO": 13923, "INDUSTRIAL": 8072, "NACIONAL": 5945, "PETROLANDIA": 4261, "RESSACA": 9242, "RIACHO": 7926, "SEDE": 9500, "VARGEM_DAS_FLORES": 4047, "Total": 62916 },
        { "FAIXA_ETARIA": "60 A 64 ANOS", "ELDORADO": 4771, "INDUSTRIAL": 2594, "NACIONAL": 1564, "PETROLANDIA": 1103, "RESSACA": 3097, "RIACHO": 2705, "SEDE": 2707, "VARGEM_DAS_FLORES": 1226, "Total": 19767 },
        { "FAIXA_ETARIA": "65 A 69 ANOS", "ELDORADO": 3363, "INDUSTRIAL": 1890, "NACIONAL": 995, "PETROLANDIA": 735, "RESSACA": 2150, "RIACHO": 1957, "SEDE": 1760, "VARGEM_DAS_FLORES": 921, "Total": 13771 },
        { "FAIXA_ETARIA": "70 A 74 ANOS", "ELDORADO": 2357, "INDUSTRIAL": 1488, "NACIONAL": 796, "PETROLANDIA": 531, "RESSACA": 1435, "RIACHO": 1459, "SEDE": 1233, "VARGEM_DAS_FLORES": 615, "Total": 9914 },
        { "FAIXA_ETARIA": "75 A 79 ANOS", "ELDORADO": 1491, "INDUSTRIAL": 987, "NACIONAL": 458, "PETROLANDIA": 352, "RESSACA": 950, "RIACHO": 834, "SEDE": 825, "VARGEM_DAS_FLORES": 377, "Total": 6274 },
        { "FAIXA_ETARIA": "80 E MAIS", "ELDORADO": 1551, "INDUSTRIAL": 939, "NACIONAL": 502, "PETROLANDIA": 298, "RESSACA": 875, "RIACHO": 760, "SEDE": 813, "VARGEM_DAS_FLORES": 339, "Total": 6077 }
    ];

    // ===================================================================================
    // FONTE DE DADOS PRINCIPAL (Dados existentes)
    // ===================================================================================
    const data = {
        totalPopulation: "621.863",
        totalUBS: "10",
        totalDistricts: "8",
        eldoradoPopulation: "101.378",
        ageGroupData: {
            labels: ["0 a 4 anos", "5 a 11 anos", "12 a 17 anos", "18 a 29 anos", "30 a 59 anos", "60 anos ou mais"],
            datasets: [
                { label: "Água Branca", data: [727, 1039, 805, 4074, 5851, 1088], backgroundColor: "#FF6384" },
                { label: "Bela Vista", data: [269, 474, 504, 1839, 2495, 301], backgroundColor: "#36A2EB" },
                { label: "CSU Eldorado", data: [1236, 1591, 1458, 5441, 9829, 1501], backgroundColor: "#FFCE56" },
                { label: "Jardim Bandeirantes", data: [848, 1205, 891, 3473, 5067, 897], backgroundColor: "#4BC0C0" },
                { label: "Jardim Eldorado", data: [496, 735, 633, 2843, 4088, 715], backgroundColor: "#9966FF" },
                { label: "Novo Eldorado", data: [1600, 2000, 2400, 2800, 3200, 1300], backgroundColor: "#FF9F40" },
                { label: "Parque São João", data: [848, 1187, 943, 3741, 5503, 858], backgroundColor: "#5A5A5A" },
                { label: "Perobas", data: [353, 513, 454, 1645, 2587, 431], backgroundColor: "#C7C7C7" },
                { label: "Santa Cruz", data: [605, 838, 720, 3365, 5169, 930], backgroundColor: "#8B4513" },
                { label: "Unidade XV", data: [1211, 1693, 1256, 5031, 10837, 2098], backgroundColor: "#20B2AA" }
            ]
        },
        vulnerabilityData: {
            labels: ["Água Branca", "Bela Vista", "CSU Eldorado", "Jardim Bandeirantes", "Jardim Eldorado", "Novo Eldorado", "Parque São João", "Perobas", "Santa Cruz", "Unidade XV"],
            levels: ["Baixa", "Média", "Elevada", "Muito Elevada"],
            colors: ["#27ae60", "#f39c12", "#e74c3c", "#8e44ad"],
            datasets: [
                { ubs: "Água Branca", data: [2112, 7597, 1314, 565] },
                { ubs: "Bela Vista", data: [815, 1540, 1985, 0] },
                { ubs: "CSU Eldorado", data: [19364, 2259, 0, 0] },
                { ubs: "Jardim Bandeirantes", data: [3179, 10504, 169, 136] },
                { ubs: "Jardim Eldorado", data: [3434, 2507, 2342, 0] },
                { ubs: "Novo Eldorado", data: [10463, 1587, 0, 0] },
                { ubs: "Parque São João", data: [0, 3116, 4658, 1891] },
                { ubs: "Perobas", data: [0, 854, 2106, 583] },
                { ubs: "Santa Cruz", data: [8842, 1297, 0, 0] },
                { ubs: "Unidade XV", data: [19008, 5451, 0, 0] }
            ]
        },
        districtTableData: [
            { district: "Ressaca", pop2010: 95263, pop2022: 105524 },
            { district: "Sede", pop2010: 90328, pop2022: 102060 },
            { district: "Eldorado", pop2010: 116878, pop2022: 101378 },
            { district: "Nacional", pop2010: 61216, pop2022: 72716 },
            { district: "Industrial", pop2010: 74553, pop2022: 69412 },
            { district: "Riacho", pop2010: 73041, pop2022: 65681 },
            { district: "Vargem das Flores", pop2010: 49945, pop2022: 54748 },
            { district: "Petrolândia", pop2010: 41927, pop2022: 50344 }
        ],
        ubsTableData: [
            { ubs: "Água Branca", population: 13584, vulnerability: "Média", ageGroup: "30-59 anos", status: "Ativa" },
            { ubs: "Bela Vista", population: 5882, vulnerability: "Baixa", ageGroup: "18-29 anos", status: "Ativa" },
            { ubs: "CSU Eldorado", population: 21056, vulnerability: "Elevada", ageGroup: "30-59 anos", status: "Ativa" },
            { ubs: "Jardim Bandeirantes", population: 12380, vulnerability: "Média", ageGroup: "5-11 anos", status: "Ativa" },
            { ubs: "Jardim Eldorado", population: 9510, vulnerability: "Baixa", ageGroup: "30-59 anos", status: "Ativa" },
            { ubs: "Novo Eldorado", population: 13300, vulnerability: "Elevada", ageGroup: "18-29 anos", status: "Ativa" },
            { ubs: "Parque São João", population: 13080, vulnerability: "Muito Elevada", ageGroup: "0-4 anos", status: "Ativa" },
            { ubs: "Perobas", population: 5983, vulnerability: "Média", ageGroup: "60+ anos", status: "Ativa" },
            { ubs: "Santa Cruz", population: 11627, vulnerability: "Baixa", ageGroup: "12-17 anos", status: "Ativa" },
            { ubs: "Unidade XV", population: 22126, vulnerability: "Elevada", ageGroup: "30-59 anos", status: "Ativa" }
        ]
    };

    const processedData = JSON.parse(JSON.stringify(data));
    processedData.districtTableData = processedData.districtTableData.map(d => {
        const growth = d.pop2022 - d.pop2010;
        const growthPct = d.pop2010 === 0 ? 0 : (growth / d.pop2010) * 100;
        return { ...d, growth: growth.toLocaleString('pt-BR', { signDisplay: 'always' }), growthPct: `${growth > 0 ? '+' : ''}${growthPct.toFixed(1)}%` };
    });
    processedData.historicalData = {
        labels: processedData.districtTableData.map(d => d.district),
        datasets: [
            { label: "População 2010", data: processedData.districtTableData.map(d => d.pop2010), backgroundColor: "#2c3e50" },
            { label: "População 2022", data: processedData.districtTableData.map(d => d.pop2022), backgroundColor: "#3498db" }
        ]
    };
    processedData.ubsPopulationData = {
        labels: processedData.ubsTableData.map(d => d.ubs),
        datasets: [{ 
            label: "População Cadastrada", 
            data: processedData.ubsTableData.map(d => d.population), 
            backgroundColor: "#e74c3c"
        }]
    };

    // ===================================================================================
    // PROCESSAMENTO DOS NOVOS DADOS DO CENSO 2021
    // ===================================================================================
    function prepareCensusChartData() {
        const districts = ["ELDORADO", "RESSACA", "SEDE", "INDUSTRIAL", "RIACHO", "NACIONAL", "VARGEM_DAS_FLORES", "PETROLANDIA"];
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#5A5A5A", "#C7C7C7"];
        
        return {
            labels: censusData2021.filter(row => row.FAIXA_ETARIA !== "Total").map(row => row.FAIXA_ETARIA),
            datasets: districts.map((district, index) => ({
                label: district.replace("_", " "),
                data: censusData2021.filter(row => row.FAIXA_ETARIA !== "Total").map(row => row[district]),
                backgroundColor: colors[index],
                borderColor: colors[index],
                borderWidth: 1
            }))
        };
    }

    let charts = {};

    function renderDashboard() {
        const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase() : "";
        
        // Aplicar filtros
        const tableData = {
            districtTableData: processedData.districtTableData,
            ubsTableData: processedData.ubsTableData.filter(ubs => {
                if (selectedFilters.ubs.length > 0 && !selectedFilters.ubs.includes(ubs.ubs)) return false;
                if (selectedFilters.vulnerability.length > 0 && !selectedFilters.vulnerability.includes(ubs.vulnerability)) return false;
                return true;
            }),
            censusTableData: censusData2021.filter(row => {
                return true; // Manter todos os dados do censo por enquanto
            })
        };

        const chartData = {};
        const ubsLabels = processedData.ubsTableData.map(u => u.ubs);
        const filteredUbsIndices = ubsLabels.map((label, index) => {
            const matchesUbs = selectedFilters.ubs.length === 0 || selectedFilters.ubs.includes(label);
            return matchesUbs ? index : -1;
        }).filter(index => index !== -1);

        const ageGroupLabels = processedData.ageGroupData.labels;
        chartData.ageGroupData = {
            labels: selectedFilters.ageGroup.length > 0 ? selectedFilters.ageGroup : ageGroupLabels,
            datasets: processedData.ageGroupData.datasets.filter((_, index) => filteredUbsIndices.includes(index))
                .map(dataset => {
                    if (selectedFilters.ageGroup.length > 0) {
                        const filteredData = selectedFilters.ageGroup.map(ageGroup => {
                            const ageIndex = ageGroupLabels.indexOf(ageGroup);
                            return ageIndex !== -1 ? dataset.data[ageIndex] : 0;
                        });
                        return { ...dataset, data: filteredData };
                    }
                    return dataset;
                })
        };
        
        const vulnerabilityLevels = processedData.vulnerabilityData.levels;
        chartData.vulnerabilityData = {
            labels: ubsLabels.filter((_, index) => filteredUbsIndices.includes(index)),
            datasets: vulnerabilityLevels.map((level, i) => ({
                label: level,
                data: processedData.vulnerabilityData.datasets.map(d => d.data[i]).filter((_, ubsIndex) => filteredUbsIndices.includes(ubsIndex)),
                backgroundColor: processedData.vulnerabilityData.colors[i]
            })).filter(dataset => selectedFilters.vulnerability.length === 0 || selectedFilters.vulnerability.includes(dataset.label))
        };

        chartData.ubsPopulationData = {
            labels: ubsLabels.filter((_, index) => filteredUbsIndices.includes(index)),
            datasets: [{
                label: "População Cadastrada",
                data: processedData.ubsPopulationData.datasets[0].data.filter((_, index) => filteredUbsIndices.includes(index)),
                backgroundColor: "#e74c3c"
            }]
        };
        chartData.historicalData = processedData.historicalData;

        // Novo gráfico do censo 2021
        chartData.districtCensusData = prepareCensusChartData();
        if (selectedFilters.district.length > 0) {
            chartData.districtCensusData.datasets = chartData.districtCensusData.datasets.filter(dataset => 
                selectedFilters.district.includes(dataset.label.toUpperCase().replace(/\s+/g, '_'))
            );
        }

        // Atualizar estatísticas
        updateStats(tableData);
        
        // Renderizar gráficos
        renderCharts(chartData);
        
        // Renderizar tabelas
        renderTables(tableData);
    }

    function updateStats(tableData) {
        const filteredUbsCount = tableData.ubsTableData.length;
        const filteredPopulation = tableData.ubsTableData.reduce((sum, ubs) => sum + ubs.population, 0);
        
        document.getElementById("eldoradoPopulation").textContent = filteredPopulation.toLocaleString('pt-BR');
        document.getElementById("totalPopulation").textContent = data.totalPopulation;
        document.getElementById("totalUBS").textContent = filteredUbsCount.toString();
        document.getElementById("totalDistricts").textContent = data.totalDistricts;
    }

    function renderCharts(chartData) {
        // Destruir gráficos existentes
        Object.values(charts).forEach(chart => chart.destroy());
        charts = {};

        // Gráfico de Faixa Etária
        const ageGroupCtx = document.getElementById("ageGroupChart").getContext("2d");
        charts.ageGroup = new Chart(ageGroupCtx, {
            type: "bar",
            data: chartData.ageGroupData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: { display: false }
                },
                scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                }
            }
        });

        // Gráfico de Vulnerabilidade
        const vulnerabilityCtx = document.getElementById("vulnerabilityChart").getContext("2d");
        charts.vulnerability = new Chart(vulnerabilityCtx, {
            type: "bar",
            data: chartData.vulnerabilityData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: { display: false }
                },
                scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                }
            }
        });

        // Gráfico de População UBS
        const ubsCtx = document.getElementById("ubsChart").getContext("2d");
        charts.ubs = new Chart(ubsCtx, {
            type: "bar",
            data: chartData.ubsPopulationData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: { display: false }
                }
            }
        });

        // Gráfico Histórico
        const historicalCtx = document.getElementById("historicalChart").getContext("2d");
        charts.historical = new Chart(historicalCtx, {
            type: "bar",
            data: chartData.historicalData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: { display: false }
                }
            }
        });

        // Gráfico do Censo 2021
        const districtCensusCtx = document.getElementById("districtCensusChart").getContext("2d");
        charts.districtCensus = new Chart(districtCensusCtx, {
            type: "bar",
            data: chartData.districtCensusData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: { display: false }
                },
                scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                }
            }
        });

        // Renderizar legendas customizadas
        renderCustomLegends(chartData);
    }

    function renderCustomLegends(chartData) {
        // Legenda Faixa Etária
        const ageGroupLegend = document.getElementById("ageGroupLegend");
        ageGroupLegend.innerHTML = chartData.ageGroupData.datasets.map(dataset => 
            `<span class="legend-item"><span class="legend-color" style="background-color: ${dataset.backgroundColor}"></span>${dataset.label}</span>`
        ).join("");

        // Legenda Vulnerabilidade
        const vulnerabilityLegend = document.getElementById("vulnerabilityLegend");
        vulnerabilityLegend.innerHTML = chartData.vulnerabilityData.datasets.map(dataset => 
            `<span class="legend-item"><span class="legend-color" style="background-color: ${dataset.backgroundColor}"></span>${dataset.label}</span>`
        ).join("");

        // Legenda UBS
        const ubsLegend = document.getElementById("ubsLegend");
        ubsLegend.innerHTML = `<span class="legend-item"><span class="legend-color" style="background-color: #e74c3c"></span>População Cadastrada</span>`;

        // Legenda Histórica
        const historicalLegend = document.getElementById("historicalLegend");
        historicalLegend.innerHTML = chartData.historicalData.datasets.map(dataset => 
            `<span class="legend-item"><span class="legend-color" style="background-color: ${dataset.backgroundColor}"></span>${dataset.label}</span>`
        ).join("");

        // Legenda Censo 2021
        const districtCensusLegend = document.getElementById("districtCensusLegend");
        districtCensusLegend.innerHTML = chartData.districtCensusData.datasets.map(dataset => 
            `<span class="legend-item"><span class="legend-color" style="background-color: ${dataset.backgroundColor}"></span>${dataset.label}</span>`
        ).join("");
    }

    function renderTables(tableData) {
        // Tabela de Distritos
        districtTableBody.innerHTML = tableData.districtTableData.map(row => `
            <tr>
                <td>${row.district}</td>
                <td>${row.pop2010.toLocaleString('pt-BR')}</td>
                <td>${row.pop2022.toLocaleString('pt-BR')}</td>
                <td class="${row.growth.startsWith('+') ? 'growth-positive' : 'growth-negative'}">${row.growth}</td>
                <td class="${row.growthPct.startsWith('+') ? 'growth-positive' : 'growth-negative'}">${row.growthPct}</td>
            </tr>
        `).join("");

        // Tabela UBS
        ubsTableBody.innerHTML = tableData.ubsTableData.map(row => `
            <tr>
                <td>${row.ubs}</td>
                <td>${row.population.toLocaleString('pt-BR')}</td>
                <td>${row.vulnerability}</td>
                <td>${row.ageGroup}</td>
                <td><span class="badge badge-success">${row.status}</span></td>
            </tr>
        `).join("");

        // Tabela do Censo 2021
        censusTableBody.innerHTML = tableData.censusTableData.map(row => `
            <tr>
                <td>${row.FAIXA_ETARIA}</td>
                <td>${row.ELDORADO.toLocaleString('pt-BR')}</td>
                <td>${row.RESSACA.toLocaleString('pt-BR')}</td>
                <td>${row.SEDE.toLocaleString('pt-BR')}</td>
                <td>${row.INDUSTRIAL.toLocaleString('pt-BR')}</td>
                <td>${row.RIACHO.toLocaleString('pt-BR')}</td>
                <td>${row.NACIONAL.toLocaleString('pt-BR')}</td>
                <td>${row.VARGEM_DAS_FLORES.toLocaleString('pt-BR')}</td>
                <td>${row.PETROLANDIA.toLocaleString('pt-BR')}</td>
                <td class="total-cell">${row.Total.toLocaleString('pt-BR')}</td>
            </tr>
        `).join("");
    }

    // Função para download Excel (placeholder)
    function downloadExcel() {
        alert("Funcionalidade de download Excel será implementada em breve!");
    }

    // Expor função globalmente
    window.downloadExcel = downloadExcel;

    // Busca na tabela do censo
    if (censusTableSearch) {
        censusTableSearch.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();
            const rows = censusTableBody.querySelectorAll("tr");
            
            rows.forEach(row => {
                const ageGroup = row.cells[0].textContent.toLowerCase();
                if (ageGroup.includes(searchTerm)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    // Renderização inicial
    renderDashboard();
});

