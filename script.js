document.addEventListener("DOMContentLoaded", function() {
    const ubsFilter = document.getElementById("ubsFilter");
    const vulnerabilityFilter = document.getElementById("vulnerabilityFilter");
    const ageGroupFilter = document.getElementById("ageGroupFilter");
    const statsGrid = document.getElementById("statsGrid");
    const districtTableBody = document.querySelector("#districtTable tbody");
    const ubsTableBody = document.querySelector("#ubsTable tbody");

    // Dados de exemplo (substitua por seus dados reais)
    const data = {
        totalPopulation: "621,863",
        totalUBS: "10",
        totalDistricts: "8",
        eldoradoPopulation: "101,378",
        ageGroupData: {
            labels: ["0-4 anos", "5-11 anos", "12-17 anos", "18-29 anos", "30-59 anos", "60+ anos"],
            datasets: [
                { label: "Água Branca", data: [1200, 1500, 1800, 2000, 2500, 1000], backgroundColor: "#FF6384" },
                { label: "Bela Vista", data: [1000, 1200, 1500, 1800, 2200, 900], backgroundColor: "#36A2EB" },
                { label: "CSU Eldorado", data: [2000, 2500, 3000, 3500, 4000, 1500], backgroundColor: "#FFCE56" },
                { label: "Jardim Bandeirantes", data: [900, 1100, 1300, 1500, 1800, 700], backgroundColor: "#4BC0C0" },
                { label: "Jardim Eldorado", data: [1500, 1800, 2200, 2500, 3000, 1200], backgroundColor: "#9966FF" },
                { label: "Novo Eldorado", data: [1600, 2000, 2400, 2800, 3200, 1300], backgroundColor: "#FF9F40" },
                { label: "Parque São João", data: [1100, 1400, 1700, 1900, 2300, 950], backgroundColor: "#5A5A5A" },
                { label: "Perobas", data: [800, 1000, 1200, 1400, 1700, 600], backgroundColor: "#C7C7C7" },
                { label: "Santa Cruz", data: [1300, 1600, 1900, 2100, 2600, 1100], backgroundColor: "#8B4513" },
                { label: "Unidade XV", data: [1400, 1700, 2000, 2300, 2800, 1150], backgroundColor: "#20B2AA" }
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
        historicalData: {
            labels: ["Eldorado", "Centro", "Industrial", "Ressaca", "Riacho", "Sede", "Vargem das Flores", "Petrolândia"],
            datasets: [
                { label: "População 2010", data: [89341, 98765, 76543, 65432, 54321, 87654, 43210, 32109], backgroundColor: "#2c3e50" },
                { label: "População 2022", data: [101378, 112456, 87234, 73891, 61234, 98765, 48567, 38338], backgroundColor: "#3498db" }
            ]
        },
        districtTableData: [
            { district: "Eldorado", pop2010: 89341, pop2022: 101378, growth: "+12,037", growthPct: "+13.5%" },
            { district: "Centro", pop2010: 98765, pop2022: 112456, growth: "+13,691", growthPct: "+13.9%" },
            { district: "Industrial", pop2010: 76543, pop2022: 87234, growth: "+10,691", growthPct: "+14.0%" },
            { district: "Ressaca", pop2010: 65432, pop2022: 73891, growth: "+8,459", growthPct: "+12.9%" },
            { district: "Riacho", pop2010: 54321, pop2022: 61234, growth: "+6,913", growthPct: "+12.7%" },
            { district: "Sede", pop2010: 87654, pop2022: 98765, growth: "+11,111", growthPct: "+12.7%" },
            { district: "Vargem das Flores", pop2010: 43210, pop2022: 48567, growth: "+5,357", growthPct: "+12.4%" },
            { district: "Petrolândia", pop2010: 32109, pop2022: 38338, growth: "+6,229", growthPct: "+19.4%" }
        ],
        ubsTableData: [
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
        ]
    };

    let ageGroupChart, vulnerabilityChart, ubsChart, historicalChart;

    function updateStats(filteredData) {
        document.getElementById("totalPopulation").textContent = data.totalPopulation; // População total não muda com filtros
        document.getElementById("totalUBS").textContent = filteredData.totalUBS;
        document.getElementById("totalDistricts").textContent = data.totalDistricts; // Distritos não mudam com filtros
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
            tr.innerHTML = `<td>${row.district}</td><td>${row.pop2010.toLocaleString("pt-BR")}</td><td>${row.pop2022.toLocaleString("pt-BR")}</td><td class="${row.growth.startsWith("+") ? "growth-positive" : "growth-negative"}">${row.growth}</td><td class="${row.growthPct.startsWith("+") ? "growth-positive" : "growth-negative"}">${row.growthPct}</td>`;
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

    // *** FUNÇÃO DE FILTRO CORRIGIDA ***
    function applyFilters() {
        let filteredData = JSON.parse(JSON.stringify(data));

        const selectedUbsValue = ubsFilter.value;
        const selectedVulnerability = vulnerabilityFilter.value;
        const selectedAgeGroup = ageGroupFilter.value;

        // Função auxiliar para normalizar strings (remove acentos, espaços, etc.)
        const normalizeString = (str) => {
            if (!str) return "";
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        };

        const normalizedSelectedUbs = normalizeString(selectedUbsValue);

        // 1. Filtrar a tabela de UBS
        if (selectedUbsValue) {
            filteredData.ubsTableData = data.ubsTableData.filter(ubs => normalizeString(ubs.ubs) === normalizedSelectedUbs);
        }

        // 2. Filtrar o gráfico de faixa etária por UBS
        if (selectedUbsValue) {
            filteredData.ageGroupData.datasets = data.ageGroupData.datasets.filter(dataset => normalizeString(dataset.label) === normalizedSelectedUbs);
        }
        
        // 3. Atualizar os totais com base nos filtros
        if (selectedUbsValue) {
            if (filteredData.ubsTableData.length > 0) {
                filteredData.eldoradoPopulation = filteredData.ubsTableData.reduce((sum, ubs) => sum + ubs.population, 0).toLocaleString("pt-BR");
                filteredData.totalUBS = filteredData.ubsTableData.length;
            } else {
                filteredData.eldoradoPopulation = "0";
                filteredData.totalUBS = "0";
            }
        } else {
            // Se nenhuma UBS estiver selecionada, mostrar totais gerais
            filteredData.eldoradoPopulation = data.eldoradoPopulation;
            filteredData.totalUBS = data.totalUBS;
        }

        // Lógica para filtros de vulnerabilidade e faixa etária (aplicada após o filtro de UBS)
        // Esta parte do código original estava funcional e foi mantida com pequenas melhorias.
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

    // Inicializar o dashboard
    applyFilters();
});
