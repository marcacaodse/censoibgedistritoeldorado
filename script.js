document.addEventListener("DOMContentLoaded", function() {
    // --- ELEMENTOS DO DOM ---
    const ubsFilter = document.getElementById("ubsFilter");
    const vulnerabilityFilter = document.getElementById("vulnerabilityFilter");
    const ageGroupFilter = document.getElementById("ageGroupFilter");
    const districtTableBody = document.querySelector("#districtTable tbody");
    const ubsTableBody = document.querySelector("#ubsTable tbody");

    // ===================================================================================
    // FONTE DE DADOS PRINCIPAL (NÃO SERÁ MODIFICADA)
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
                { ubs: "Jardim Bandeirantes", data: [3179, 0, 169, 136] },
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
            { ubs: "Água Branca", population: 8456, vulnerability: "Média", ageGroup: "30-59 anos", status: "Ativa" },
            { ubs: "Bela Vista", population: 9234, vulnerability: "Baixa", ageGroup: "18-29 anos", status: "Ativa" },
            { ubs: "CSU Eldorado", population: 15678, vulnerability: "Elevada", ageGroup: "30-59 anos", status: "Ativa" },
            { ubs: "Jardim Bandeirantes", population: 7891, vulnerability: "Média", ageGroup: "5-11 anos", status: "Ativa" },
            { ubs: "Jardim Eldorado", population: 11234, vulnerability: "Baixa", ageGroup: "30-59 anos", status: "Ativa" },
            { ubs: "Novo Eldorado", population: 12567, vulnerability: "Elevada", ageGroup: "18-29 anos", status: "Ativa" },
            { ubs: "Parque São João", population: 9876, vulnerability: "Muito Elevada", ageGroup: "0-4 anos", status: "Ativa" },
            { ubs: "Perobas", population: 6543, vulnerability: "Média", ageGroup: "60+ anos", status: "Ativa" },
            { ubs: "Santa Cruz", population: 10123, vulnerability: "Baixa", ageGroup: "12-17 anos", status: "Ativa" },
            { ubs: "Unidade XV", population: 9776, vulnerability: "Elevada", ageGroup: "30-59 anos", status: "Ativa" }
        ]
    };

    // --- PROCESSAMENTO INICIAL DOS DADOS (executado apenas uma vez) ---
    const processedData = JSON.parse(JSON.stringify(data)); // Cria uma cópia profunda para processamento
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
        datasets: [{ label: "População Cadastrada", data: processedData.ubsTableData.map(d => d.population), backgroundColor: "#3498db" }]
    };

    // --- VARIÁVEIS GLOBAIS PARA OS GRÁFICOS ---
    let charts = {};

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
    function renderDashboard() {
        const selectedUbsKey = ubsFilter.value;
        const selectedUbsText = selectedUbsKey ? ubsFilter.options[ubsFilter.selectedIndex].text : null;
        const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase() : "";
        
        // 1. PREPARAR DADOS PARA TABELAS
        const tableData = {
            districtTableData: processedData.districtTableData,
            ubsTableData: selectedUbsKey ? processedData.ubsTableData.filter(u => normalizeString(u.ubs) === normalizeString(selectedUbsKey)) : processedData.ubsTableData
        };

        // 2. PREPARAR DADOS PARA OS GRÁFICOS
        const chartData = {};
        chartData.ageGroupData = {
            labels: processedData.ageGroupData.labels,
            datasets: selectedUbsKey ? processedData.ageGroupData.datasets.filter(d => normalizeString(d.label) === normalizeString(selectedUbsKey)) : processedData.ageGroupData.datasets
        };
        if (selectedUbsKey) {
            const ubsVulnerability = processedData.vulnerabilityData.datasets.find(d => normalizeString(d.ubs) === normalizeString(selectedUbsKey));
            chartData.vulnerabilityData = {
                labels: processedData.vulnerabilityData.levels,
                datasets: [{ data: ubsVulnerability ? ubsVulnerability.data : [0,0,0,0], backgroundColor: processedData.vulnerabilityData.colors }]
            };
        } else {
            chartData.vulnerabilityData = {
                labels: processedData.vulnerabilityData.labels,
                datasets: processedData.vulnerabilityData.levels.map((level, i) => ({
                    label: level, data: processedData.vulnerabilityData.datasets.map(d => d.data[i]), backgroundColor: processedData.vulnerabilityData.colors[i]
                }))
            };
        }
        chartData.ubsPopulationData = processedData.ubsPopulationData;
        chartData.historicalData = processedData.historicalData;

        // 3. PREPARAR DADOS PARA OS CARDS DE ESTATÍSTICAS
        const statsData = {
            totalUBS: tableData.ubsTableData.length,
            eldoradoPopulation: selectedUbsKey ? tableData.ubsTableData.reduce((sum, ubs) => sum + ubs.population, 0).toLocaleString("pt-BR") : processedData.eldoradoPopulation
        };

        // 4. RENDERIZAR TUDO
        renderStats(statsData);
        renderTables(tableData);
        renderCharts(chartData, selectedUbsKey, selectedUbsText);
    }

    function renderStats(statsData) {
        document.getElementById("totalPopulation").textContent = processedData.totalPopulation;
        document.getElementById("totalUBS").textContent = statsData.totalUBS;
        document.getElementById("totalDistricts").textContent = processedData.totalDistricts;
        document.getElementById("eldoradoPopulation").textContent = statsData.eldoradoPopulation;
    }

    function renderTables(tableData) {
        districtTableBody.innerHTML = "";
        tableData.districtTableData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.district}</td><td>${row.pop2010.toLocaleString("pt-BR")}</td><td>${row.pop2022.toLocaleString("pt-BR")}</td><td class="${row.growth.startsWith('+') ? "growth-positive" : "growth-negative"}">${row.growth}</td><td class="${row.growthPct.startsWith('+') ? "growth-positive" : "growth-negative"}">${row.growthPct}</td>`;
            districtTableBody.appendChild(tr);
        });
        ubsTableBody.innerHTML = "";
        tableData.ubsTableData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.ubs}</td><td>${row.population.toLocaleString("pt-BR")}</td><td>${row.vulnerability}</td><td>${row.ageGroup}</td><td><span class="badge badge-success">${row.status}</span></td>`;
            ubsTableBody.appendChild(tr);
        });
    }

    function renderCharts(chartData, selectedUbsKey, selectedUbsText) {
        Object.values(charts).forEach(chart => chart.destroy()); // Destroi todos os gráficos existentes

        charts.ageGroup = new Chart(document.getElementById("ageGroupChart").getContext("2d"), { type: "bar", data: chartData.ageGroupData, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }, plugins: { legend: { display: false } } } });
        charts.ubsPopulation = new Chart(document.getElementById("ubsChart").getContext("2d"), { type: "bar", data: chartData.ubsPopulationData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
        charts.historical = new Chart(document.getElementById("historicalChart").getContext("2d"), { type: "bar", data: chartData.historicalData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });

        const vulnerabilityCtx = document.getElementById("vulnerabilityChart").getContext("2d");
        const vulnerabilityChartTitle = vulnerabilityCtx.closest('.chart-container').querySelector(".chart-title");
        if (selectedUbsKey) {
            vulnerabilityChartTitle.textContent = `Vulnerabilidade - ${selectedUbsText}`;
            charts.vulnerability = new Chart(vulnerabilityCtx, { type: 'pie', data: chartData.vulnerabilityData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
        } else {
            vulnerabilityChartTitle.textContent = 'Vulnerabilidade por Unidade';
            charts.vulnerability = new Chart(vulnerabilityCtx, { type: 'bar', data: chartData.vulnerabilityData, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }, plugins: { legend: { display: false } } } });
        }
        
        Object.keys(charts).forEach(key => updateCustomLegend(`${key}Legend`, charts[key]));
    }

    function updateCustomLegend(legendId, chart) {
        const legendContainer = document.getElementById(legendId);
        if (!legendContainer) return;
        legendContainer.innerHTML = "";
        const legendItems = chart.options.plugins.legend.labels.generateLabels(chart);
        legendItems.forEach(item => {
            const legendItemDiv = document.createElement("div");
            legendItemDiv.className = "legend-item";
            legendItemDiv.style.cursor = "pointer";
            legendItemDiv.style.opacity = item.hidden ? 0.5 : 1;
            legendItemDiv.innerHTML = `<span class="legend-color" style="background-color: ${item.fillStyle}"></span> ${item.text}`;
            legendItemDiv.onclick = () => {
                chart.toggleDataVisibility(item.index);
                chart.update();
            };
            legendContainer.appendChild(legendItemDiv);
        });
    }

    // --- EVENT LISTENERS ---
    window.clearFilters = function() {
        ubsFilter.value = "";
        vulnerabilityFilter.value = "";
        ageGroupFilter.value = "";
        renderDashboard();
    };
    window.downloadExcel = function() { alert("Funcionalidade de download de Excel ainda não implementada."); };
    [ubsFilter, vulnerabilityFilter, ageGroupFilter].forEach(filter => {
        filter.addEventListener("change", renderDashboard);
    });

    // --- INICIALIZAÇÃO ---
    renderDashboard();
});
