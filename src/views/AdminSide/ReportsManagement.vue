<template>
  <v-container class="pa-6 bg-grey-lighten-4 h-100" fluid>
    <h2 class="page-title">Comprehensive Client Reports</h2>
    
    <v-card class="mb-4">
      <v-card-title class="d-flex align-center border-bottom pb-2">
        <v-icon color="primary" class="mr-2">mdi-chart-box</v-icon>
        All Clients Report
        <v-spacer></v-spacer>
        <v-btn color="primary" prepend-icon="mdi-download" @click="exportReport">
          Export Report
        </v-btn>
      </v-card-title>
      
      <v-data-table
        :headers="headers"
        :items="clients"
        :loading="loading"
        class="elevation-0 pt-4"
      >
        <template v-slot:item.project_budget="{ item }">
          <div class="text-right">{{ formatCurrency(item.project_budget) }}</div>
        </template>
        <template v-slot:item.service_charge="{ item }">
          <div class="text-right">{{ formatCurrency(item.service_charge) }}</div>
        </template>
        <template v-slot:item.discount="{ item }">
          <div class="text-right">{{ formatCurrency(item.discount) }}</div>
        </template>
        <template v-slot:item.final_project_value="{ item }">
          <div class="text-right font-weight-bold">{{ formatCurrency(item.final_project_value) }}</div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ClientManagement from '@/Api/Modules/ClientManagement';

/* ---------------------------------------------
   DATA SOURCES
--------------------------------------------- */
const clients = ref([]);
const loading = ref(true);

const headers = [
  { title: '#', key: 'client_id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Company', key: 'company' },
  { title: 'Address', key: 'address' },
  { title: 'Project Budget (Rs.)', key: 'project_budget', align: 'end' },
  { title: 'Service Charge (Rs.)', key: 'service_charge', align: 'end' },
  { title: 'Discount (Rs.)', key: 'discount', align: 'end' },
  { title: 'Final Project Value (Rs.)', key: 'final_project_value', align: 'end' }
];

/* ---------------------------------------------
   LOAD DATA FROM API
--------------------------------------------- */
const fetchClients = async () => {
  loading.value = true;
  try {
    const res = await ClientManagement.getAllClients();
    clients.value = res.data.data;
  } catch (error) {
    console.error("Error fetching clients", error);
  }
  loading.value = false;
};

onMounted(() => {
  fetchClients();
});

/* ---------------------------------------------
   UTILITIES
--------------------------------------------- */
const formatCurrency = (value) => {
  if (value === undefined || value === null) return '-';
  return new Intl.NumberFormat('en-LK').format(value);
};

const exportReport = () => {
  alert("Report export functionality (e.g. PDF/Excel) will be implemented here.");
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid var(--border-color);
}
</style>
