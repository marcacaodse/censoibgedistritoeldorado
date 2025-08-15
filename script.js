document.addEventListener("DOMContentLoaded", function() {
    // --- ELEMENTOS DO DOM ---
    const ubsFilter = document.getElementById("ubsFilter");
    const vulnerabilityFilter = document.getElementById("vulnerabilityFilter");
    const ageGroupFilter = document.getElementById("ageGroupFilter");
    const districtTableBody = document.querySelector("#districtTable tbody");
    const ubsTableBody = document.querySelector("#ubsTable tbody");

    // ===================================================================================
    // FONTE DE DADOS PRINCIPAL (CORRIGIDA E COMPLETA)
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
            // Ordem dos dados: [Baixa, Média, Elevada, Muito Elevada]
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

    // --- PROCESSAMENTO INICIAL DOS DADOS ---
    // Calcula crescimento dos distritos
    data.districtTableData = data.districtTableData.map(d => {
        const growth = d.pop2022 - d.pop2010;
        const growthPct = d.pop2010 === 0 ? 0 : (growth / d.pop2010) * 100;
        return { ...d, growth: growth.toLocaleString('pt-BR', { signDisplay: 'always' }), growthPct: `${growth > 0 ? '+' : ''}${growthPct.toFixed(1)}%` };
    });

    // Prepara dados para o gráfico histórico
    data.historicalData = {
        labels: data.districtTableData.map(d => d.district),
        datasets: [
            { label: "População 2010", data: data.districtTableData.map(d => d.pop2010), backgroundColor: "#2c3e50" },
            { label: "População 2022", data: data.districtTableData.map(d => d.pop2022), backgroundColor: "#3498db" }
        ]
    };

    // Prepara dados para o gráfico de população por UBS
    data.ubsPopulationData = {
        labels: data.ubsTableData.map(d => d.ubs),
        datasets: [
            { label: "População Cadastrada", data: data.ubsTableData.map(d => d.population), backgroundColor: "#3498db" }
        ]
    };

    // --- VARIÁVEIS GLOBAIS PARA OS GRÁFICOS ---
    let ageGroupChart, vulnerabilityChart, ubsChart, historicalChart;

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
    function updateStats(filteredData) {
        document.getElementById("totalPopulation").textContent = data.totalPopulation;
        document.getElementById("totalUBS").textContent = filteredData.totalUBS;
        document.getElementById("totalDistricts").textContent = data.totalDistricts;
        document.getElementById("eldoradoPopulation").textContent = filteredData.eldoradoPopulation;
    }

    function renderCharts(chartData, selectedUbsValue) {
        if (ageGroupChart) ageGroupChart.destroy();
        if (vulnerabilityChart) vulnerabilityChart.destroy();
        if (ubsChart) ubsChart.destroy();
        if (historicalChart) historicalChart.destroy();

        // Gráfico de Faixa Etária
        const ageGroupCtx = document.getElementById("ageGroupChart").getContext("2d");
        ageGroupChart = new Chart(ageGroupCtx, { type: "bar", data: chartData.ageGroupData, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }, plugins: { legend: { display: false } } } });
        updateCustomLegend('ageGroupLegend', ageGroupChart);

        // Gráfico de Vulnerabilidade (Lógica de Pizza/Barra)
        const vulnerabilityCtx = document.getElementById("vulnerabilityChart").getContext("2d");
        const vulnerabilityChartTitle = document.querySelector("#vulnerabilityChart").parentElement.querySelector(".chart-title");
        if (selectedUbsValue) {
            vulnerabilityChartTitle.textContent = `Vulnerabilidade - ${selectedUbsValue}`;
            vulnerabilityChart = new Chart(vulnerabilityCtx, { type: 'pie', data: chartData.vulnerabilityData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
        } else {
            vulnerabilityChartTitle.textContent = 'Vulnerabilidade por Unidade';
            vulnerabilityChart = new Chart(vulnerabilityCtx, { type: 'bar', data: chartData.vulnerabilityData, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }, plugins: { legend: { display: false } } } });
        }
        updateCustomLegend('vulnerabilityLegend', vulnerabilityChart);

        // Gráfico de População por UBS
        const ubsCtx = document.getElementById("ubsChart").getContext("2d");
        ubsChart = new Chart(ubsCtx, { type: "bar", data: chartData.ubsPopulationData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
        updateCustomLegend('ubsLegend', ubsChart);

        // Gráfico Histórico de Distritos
        const historicalCtx = document.getElementById("historicalChart").getContext("2d");
        historicalChart = new Chart(historicalCtx, { type: "bar", data: chartData.historicalData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
        updateCustomLegend('historicalLegend', historicalChart);
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

    function updateCustomLegend(legendId, chart) {
        const legendContainer = document.getElementById(legendId);
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

    // --- FUNÇÃO PRINCIPAL DE FILTROS ---
    function applyFilters() {
        const selectedUbsKey = ubsFilter.value;
        const selectedUbsText = ubsFilter.options[ubsFilter.selectedIndex].text;
        const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase() : "";
        
        let filteredChartData = {};
        let filteredTableData = {};
        let filteredStatsData = {};

        // Filtra os dados para as tabelas
        filteredTableData.districtTableData = data.districtTableData;
        filteredTableData.ubsTableData = selectedUbsKey ? data.ubsTableData.filter(u => normalizeString(u.ubs) === normalizeString(selectedUbsKey)) : data.ubsTableData;

        // Filtra os dados para os gráficos
        filteredChartData.ageGroupData = {
            labels: data.ageGroupData.labels,
            datasets: selectedUbsKey ? data.ageGroupData.datasets.filter(d => normalizeString(d.label) === normalizeString(selectedUbsKey)) : data.ageGroupData.datasets
        };
        
        if (selectedUbsKey) {
            const singleUbsVulnerability = data.vulnerabilityData.datasets.find(d => normalizeString(d.ubs) === normalizeString(selectedUbsKey));
            filteredChartData.vulnerabilityData = {
                labels: data.vulnerabilityData.levels,
                datasets: [{ data: singleUbsVulnerability ? singleUbsVulnerability.data : [0,0,0,0], backgroundColor: data.vulnerabilityData.colors }]
            };
        } else {
            filteredChartData.vulnerabilityData = {
                labels: data.vulnerabilityData.labels,
                datasets: data.vulnerabilityData.levels.map((level, i) => ({
                    label: level, data: data.vulnerabilityData.datasets.map(d => d.data[i]), backgroundColor: data.vulnerabilityData.colors[i]
                }))
            };
        }
        filteredChartData.ubsPopulationData = data.ubsPopulationData;
        filteredChartData.historicalData = data.historicalData;

        // Filtra os dados para os cartões de estatísticas
        filteredStatsData.totalUBS = filteredTableData.ubsTableData.length;
        filteredStatsData.eldoradoPopulation = selectedUbsKey 
            ? filteredTableData.ubsTableData.reduce((sum, ubs) => sum + ubs.population, 0).toLocaleString("pt-BR")
            : data.eldoradoPopulation;

        // Renderiza tudo
        updateStats(filteredStatsData);
        renderTables(filteredTableData);
        renderCharts(filteredChartData, selectedUbsKey ? selectedUbsText : null);
    }

    // --- EVENT LISTENERS ---
    window.clearFilters = function() {
        ubsFilter.value = "";
        vulnerabilityFilter.value = "";
        ageGroupFilter.value = "";
        applyFilters();
    };
    window.downloadExcel = function() { alert("Funcionalidade de download de Excel ainda não implementada."); };
    ubsFilter.addEventListener("change", applyFilters);
    vulnerabilityFilter.addEventListener("change", applyFilters);
    ageGroupFilter.addEventListener("change", applyFilters);

    // --- INICIALIZAÇÃO ---
    applyFilters();
});
