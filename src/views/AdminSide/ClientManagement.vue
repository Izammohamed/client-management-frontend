<template>
  <v-container class="pa-6 bg-grey-lighten-4 h-100" fluid>
    <h2 class="page-title">Client Management</h2>
    
    <!-- Top Statistics Cards -->
    <v-row class="mb-4">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card-blue h-100" elevation="1">
          <v-card-text>
            <div class="text-overline mb-1 font-weight-bold">TOTAL CLIENTS</div>
            <div class="text-h4 font-weight-bold mb-2">{{ totalClients }}</div>
            <div class="text-caption">All Registered Clients</div>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" size="small" class="text-none">
              View Details <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card-green h-100" elevation="1">
          <v-card-text>
            <div class="text-overline mb-1 font-weight-bold">TOTAL PROJECT BUDGET</div>
            <div class="text-h4 font-weight-bold mb-2">{{ formatCurrency(totalProjectBudget) }}</div>
            <div class="text-caption">Sum of All Project Budgets</div>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" size="small" class="text-none">
              View Details <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card-orange h-100" elevation="1">
          <v-card-text>
            <div class="text-overline mb-1 font-weight-bold">TOTAL SERVICE CHARGE</div>
            <div class="text-h4 font-weight-bold mb-2">{{ formatCurrency(totalServiceCharge) }}</div>
            <div class="text-caption">Sum of All Service Charges</div>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" size="small" class="text-none">
              View Details <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card-purple h-100" elevation="1">
          <v-card-text>
            <div class="text-overline mb-1 font-weight-bold">TOTAL FINAL VALUE</div>
            <div class="text-h4 font-weight-bold mb-2">{{ formatCurrency(totalFinalValue) }}</div>
            <div class="text-caption">Sum of Final Project Values</div>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" size="small" class="text-none">
              View Details <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Content Layout -->
    <v-row>
      <!-- Left Panel (Add Form) -->
      <v-col cols="12" md="4">
        <ClientInfoCard
          @add-client="handleAddClient"
          @update-client="handleUpdateClient"
          @cancel-edit="cancelEdit"
          :isEditMode="isEditMode"
          :client="selectedClient"
        />
      </v-col>
      
      <!-- Right Panel (Table) -->
      <v-col cols="12" md="8">
        <div v-if="loading" class="d-flex justify-center my-10">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <ClientInfoTable
          v-else
          :clients="clients"
          @delete-client="handleDeleteClient"
          @edit-client="editClient"
          @search="handleSearch"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ClientInfoCard from './ClientManagement/Components/ClientInfoCard.vue';
import ClientInfoTable from './ClientManagement/Components/ClientInfoTable.vue';
import ClientManagement from '@/Api/Modules/ClientManagement';

/* ---------------------------------------------
   DATA SOURCES
--------------------------------------------- */
const clients = ref([]);
const loading = ref(true);
const selectedClient = ref(null);
const isEditMode = ref(false);

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
   ADD / UPDATE / DELETE
--------------------------------------------- */
const handleAddClient = async (clientData) => {
  try {
    await ClientManagement.addClient(clientData);
    fetchClients();
  } catch (error) {
    console.error("Error adding client", error);
  }
};

const handleUpdateClient = async (clientData) => {
  try {
    await ClientManagement.updateClient(clientData);
    fetchClients();
    cancelEdit();
  } catch (error) {
    console.error("Error updating client", error);
  }
};

const handleDeleteClient = async (id) => {
  if (confirm("Are you sure you want to delete this client?")) {
    try {
      await ClientManagement.deleteClient(id);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client", error);
    }
  }
};

/* ---------------------------------------------
   EDIT RECORD LOGIC
--------------------------------------------- */
const editClient = (client) => {
  selectedClient.value = { ...client };
  isEditMode.value = true;
};

const cancelEdit = () => {
  selectedClient.value = null;
  isEditMode.value = false;
};

const handleSearch = (query) => {
  // handled locally by vuetify data table but can be API driven
};

/* ---------------------------------------------
   STATISTICS
--------------------------------------------- */
const totalClients = computed(() => clients.value.length);
const totalProjectBudget = computed(() => clients.value.reduce((sum, c) => sum + Number(c.project_budget), 0));
const totalServiceCharge = computed(() => clients.value.reduce((sum, c) => sum + Number(c.service_charge), 0));
const totalFinalValue = computed(() => clients.value.reduce((sum, c) => sum + Number(c.final_project_value), 0));

const formatCurrency = (value) => {
  return 'Rs. ' + new Intl.NumberFormat('en-LK').format(value);
};
</script>
