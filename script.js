document.addEventListener("DOMContentLoaded", function() {
    // --- ELEMENTOS DO DOM ---
    const ubsFilter = document.getElementById("ubsFilter");
    const vulnerabilityFilter = document.getElementById("vulnerabilityFilter");
    const ageGroupFilter = document.getElementById("ageGroupFilter");
    const districtTableBody = document.querySelector("#districtTable tbody");
    const ubsTableBody = document.querySelector("#ubsTable tbody");

    // ===================================================================================
    // FONTE DE DADOS PRINCIPAL
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
          
