document.addEventListener("DOMContentLoaded", function() {
    const ubsFilter = document.getElementById("ubsFilter");
    const vulnerabilityFilter = document.getElementById("vulnerabilityFilter");
    const ageGroupFilter = document.getElementById("ageGroupFilter");
    const districtTableBody = document.querySelector("#districtTable tbody");
    const ubsTableBody = document.querySelector("#ubsTable tbody");

    // ===================================================================================
    // DADOS ATUALIZADOS AQUI
    // ===================================================================================
    const data = {
        totalPopulation: "621.863",
        totalUBS: "10",
        totalDistricts: "8",
        eldoradoPopulation: "101.378",
        
        // **** DADOS DE FAIXA ETÁRIA CORRIGIDOS CONFORME A IMAGEM ****
        ageGroupData: {
            labels: ["0 a 4 anos", "5 a 11 anos", "12 a 17 anos", "18 a 29 anos", "30 a 59 anos", "60 anos ou mais"],
            datasets: [
                { label: "Água Branca",        data: [727, 1039, 805, 4074, 5851, 1088], backgroundColor: "#FF6384" },
                { label: "Bela Vista",         data: [269, 474,  504, 1839, 2495, 301],  backgroundColor: "#36A2EB" },
                { label: "CSU Eldorado",       data: [1236, 1591, 1458, 5441, 9829, 1501], backgroundColor: "#FFCE56" },
                { label: "Jardim Bandeirantes",data: [848, 1205, 891, 3473, 5067, 897],  backgroundColor: "#4BC0C0" },
                { label: "Jardim Eldorado",    data: [496, 735,  633, 2843, 4088, 715],  backgroundColor: "#9966FF" },
                { label: "Novo Eldorado",      data: [726, 1029, 929, 4004, 6593, 1100], backgroundColor: "#FF9F40" },
                { label: "Parque São João",    data: [848, 1187, 943, 3741, 5503, 858],  backgroundColor: "#5A5A5A" },
                { label: "Perobas",            data: [353, 513,  454, 1645, 2587, 431],  backgroundColor: "#C7C7C7" },
                { label: "Santa Cruz",         data: [605, 838,  720, 3365, 5169, 930],  backgroundColor: "#8B4513" },
                { label: "Unidade XV",         data: [1211, 1693, 1256, 5031, 10837, 2098], backgroundColor: "#20B2AA" }
            ]
        },
        
        vulnerabilityData: {
            labels: ["Baixa", "Média", "Elevada", "Muito Elevada"],
            datasets: [{ data: [30, 40, 20, 10], backgroundColor: ["#27ae60", "#f39c12", "#3498db", "#e74c3c"] }]
        },
        ubsPopulationData: {
            labels: ["Água Branca", "Bela Vista", "CSU Eldorado", "Jardim Bandeirantes", "Jardim Eldorado", "Novo Eldorado", "Parque São João", "Perobas", "Santa Cruz", "Unidade XV"],
            datasets: [
                { label: "População 2022", data: [8456, 9234, 15678, 7891, 11234, 12567, 9876, 6543, 10123, 9776], backgroundColor: "#3498db" },
                { label: "População 2010", data: [7500, 8000, 13000, 7000, 10000, 11000, 9000, 6000, 9500, 9000], backgroundColor: "#2c3e50" }
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
        ]
    };
    // ===================================================================================
    // FIM DOS DADOS ATUALIZADOS
    // ===================================================================================

    function processDistrictData(districtData) {
        return districtData.map(d => {
            const growth = d.pop2022 - d.pop2010;
            const growthPct = d.pop2010 === 0 ? 0 : (growth / d.pop2010) * 100;
            return { ...d, growth: growth.toLocaleString('pt-BR', { signDisplay: 'always' }), growthPct: `${growth > 0 ? '+' : ''}${growthPct.toFixed(1)}%` };
        });
    }

    data.districtTableData = processDistrictData(data.districtTableData);

    data.historicalData = {
        labels: data.districtTableData.map(d => d.district),
        datasets: [
            { label: "População 2010", data: data.districtTableData.map(d => d.pop2010), backgroundColor: "#2c3e50" },
            { label: "População 2022", data: data.districtTableData.map(d => d.pop2022), backgroundColor: "#3498db" }
        ]
    };
    
    data.ubsTableData = [
        { ubs: "Água Branca", population: 8456, vulnerability: "Média", ageGroup: "30-59 anos", status: "Ativa" },
        { ubs: "Bela Vista", population: 9234, vulnerability: "Baixa", ageGroup: "18-29 anos", status: "Ativa" },
        { ubs: "Eldorado", population: 15678, vulnerability: "Elevada", ageGroup: "30-59 anos", status: "Ativa" },
        { ubs: "Jardim Bandeirantes", population: 7891, vulnerability: "Média", ageGroup: "5-11 anos", status: "Ativa" },
        { ubs: "Jardim Eldorado", population: 11234, vulnerability: "Baixa", ageGroup: "30-59 anos", status: "Ativa" },
        { ubs: "Novo Eldorado", population: 12567, vulnerability: "Elevada", ageGroup: "18-29 anos", status: "Ativa" },
        { ubs: "Parque São João", population: 9876, vulnerability: "Muito Elevada", ageGroup: "0-4 anos", status: "Ativa" },
        { ubs: "Perobas", population: 6543, vulnerability: "Média", ageGroup: "60+ anos", status: "Ativa" },
        { ubs: "Santa Cruz", population: 10123, vulnerability: "Baixa", ageGroup: "12-17 anos", status: "Ativa" },
        { ubs: "Unidade XV", population: 9776, vulnerability: "Elevada", ageGroup: "30-59 anos", status: "Ativa" }
    ];

    let ageGroupChart, vulnerabilityChart, ubsChart, historicalChart;

    function updateStats(filteredData) {
        document.getElementById("totalPopulation").textContent = data.totalPopulation;
        document.getElementById("totalUBS").textContent = filteredData.totalUBS;
        document.getElementById("totalDistricts").textContent = data.totalDistricts;
        document.getElementById("eldoradoPopulation").textContent = filteredData.eldoradoPopulation;
    }

    function renderCharts(filteredData) {
        if (ageGroupChart) ageGroupChart.destroy();
        if (vulnerabilityChart) vulnerabilityChart.destroy();
        if (ubsChart) ubsChart.destroy();
        if (historicalChart) historicalChart.destroy();

        const ageGroupCtx = document.getElementById("ageGroupChart").getContext("2d");
        ageGroupChart = new Chart(ageGroupCtx, {
            type: "bar",
            data: filteredData.ageGroupData,
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
        updateCustomLegend('ageGroupLegend', ageGroupChart);

        const vulnerabilityCtx = document.getElementById("vulnerabilityChart").getContext("2d");
        vulnerabilityChart = new Chart(vulnerabilityCtx, {
            type: "pie",
            data: filteredData.vulnerabilityData,
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
        updateCustomLegend('vulnerabilityLegend', vulnerabilityChart);

        const ubsCtx = document.getElementById("ubsChart").getContext("2d");
        ubsChart = new Chart(ubsCtx, {
            type: "bar",
            data: filteredData.ubsPopulationData,
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
        updateCustomLegend('ubsLegend', ubsChart);

        const historicalCtx = document.getElementById("historicalChart").getContext("2d");
        historicalChart = new Chart(historicalCtx, {
            type: "bar",
            data: filteredData.historicalData,
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
        });
        updateCustomLegend('historicalLegend', historicalChart);
    }

    function renderTables(filteredData) {
        districtTableBody.innerHTML = "";
        filteredData.districtTableData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.district}</td><td>${row.pop2010.toLocaleString("pt-BR")}</td><td>${row.pop2022.toLocaleString("pt-BR")}</td><td class="${row.growth.startsWith('+') ? "growth-positive" : "growth-negative"}">${row.growth}</td><td class="${row.growthPct.startsWith('+') ? "growth-positive" : "growth-negative"}">${row.growthPct}</td>`;
            districtTableBody.appendChild(tr);
        });

        ubsTableBody.innerHTML = "";
        filteredData.ubsTableData.forEach(row => {
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
            legendItemDiv.style.opacity = item.hidden ? 0.5 : 1;
            legendItemDiv.innerHTML = `<span class="legend-color" style="background-color: ${item.fillStyle}"></span> ${item.text}`;
            legendItemDiv.onclick = () => {
                chart.toggleDataVisibility(item.index);
                chart.update();
            };
            legendContainer.appendChild(legendItemDiv);
        });
    }

    function applyFilters() {
        let filteredData = JSON.parse(JSON.stringify(data));
        const selectedUbsValue = ubsFilter.value;
        const selectedVulnerability = vulnerabilityFilter.value;
        const selectedAgeGroup = ageGroupFilter.value;

        const normalizeString = (str) => {
            if (!str) return "";
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        };

        const normalizedSelectedUbs = normalizeString(selectedUbsValue);

        if (selectedUbsValue) {
            filteredData.ubsTableData = data.ubsTableData.filter(ubs => normalizeString(ubs.ubs) === normalizedSelectedUbs);
            filteredData.ageGroupData.datasets = data.ageGroupData.datasets.filter(dataset => normalizeString(dataset.label) === normalizedSelectedUbs);
        }

        if (selectedUbsValue) {
            if (filteredData.ubsTableData.length > 0) {
                filteredData.eldoradoPopulation = filteredData.ubsTableData.reduce((sum, ubs) => sum + ubs.population, 0).toLocaleString("pt-BR");
                filteredData.totalUBS = filteredData.ubsTableData.length;
            } else {
                filteredData.eldoradoPopulation = "0";
                filteredData.totalUBS = "0";
            }
        } else {
            filteredData.eldoradoPopulation = data.eldoradoPopulation;
            filteredData.totalUBS = data.totalUBS;
        }

        if (selectedVulnerability) {
            const vulnerabilityIndex = data.vulnerabilityData.labels.findIndex(label => label.toUpperCase() === selectedVulnerability);
            if (vulnerabilityIndex !== -1) {
                filteredData.vulnerabilityData.datasets[0].data = data.vulnerabilityData.datasets[0].data.map((val, index) => index === vulnerabilityIndex ? val : 0);
            } else {
                filteredData.vulnerabilityData.datasets[0].data = [0, 0, 0, 0];
            }
        }

        if (selectedAgeGroup) {
            const normalizedSelectedAgeGroup = normalizeString(selectedAgeGroup);
            filteredData.ageGroupData.datasets = filteredData.ageGroupData.datasets.map(dataset => {
                const newDataset = { ...dataset };
                newDataset.data = newDataset.data.map((val, index) => {
                    return normalizeString(data.ageGroupData.labels[index]) === normalizedSelectedAgeGroup ? val : 0;
                });
                return newDataset;
            });
        }

        updateStats(filteredData);
        renderCharts(filteredData);
        renderTables(filteredData);
    }

    window.clearFilters = function() {
        ubsFilter.value = "";
        vulnerabilityFilter.value = "";
        ageGroupFilter.value = "";
        applyFilters();
    };

    window.downloadExcel = function() {
        alert("Funcionalidade de download de Excel ainda não implementada.");
    };

    ubsFilter.addEventListener("change", applyFilters);
    vulnerabilityFilter.addEventListener("change", applyFilters);
    ageGroupFilter.addEventListener("change", applyFilters);

    applyFilters();
});
